import { useState, useEffect } from 'react';

const SearchStock = () => {
    const [query, setQuery] = useState('');
    const [stockList, setStockList] = useState([]);  // List of stock companies
    const [filteredStocks, setFilteredStocks] = useState([]);  // Filtered list based on input
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Control dropdown visibility


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

        if (value) {
            const filtered = stocklist.filter(company => company.name.toLowerCase().includes(value.toLowerCase()) || company.symbol.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredStocks(filtered);
        } else {
            setFilteredStocks([]);
        }
    }

    const handleSelectStock = (company) => {
        setQuery(company.name);  // Set selected company in input
        setIsDropdownVisible(false);  // Hide dropdown
    };


    return (
        
    )
}

export default SearchStock
