import yfinance as yf

STRATEGIES = {
    "ethical": {
        "label": "Ethical Investing",
        "stocks": ["AAPL", "ADBE", "MSFT"]
    },
    "growth": {
        "label": "Growth Investing",
        "stocks": ["NVDA", "AMZN", "GOOGL", "META"]
    },
    "index": {
        "label": "Index Investing",
        "stocks": ["VTI", "IXUS", "ILTB"]
    },
    "quality": {
        "label": "Quality Investing",
        "stocks": ["PG", "COST", "JNJ", "V"]
    },
    "value": {
        "label": "Value Investing",
        "stocks": ["BRK-B", "JPM", "XOM", "BAC"]
    }
}

# [
#   {
#     "Date": "2026-03-14",
#     "Open": 197.10,
#     "High": 198.20,
#     "Low": 196.50,
#     "Close": 197.85,
#     "Volume": 52000000
#   }
# ]

def getPrice(ticker):
    hist = yf.Ticker(ticker).history(period="1d")
    return float(hist["Close"].iloc[-1])

def get_5days_history(ticker):
    hist = yf.Ticker(ticker).history(period="5d")
    return hist["Close"].tolist()

def get_selected_tickers(selected_strategies):
    """
    Combine tickers from selected strategies.
    """
    tickers = []
    for strategy_key in selected_strategies:
        if strategy_key in STRATEGIES:
            tickers.extend(STRATEGIES[strategy_key]["stocks"])
    return list(dict.fromkeys(tickers))

# stocks = strategy → tickers
# money_per_stock = investment / number_of_stocks
# shares = money_per_stock / price
# portfolio_value = shares × price
# trend = sum(shares × 5_day_price)