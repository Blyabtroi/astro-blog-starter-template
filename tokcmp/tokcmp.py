#!/usr/bin/env python3
"""Сравнение токенизации RU vs EN. Файлы в en/ и ru/ парные: одинаковые имена.

Использование:
  python tokcmp.py [--en en] [--ru ru] [--csv out.csv]
Опционально (точный подсчёт через API):
  ANTHROPIC_API_KEY=... ANTHROPIC_MODEL=claude-3-5-sonnet-latest
  YANDEX_API_KEY=... YANDEX_FOLDER_ID=...   (+ YANDEX_MODEL, по умолчанию yandexgpt)
  HF_TOKEN=...  (для официального meta-llama, если задан LLAMA_REPO)
"""
import argparse, csv, os, re, sys
from pathlib import Path

PRICES = {  # USD за 1M токенов (вход, выход); Yandex в рублях за 1M. Проверьте актуальность.
    "GPT-4o": (2.5, 10), "GPT-4": (30, 60), "Llama 3": (0.88, 0.88),
    "Claude 3.5 Sonnet": (3, 15), "YandexGPT": (800, 800),
}
CTX = {"GPT-4o": 128000, "GPT-4": 8192, "Llama 3": 8192,
       "Claude 3.5 Sonnet": 200000, "YandexGPT": 128000}
CUR = {"YandexGPT": "RUB"}

def counters():
    c = {}
    try:
        import tiktoken
        for name, enc in (("GPT-4o", "o200k_base"), ("GPT-4", "cl100k_base")):
            e = tiktoken.get_encoding(enc); c[name] = lambda t, e=e: len(e.encode(t, disallowed_special=()))
    except Exception as ex: print("tiktoken недоступен:", ex, file=sys.stderr)
    try:
        from tokenizers import Tokenizer
        from huggingface_hub import hf_hub_download as d
        repo = os.getenv("LLAMA_REPO", "NousResearch/Meta-Llama-3-8B")
        L = Tokenizer.from_file(d(repo, "tokenizer.json"))
        c["Llama 3"] = lambda t: len(L.encode(t, add_special_tokens=False).ids)
    except Exception as ex: print("Llama недоступна:", ex, file=sys.stderr)
    # Claude: точный API, иначе прокси (устаревший токенизатор, ЗАВЫШАЕТ для 3.5)
    if os.getenv("ANTHROPIC_API_KEY"):
        import anthropic
        cl = anthropic.Anthropic(); model = os.getenv("ANTHROPIC_MODEL", "claude-3-5-sonnet-latest")
        c["Claude 3.5 Sonnet"] = lambda t: cl.messages.count_tokens(
            model=model, messages=[{"role": "user", "content": t}]).input_tokens
    else:
        try:
            from tokenizers import Tokenizer
            from huggingface_hub import hf_hub_download as d
            C = Tokenizer.from_file(d("Xenova/claude-tokenizer", "tokenizer.json"))
            c["Claude 3.5 Sonnet"] = lambda t: len(C.encode(t, add_special_tokens=False).ids)
            print("Claude: ПРОКСИ (legacy-токенизатор), задайте ANTHROPIC_API_KEY для точного.", file=sys.stderr)
        except Exception as ex: print("Claude недоступен:", ex, file=sys.stderr)
    if os.getenv("YANDEX_API_KEY") and os.getenv("YANDEX_FOLDER_ID"):
        import requests
        model = os.getenv("YANDEX_MODEL", "yandexgpt")
        def y(t):
            r = requests.post("https://llm.api.cloud.yandex.net/foundationModels/v1/tokenize",
                headers={"Authorization": f"Api-Key {os.environ['YANDEX_API_KEY']}"},
                json={"modelUri": f"gpt://{os.environ['YANDEX_FOLDER_ID']}/{model}", "text": t}, timeout=30)
            r.raise_for_status(); return len(r.json()["tokens"])
        c["YandexGPT"] = y
    else:
        try:
            from tokenizers import Tokenizer
            from huggingface_hub import hf_hub_download as d
            Y = Tokenizer.from_file(d("Vikhrmodels/Vikhr-YandexGPT-5-Lite-8B-it", "tokenizer.json"))
            c["YandexGPT"] = lambda t: len(Y.encode(t, add_special_tokens=False).ids)
            print("YandexGPT: ПРОКСИ (токенизатор Vikhr/YandexGPT-5-Lite), задайте YANDEX_API_KEY+YANDEX_FOLDER_ID.", file=sys.stderr)
        except Exception as ex: print("Yandex недоступен:", ex, file=sys.stderr)
    return c

