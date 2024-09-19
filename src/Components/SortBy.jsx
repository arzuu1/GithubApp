import '../styles/sortby.css' 
import React from 'react';

const SortBy = ({ sortOption, setSortOption }) => {
  return (
    <div className="sort-container">
      <label htmlFor="sort-options">Sort by:</label>
      <select
        id="sort-options"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="stars_desc">Most stars</option>
        <option value="stars_asc">Fewest stars</option>
        <option value="forks_desc">Most forks</option>
        <option value="forks_asc">Fewest forks</option>
        <option value="updated_desc">Recently updated</option>
        <option value="updated_asc">Least recently updated</option>
      </select>
    </div>
  );
};

export default SortBy;
