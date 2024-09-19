import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchComponent from "./Components/Search";
import UserListComponent from "./Components/UserListComponent";
import OrganizationsPage from "./pages/OrganizationPage";
import RepositoriesPage from "./pages/RepositoriesPage";
import './styles/App.css'
function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SearchComponent
              setSearchResults={setSearchResults}
              setQuery={setQuery}
              query={query}
            />
          }
        />
        <Route
          path="/search"
          element={
            <UserListComponent
              searchResults={searchResults}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        />
        <Route path="/organizations/:username" element={<OrganizationsPage />} />
        <Route path="/repositories/:username" element={<RepositoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;