def words(t): return len(re.findall(r"\S+", t))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--en", default="en"); ap.add_argument("--ru", default="ru"); ap.add_argument("--csv")
    a = ap.parse_args()
    en = {p.name: p for p in Path(a.en).glob("*.txt")}; ru = {p.name: p for p in Path(a.ru).glob("*.txt")}
    names = sorted(set(en) & set(ru))
    for n in sorted(set(en) ^ set(ru)): print("Пропущен (нет пары):", n, file=sys.stderr)
    if not names: sys.exit("Нет парных .txt файлов в en/ и ru/")
    E = [en[n].read_text(encoding="utf-8") for n in names]; R = [ru[n].read_text(encoding="utf-8") for n in names]
    S = {"en": dict(w=sum(map(words, E)), ch=sum(map(len, E))), "ru": dict(w=sum(map(words, R)), ch=sum(map(len, R)))}
    print(f"\nПар: {len(names)} | EN: {S['en']['w']} слов, {S['en']['ch']} симв. | RU: {S['ru']['w']} слов, {S['ru']['ch']} симв.\n")
    rows = []
    for m, f in counters().items():
        te = [f(t) for t in E]; tr = [f(t) for t in R]; TE, TR = sum(te), sum(tr)
        prem = TR / TE; pi, po = PRICES[m]; n = len(names)
        rows.append(dict(model=m, en_tokens=TE, ru_tokens=TR, premium=round(prem, 2),
            min_prem=round(min(b/a for a, b in zip(te, tr)), 2), max_prem=round(max(b/a for a, b in zip(te, tr)), 2),
            en_tpw=round(TE/S["en"]["w"], 2), ru_tpw=round(TR/S["ru"]["w"], 2),
            en_cpt=round(S["en"]["ch"]/TE, 2), ru_cpt=round(S["ru"]["ch"]/TR, 2),
            cost_per_1k_en=round(TE/n*pi/1e6*1000, 3), cost_per_1k_ru=round(TR/n*pi/1e6*1000, 3),
            cur=CUR.get(m, "USD"), ctx=CTX[m],
            ru_words_fit_k=round(CTX[m]/(TR/S["ru"]["w"])/1000, 1), en_words_fit_k=round(CTX[m]/(TE/S["en"]["w"])/1000, 1),
            latency_x=round(prem, 2)))
    hdr = f"{'Модель':<20}{'EN ток':>8}{'RU ток':>8}{'RU/EN':>7}{'диапаз.':>12}{'ток/сл RU':>10}{'сим/ток RU':>11}{'стоим.+%':>9}"
    print(hdr); print("-" * len(hdr))
    for r in rows:
        print(f"{r['model']:<20}{r['en_tokens']:>8}{r['ru_tokens']:>8}{r['premium']:>7}{str(r['min_prem'])+'-'+str(r['max_prem']):>12}"
              f"{r['ru_tpw']:>10}{r['ru_cpt']:>11}{(r['premium']-1)*100:>8.0f}%")
    print("\nСтоимость 1000 запросов размером как средняя пара (вход) и ёмкость окна (тыс. слов):")
    for r in rows:
        print(f"  {r['model']:<20}EN {r['cost_per_1k_en']} / RU {r['cost_per_1k_ru']} {r['cur']} | окно {r['ctx']}: EN ~{r['en_words_fit_k']}k сл., RU ~{r['ru_words_fit_k']}k сл.")
    print("\nЗадержка: время генерации ~ числу выходных токенов, т.е. RU медленнее примерно в 'RU/EN' раз.")
    if a.csv:
        with open(a.csv, "w", newline="", encoding="utf-8") as fh:
            w = csv.DictWriter(fh, fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
        print("CSV:", a.csv)

if __name__ == "__main__": main()
