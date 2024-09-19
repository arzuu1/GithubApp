import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/search.css';
import { config } from "../config";
import { api } from "../api";

function SearchComponent({ setSearchResults, setQuery, query }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search query.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(
        `/search/users?q=${query}&page=1`
      );
      setSearchResults(response.data.items || []);
      navigate(`/search?q=${encodeURIComponent(query)}&type=repositories`);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
      alert("Search failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search GitHub users" 
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>
    </div>
  );
}

export default SearchComponent;
