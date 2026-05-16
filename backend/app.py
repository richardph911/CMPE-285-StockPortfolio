from flask import Flask, request, jsonify
from flask_cors import CORS
from portfolio import generate_portfolio

app = Flask(__name__)
CORS(app)

@app.route("/api/portfolio", methods=["POST", "OPTIONS"])
def portfolio():
    if request.method == "OPTIONS":
        return "", 200
    data = request.get_json()
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

if __name__ == "__main__":
    app.run(debug=True, port=5000)