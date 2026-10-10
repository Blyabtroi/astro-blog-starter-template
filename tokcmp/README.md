# tokcmp
Положите парные .txt файлы с одинаковыми именами в `en/` и `ru/` (одинаковый смысл), затем:
    pip install -r requirements.txt
    python tokcmp.py --csv result.csv
Для точного Claude/YandexGPT задайте переменные окружения (см. шапку tokcmp.py). Без них используются прокси.
Цены и окна контекста в словарях PRICES/CTX в начале файла: проверьте актуальность.
