// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Add search functionality here
        console.log(`Searching for: ${searchTerm}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search recipes..."
                className="px-4 py-2 border rounded-l-lg focus:outline-none"
            />
            <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-lg">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
