from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/portfolio", methods=["POST", "OPTIONS"])
def portfolio():
    if request.method == "OPTIONS":
        return "", 200
    data = request.get_json()

    amount = data.get("amount")
    strategies = data.get("strategies")

    return jsonify({
        "investment": amount,
        "selected_strategy_labels": strategies,
        "total_current_value": amount,
        "portfolio": [],
        "trend_labels": ["Mon", "Tue", "Wed", "Thu", "Fri"],
        "trend_values": [amount, amount * 0.99, amount * 1.01, amount * 1.02, amount]
    })