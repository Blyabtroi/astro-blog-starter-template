---
title: 'Russian vs English: tokenization efficiency and cost'
description: 'How much more Russian costs on GPT-4o, Llama 3, Claude, and YandexGPT: measured token premiums, context fill, latency, and translit pitfalls.'
pubDate: 2026-10-09
locale: en
translationSlug: ru-en-tokenization-cost
---

Models: OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Meta Llama 3, YandexGPT. Date: 9 October 2026.

## Bottom line

- On GPT-4o, the same content costs about 1.4x more tokens in Russian than in English. On GPT-4 (cl100k) the premium was about 2.4x.
- On Llama 3 the premium is about 1.6x.
- Claude 3.5 Sonnet has no public tokenizer, so I could not measure it directly. A legacy Claude tokenizer gives about 2.7x. That is probably an upper bound, because a secondary source claims about 1.5x for Claude 3.5 and later models. Treat 1.5x to 2.7x as the plausible range and verify with Anthropic's token-counting endpoint before budgeting.
- YandexGPT's tokenizer is built for Russian. Its Russian premium is about 1.0x, and Russian is slightly cheaper than English.
- Russian in Latin translit makes things worse on modern tokenizers: on GPT-4o you get 1.48x more tokens than Cyrillic. See the "Cyrillic and translit" section.
- Because providers charge per token, the token premium is the price premium. Context fill and generation time scale by the same factor.

## Method

1. **Parallel text.** I wrote five semantically equivalent English/Russian paragraphs in five genres: news, technical, legal, customer-chat and literary. Each language totals about 1,900 characters. English has 320 words and Russian has 277.
2. **Counting.** I ran them through local tokenizers.

| Model | Tokenizer used | Status |
|---|---|---|
| GPT-4o | `o200k_base` via tiktoken | Exact |
| GPT-4 (reference) | `cl100k_base` | Exact |
| Llama 3 | Official 128k byte-level BPE vocabulary | Exact |
| Claude 3.5 Sonnet | Legacy public Claude tokenizer | Proxy only. The 3.5 tokenizer is not published. |
| YandexGPT | Tokenizer of Vikhr-YandexGPT-5-Lite, a derivative of YandexGPT 5 Lite | Proxy. It may differ slightly from the API's Pro models. |

3. **Caveat.** The sample is small, so treat decimals as indicative. Per-genre premiums moved by about plus or minus 0.2.

## Token counts for identical content

Totals are across all five paragraphs.

| Model | EN tokens | RU tokens | Token expansion (RU/EN) | Per-genre range |
|---|---:|---:|---:|---|
| GPT-4o (o200k) | 356 | 493 | **1.38x** | 1.22 to 1.47 |
| GPT-4 (cl100k), reference | 359 | 856 | **2.38x** | 2.21 to 2.60 |
| Llama 3 | 359 | 573 | **1.60x** | 1.45 to 1.76 |
| Claude legacy tokenizer (Claude 3.5 proxy) | 364 | 977 | **2.68x** | 2.46 to 3.17 |
| YandexGPT 5 Lite (proxy) | 367 | 365 | **0.99x** | 0.90 to 1.07 |

Average tokens per paragraph (RU): GPT-4o 99 (EN 71), Llama 3 115 (EN 72), Claude proxy 195 (EN 73), YandexGPT 73 (EN 73).

## Tokens per word and characters per token

| Model | EN tokens/word | RU tokens/word | EN chars/token | RU chars/token |
|---|---:|---:|---:|---:|
| GPT-4o | 1.11 | 1.78 | 5.36 | 4.00 |
| GPT-4 (cl100k) | 1.12 | 3.09 | 5.31 | 2.30 |
| Llama 3 | 1.12 | 2.07 | 5.31 | 3.44 |
| Claude proxy | 1.14 | 3.53 | 5.24 | 2.02 |
| YandexGPT 5 Lite | 1.15 | 1.32 | 5.20 | 5.40 |

