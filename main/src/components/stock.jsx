"use client";
import { useEffect, useState } from 'react';
import StockChart from '../components/StockChart'; // Adjust the path if needed

export default function Home() {
    const [data, setData] = useState(null);
    const [query, setQuery] = useState('');
    const [stockList, setStockList] = useState([]);  // List of stock companies
    const [filteredStocks, setFilteredStocks] = useState([]);  // Filtered list based on input
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Control dropdown visibility
    const [selectedSymbol, setSelectedSymbol] = useState('');


    const companies = [
        { symbol: 'AAPL', name: 'Apple Inc.' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.' },
        { symbol: 'MSFT', name: 'Microsoft Corporation' },
        { symbol: 'AMZN', name: 'Amazon.com, Inc.' },
        { symbol: 'TSLA', name: 'Tesla, Inc.' },
        { symbol: 'NVDA', name: 'NVIDIA Corporation' },
        { symbol: 'META', name: 'Meta Platforms, Inc.' },
        { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.' },
        { symbol: 'TSM', name: 'Taiwan Semiconductor Manufacturing Company' },
        { symbol: 'LLY', name: 'Eli Lilly and Company' },
        { symbol: 'WMT', name: 'Walmart Inc.' },
        { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
        { symbol: 'NVO', name: 'Novo Nordisk A/S' },
        { symbol: 'V', name: 'Visa Inc.' },
        { symbol: 'UNH', name: 'UnitedHealth Group Incorporated' },
        { symbol: 'XOM', name: 'Exxon Mobil Corporation' },
        { symbol: 'MA', name: 'Mastercard Incorporated' },
        { symbol: 'TCEHY', name: 'Tencent Holdings Limited' },
        { symbol: 'ORCL', name: 'Oracle Corporation' },
        { symbol: 'PG', name: 'Procter & Gamble Co.' }
    ];

    useEffect(() => {
        setStockList(companies);
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value === "") {
            // Show all companies if search is empty
            setFilteredStocks(companies);
            setIsDropdownVisible(true); // Keep the dropdown visible
        } else {
            // Filter companies based on input
            const filtered = companies.filter(company =>
                company.name.toLowerCase().includes(value.toLowerCase()) ||
                company.symbol.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredStocks(filtered);
            setIsDropdownVisible(true); // Show dropdown with filtered companies
        }
    };


    const handleSelectStock = (company) => {
        setQuery(company.name);  // Set selected company name in input
        setSelectedSymbol(company.symbol);  // Store the selected company's symbol (ticker)
        setIsDropdownVisible(false);  // Hide dropdown
    };


    const handleFocus = () => {
        setIsDropdownVisible(true);  // Hide dropdown when input is focused
    };

    const handleBlur = () => {
        // Optional: Hide dropdown when input loses focus
        setTimeout(() => {
            setIsDropdownVisible(false);
        }, 200); // Short delay to allow clicking on the dropdown item
    };

    const handleSearch = async () => {
        if (selectedSymbol) {
            try {
                const response = await fetch('http://localhost:5000/api/stock-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ticker: selectedSymbol }),  // Send selected symbol to backend
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Stock data received:', result);
                setData(result);  // Update the chart with the new stock data
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        } else {
            alert("Please select a company from the dropdown.");
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Stock Analyzer</h1>
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {data ? (
                        <div className="w-full md:w-2/3 bg-white rounded-xl shadow-lg p-5">
                            <h2 className="text-xl font-semibold text-gray-700 mb-5">Predicted Stock Values</h2>
                            <div className="h-[400px]">
                                <StockChart data={data} />
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Loading...</p>
                    )}

                    {/* Sidebar */}
                    <div className="w-full md:w-1/3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-xl p-8 flex flex-col items-center">
                        <h1 className="text-2xl font-bold text-white mb-2">Save Money</h1>
                        <h2 className="text-lg text-white mb-4">Let's Save Some Money</h2>

                        {/* Search input */}
                        <input
                            className="w-full p-3 rounded-lg border-none text-black focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            type="search"
                            placeholder="Search top companies to invest in"
                            value={query}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleSearchChange}
                        />

                        {/* Dropdown list for filtered companies */}
                        {isDropdownVisible && filteredStocks.length > 0 && (
                            <ul className="w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-md">
                                {filteredStocks.map((company, index) => (
                                    <li
                                        key={index}
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSelectStock(company)}
                                    >
                                        {company.name} ({company.symbol})
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button onClick={handleSearch} className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all">
                            Search
                        </button>
                    </div>

                    <div>
                        {data ? (
                            <h2>Percentage Increase {data.percentage_increase} </h2>

                        ) : (
                            <p>loading..</p>
                        )}
                    </div>


                </div>
            </div>
        </div>
    );
}

