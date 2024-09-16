import axios from 'axios';

export async function handler(req, res) {
    try {
        // Fetch stock data
        const ticker = 'AAPL';
        const response = await axios.get(`https://api.example.com/stock/${ticker}`); // Replace with actual API
        const data = response.data;

        // Example data processing
        const initialPrice = data[0].close;
        const finalPrice = data[data.length - 1].close;
        const percentageIncrease = ((finalPrice - initialPrice) / initialPrice) * 100;

        // Send JSON response
        res.status(200).json({ percentageIncrease, stockData: data });
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
}