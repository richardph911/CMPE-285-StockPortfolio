from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.portfolio import generate_portfolio
import traceback

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

    try:
        data = request.get_json() or {}

        amount = float(data.get("amount", 0))
        strategies = data.get("strategies", [])

        if amount < 5000:
            return jsonify({"error": "Minimum investment is $5,000"}), 400

        if not strategies:
            return jsonify({"error": "Select at least one strategy"}), 400

        result = generate_portfolio(amount, strategies)

        if result is None:
            return jsonify({"error": "No valid tickers found"}), 400

        return jsonify(result)

    except Exception as e:
        return jsonify({
            "error": str(e),
            "trace": traceback.format_exc()
        }), 500