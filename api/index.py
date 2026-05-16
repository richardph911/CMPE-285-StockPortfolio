from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

@app.route("/api/portfolio", methods=["GET", "POST", "OPTIONS"])
def portfolio():
    if request.method == "GET":
        return jsonify({"status": "portfolio API is working"})

    if request.method == "OPTIONS":
        return "", 200

    data = request.get_json() or {}

    amount = float(data.get("amount", 10000))
    strategies = data.get("strategies", [])

    return jsonify({
        "investment": amount,
        "selected_strategy_labels": strategies,
        "total_current_value": amount + 25,
        "portfolio": [
            {
                "ticker": "AAPL",
                "allocation": amount * 0.5,
                "current_price": 200,
                "shares": (amount * 0.5) / 200,
                "current_value": amount * 0.5
            },
            {
                "ticker": "MSFT",
                "allocation": amount * 0.5,
                "current_price": 400,
                "shares": (amount * 0.5) / 400,
                "current_value": amount * 0.5 + 25
            }
        ],
        "trend_labels": ["Mon", "Tue", "Wed", "Thu", "Fri"],
        "trend_values": [
            amount,
            amount - 50,
            amount + 20,
            amount + 10,
            amount + 25
        ]
    })