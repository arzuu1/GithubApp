import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import UserItemComponent from "./UserItemComponent";
import PaginationComponent from "./PaginationComponent";
import axios from 'axios';
import '../styles/userList.css'; 

function UserListComponent() {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); 
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q') || '';
    setQuery(searchQuery);

    const fetchUsers = async () => {
      if (!searchQuery.trim()) return;

      try {
        const response = await axios.get(
          `https://api.github.com/search/users`,
          {
            params: {
              q: searchQuery,
              page: currentPage,
              per_page: 10
            }
          }
        );
        setSearchResults(response.data.items || []);
        setTotalPages(Math.ceil(response.data.total_count / 10)); 
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
      }
    };
    
    fetchUsers();
  }, [location.search, currentPage]);

  return (
    <div>
      <SearchComponent setSearchResults={setSearchResults} query={query} setQuery={setQuery} />
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.length === 0 ? (
              <tr>
                <td colSpan="3">No users found.</td>
              </tr>
            ) : (
              searchResults.map((user) => (
                <UserItemComponent key={user.id} user={user} />
              ))
            )}
          </tbody>
        </table>
        <PaginationComponent 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          totalPages={totalPages} 
        />
      </div>
    </div>
  );
}

export default UserListComponent;
