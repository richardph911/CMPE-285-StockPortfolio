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

def get_ticker_data(ticker):
    """returns (current_price, closes, dates) or (None, [], [])."""
    try:
        hist = yf.Ticker(ticker).history(period="5d")
        if hist.empty:
            return None, [], []
        closes = hist["Close"].tolist()
        dates  = hist.index.strftime("%a %b %d").tolist()
        return float(closes[-1]), closes, dates
    except Exception:
        return None, [], []


def get_selected_tickers(selected_strategies):
    tickers = []
    for strategy_key in selected_strategies:
        if strategy_key in STRATEGIES:
            tickers.extend(STRATEGIES[strategy_key]["stocks"])
    return list(dict.fromkeys(tickers))


def generate_portfolio(investment, selected_strategies):
    tickers = get_selected_tickers(selected_strategies)
    if not tickers:
        return None

    money_per_stock = investment / len(tickers)

    portfolio = []
    total_current_value = 0.0
    portfolio_5day_values = None
    trend_labels = []

    for ticker in tickers:
        current_price, closes, dates = get_ticker_data(ticker)

        if current_price is None or current_price <= 0:
            continue

        shares = money_per_stock / current_price
        current_value = shares * current_price
        total_current_value += current_value

        # Use dates from first successful ticker
        if not trend_labels and dates:
            trend_labels = dates

        if len(closes) >= 1:
            stock_5day_values = [round(shares * price, 2) for price in closes]

            if portfolio_5day_values is None:
                portfolio_5day_values = stock_5day_values
            else:
                # Align lengths in case histories differ by a day
                min_len = min(len(portfolio_5day_values), len(stock_5day_values))
                portfolio_5day_values = [
                    round(portfolio_5day_values[i] + stock_5day_values[i], 2)
                    for i in range(min_len)
                ]
                trend_labels = trend_labels[:min_len]

        portfolio.append({
            "ticker":        ticker,
            "allocation":    round(money_per_stock, 2),
            "current_price": round(current_price, 2),
            "shares":        round(shares, 4),
            "current_value": round(current_value, 2)
        })

    return {
        "investment":               round(investment, 2),
        "selected_strategies":      selected_strategies,
        "selected_strategy_labels": [
            STRATEGIES[key]["label"] for key in selected_strategies if key in STRATEGIES
        ],
        "portfolio":          portfolio,
        "total_current_value": round(total_current_value, 2),
        "trend_labels":        trend_labels,
        "trend_values":        portfolio_5day_values if portfolio_5day_values else []
    }