Russian words are longer and more inflected, so tokens per word overstates the penalty. The fair comparison is tokens for identical meaning, which is the premium column above. An independent test by [a Habr author](https://habr.com/ru/articles/1089148/) found similar results on different texts:

| Model | RU/EN ratio | RU chars/token |
|---|---:|---:|
| YandexGPT 5 Lite | 0.91 | 5.11 |
| o200k | 1.19 | 4.01 |
| cl100k | 2.09 | 2.29 |

That author's Claude measurement is for Claude Opus 5, not 3.5, so I do not use it for Claude 3.5 Sonnet. It gave 2.96x and 1.03 chars/token.

## Petrov et al. 2023

[Petrov et al. (NeurIPS 2023)](https://arxiv.org/abs/2305.15425) define tokenization premium as the token length for a language relative to English. They measured it on the parallel FLORES-200 corpus (2,000 sentences, 200 languages).

- **Russian under ChatGPT and GPT-4 (cl100k):** 2.49x, listed in the extended table in [the paper's appendix](https://arxiv.org/pdf/2305.15425). My 2.38x measurement is close.
- **Pricing:** OpenAI charges per token, so the paper treats premiums as direct cost premiums. German and Italian cost about 50% more than English on ChatGPT and GPT-4. Some languages cost more than 12x.
- **Context:** Fixed windows hold much less content in high-premium languages. For languages like Burmese and Dzongkha the paper says less than one-tenth as much content fits.
- **Latency:** In the RoBERTa experiment, processing time grew linearly with token length. The slowest language, Shan, took almost twice as long as English. Petrov et al. do not report latency for GPT-4-class API models.
- **Update:** The 2023 numbers predate GPT-4o. OpenAI's larger vocabulary (about 4,660 Cyrillic tokens in o200k versus 435 in cl100k, per [a Habr analysis](https://habr.com/ru/articles/1032610/)) cut the Russian premium from about 2.4x to about 1.4x.

## Cyrillic and translit

What if you write Russian in Latin letters (for example, "Gorodskoy sovet" instead of "Городской совет")? I transliterated the same five Russian paragraphs with a simple scheme (no diacritics; hard and soft signs dropped) and counted tokens with the same tokenizers. The `tokcmp.py --translit` flag reproduces this measurement.

| Model | EN tokens | RU Cyrillic | RU translit | Translit vs Cyrillic | Translit vs EN | Translit chars/token |
|---|---:|---:|---:|---:|---:|---:|
| GPT-4o | 356 | 493 | 730 | 1.48x | 2.05x | 2.85 |
| GPT-4 (cl100k) | 359 | 856 | 806 | 0.94x | 2.25x | 2.58 |
| Llama 3 | 359 | 573 | 780 | 1.36x | 2.17x | 2.67 |
| Claude proxy | 364 | 977 | 839 | 0.86x | 2.30x | 2.48 |
| YandexGPT 5 Lite (proxy) | 367 | 365 | 776 | 2.13x | 2.11x | 2.68 |

- **Modern tokenizers:** On GPT-4o, Llama 3, and YandexGPT, translit uses 36% to 113% more tokens than Cyrillic. Their vocabularies include whole Russian tokens, while Latin transliteration breaks into fragments like `shch` or `zhd`.
- **Legacy tokenizers:** On GPT-4 and the Claude proxy, translit saves 6% and 14%. Both have weak Cyrillic coverage. Russian in translit is still 2.2x to 2.3x more expensive than English, so the premium does not disappear.
- **Cost and capacity:** Token counts map directly to price, context fill, and generation time, as in the main sections. On GPT-4o, translit raises the Russian premium from 1.38x to 2.05x.
- **Quality:** Models generally understand and generate translit worse, especially long and rare words. I did not measure quality in this report.
- **Limitations:** One transliteration scheme and five paragraphs; figures are indicative. A scheme with diacritics would look worse.

## Financial premium

The Russian premium equals the token premium, since the price per token is the same. Prices used:

- GPT-4o: [$2.50 input and $10 output per 1M tokens](https://developers.openai.com/api/docs/models/gpt-4o).
- Claude 3.5 Sonnet: [$3 input and $15 output](https://whatsthebigdata.com/ai-model/claude-3-5-sonnet/).
- Llama 3: [about $0.88 per 1M tokens on Together](https://tokenmix.ai/blog/llama-3-3-70b?lang=es). That is the Llama 3.3 70B listing, used as a proxy for hosted Llama 3 pricing. Prices vary by provider.
- YandexGPT Pro 5.1: [₽0.8 per 1K tokens input and output](https://aibot.direct/modeli/yandexgpt).

Cost of 1,000 paragraph-sized requests (about 70 English tokens each):

| Model | EN input | RU input | EN output | RU output | Premium |
|---|---:|---:|---:|---:|---:|
| GPT-4o | $0.18 | $0.25 | $0.71 | $0.99 | +38% |
| Claude 3.5 Sonnet (proxy counts) | $0.22 | $0.59 | $1.09 | $2.93 | +168% (about +50% under the secondary 1.5x claim) |
| Llama 3 (about $0.88/M) | $0.06 | $0.10 | $0.06 | $0.10 | +60% |
| YandexGPT Pro 5.1 (Yandex-tokenizer counts) | ₽58.7 | ₽58.4 | ₽58.7 | ₽58.4 | -1% |

For a larger workload, scale linearly. A Russian service spending $10,000 a month on GPT-4o English traffic would pay about $13,800 for the same Russian traffic. With Claude, the same service would pay roughly $15,000 to $26,800.

## Context window fill

Content with the meaning of 5,000 English words (about 10 pages) uses this share of the window:

| Model | Window | EN fill | RU fill | English-equivalent words that fit (EN / RU) |
|---|---:|---:|---:|---|
| GPT-4o | 128K | 4.3% | 6.0% | about 115K / about 83K |
| Claude 3.5 Sonnet (proxy) | 200K | 2.8% | 7.6% | about 176K / about 66K |
| Llama 3 (original) | 8K | 68% | 109% (overflows) | about 7.3K / about 4.6K |
| YandexGPT Pro 5.1 | 128K | 4.5% | 4.5% | about 112K / about 112K |

- GPT-4o's Russian effective capacity is about 28% smaller than its English capacity.
- Claude's would be about 63% smaller under the proxy tokenizer.
- Llama 3's original 8K window is tight for Russian. Llama 3.1 and later extended it to 128K.
- Window sizes are as listed in each vendor's documentation and may differ by deployment. Llama 3's 8K is from memory and was not re-checked this session.

## Latency impact

Generation time is roughly proportional to output tokens, as [NVIDIA's benchmarking guide](https://developer.nvidia.com/blog/llm-benchmarking-fundamental-concepts/) and Petrov et al.'s linear scaling suggest. Russian output is therefore slower in proportion to its premium. Prompt processing also grows with prompt tokens.

Illustration for a reply that takes 500 tokens in English, at an assumed 60 tokens per second (my assumption, not a measured speed):

| Model | EN time | RU time | Slowdown |
|---|---:|---:|---:|
| GPT-4o | 8.3 s | 11.5 s | +38% |
| Llama 3 | 8.3 s | 13.3 s | +60% |
| Claude (proxy) | 8.3 s | 22.4 s | +168% |
| YandexGPT | 8.3 s | 8.3 s | about 0% |

Real latency also depends on server load, hardware and model size. None of the sources I found measured Russian-versus-English latency directly on commercial APIs.

## Recommendations

1. Budget Russian traffic on GPT-4o at about 1.4x English and on Llama 3 at about 1.6x. Do not use the old 2.4x figure for GPT-4o.
2. Measure Claude with the token-counting endpoint on your own Russian content before committing to a budget.
3. For heavy Russian workloads, compare cost per 1,000 characters rather than cost per token. YandexGPT's per-token price is higher than the others, but its token efficiency can offset that.
4. Keep prompts and system instructions in English where quality allows. That pays the premium only on user content and output.
5. Do not transliterate Russian to save tokens on GPT-4o, Llama 3, or YandexGPT. It costs more and usually hurts quality.
6. Use Llama 3.1 or later for long Russian documents instead of the original 8K Llama 3.

## Limitations

- Five paragraphs is a small sample. Petrov et al. used 2,000 sentences.
- The Claude 3.5 and YandexGPT figures are proxies, not API-measured.
- The Llama price is a proxy from a Llama 3.3 listing.

## Reproducibility

Sample paragraphs and the `tokcmp` script are in the [repository](https://github.com/Blyabtroi/astro-blog-starter-template/tree/main/tokcmp). Run `pip install -r requirements.txt` and `python tokcmp.py --csv result.csv` from that directory; add `--translit` for the translit comparison.
