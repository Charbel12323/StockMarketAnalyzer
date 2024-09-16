import yfinance as yf
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request  # Added request to handle POST data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/api/stock-data', methods=['POST'])
def get_stock_data():
    # Get ticker from the request body
    data = request.get_json()
    ticker = data.get('ticker')

    if not ticker:
        return jsonify({'error': 'Ticker symbol is required.'}), 400

    try:
        df = yf.Ticker(ticker).history(period="1y")
        initial_price = df['Close'].iloc[0]
        final_price = df['Close'].iloc[-1]
        percentage_increase = ((final_price - initial_price) / initial_price) * 100

        closing_prices = df['Close'].values
        opening_prices = df['Open'].values
        percentage_changes = ((closing_prices - opening_prices) / opening_prices) * 100

        initial_value = 100
        current_value = initial_value
        original_value = initial_value
        predicted_values = [current_value]

        for change in percentage_changes:
            daily_change = (original_value * (change / 100))
            current_value += daily_change
            predicted_values.append(current_value)

        final_value = predicted_values[-1]
        overall_percentage_increase = ((final_value - initial_value) / initial_value) * 100

        response = {
            'percentage_increase': percentage_increase,
            'predicted_values': predicted_values,
            'overall_percentage_increase': overall_percentage_increase
        }

        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(port=5000)
