# Stock Portfolio Suggestion Engine

A fullstack web app that suggests a personalized stock portfolio based on
investment amount and strategy selection.

---

## Project Structure

```
portfolio/

├── app.py            # Flask REST API
├── portfolio.py      # functionalities + yfinance logic
└── requirements.txt
└── index.html        # Front end
```

---

## Quick Start

### 1. Backend (Flask + yfinance)

```bash

# Createa virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

The API will be available at **http://localhost:5000**

### 2. Frontend

Open `index.html` in your browser

>

---

## API Endpoints

| Method | Endpoint          | Description                         |
| ------ | ----------------- | ----------------------------------- |
| GET    | `/api/strategies` | Returns all strategy definitions    |
| POST   | `/api/portfolio`  | Returns a full portfolio suggestion |

### POST `/api/portfolio` — Request Body

```json
{
  "amount": 10000,
  "strategies": ["growth", "index"]
}
```

### POST `/api/portfolio` — Response

```json
{
  "amount_invested": 10000,
  "total_value": 10234.50,
  "gain_loss": 234.50,
  "gain_loss_pct": 2.35,
  "holdings": [
    {
      "ticker": "NVDA",
      "name": "NVIDIA Corp.",
      "strategies": ["growth"],
      "weight_pct": 28.1,
      "alloc_usd": 2810.00,
      "shares": 2.8543,
      "price": 985.12,
      "change_pct": 1.24,
      "current_value": 2812.35,
      "history": [
        { "date": "Mon Mar 10", "close": 972.50 },
        ...
      ]
    },
    ...
  ],
  "portfolio_history": [
    { "date": "Mon Mar 10", "value": 9945.20 },
    { "date": "Tue Mar 11", "value": 10012.80 },
    { "date": "Wed Mar 12", "value": 9988.60 },
    { "date": "Thu Mar 13", "value": 10105.30 },
    { "date": "Fri Mar 14", "value": 10234.50 }
  ],
  "strategies": [
    { "key": "growth", "label": "Growth Investing", "color": "orange" }
  ]
}
```

---

## Investment Strategies & Stock Mappings

| Strategy | Tickers                 | Weighting   |
| -------- | ----------------------- | ----------- |
| Ethical  | AAPL, ADBE, MSFT, NSRGY | 30/25/25/20 |
| Growth   | NVDA, META, AMZN, TSLA  | 35/30/20/15 |
| Index    | VTI, IXUS, ILTB         | 40/35/25    |
| Quality  | JNJ, V, PG, UNH         | 30/30/25/15 |
| Value    | BRK-B, JPM, XOM, CVX    | 35/30/20/15 |

When two strategies are selected, weights are averaged and renormalised to 100%.

---

## How Money Is Divided

Each stock receives a share of the invested capital proportional to its
**combined_weight**. For example, with \$10,000 and a stock weighted at 30%:

```
alloc_usd = 10000 × 0.30 = $3,000
shares    = 3000 / current_price
```

---

## Requirements

- Python 3.10+
- Flask 3.x
- flask-cors
- yfinance 0.2.40+

---
