import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/RepositoriesPage.css';
import SortBy from '../Components/SortByComponent';
import PaginationComponent from "../Components/PaginationComponent";

function RepositoriesPage() {
  const { username } = useParams();
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRepos, setTotalRepos] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("stars_desc");
  const perPage = 10;

  useEffect(() => {
    const fetchRepositories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        const data = response.data;

        const totalCountHeader = response.headers['x-total-count'];
        const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : data.length;

        setTotalRepos(totalCount);
        setTotalPages(Math.ceil(totalCount / perPage));

        // ---SORTBY --- 
        const sortedData = data.sort((a, b) => {
          switch (sortOption) {
            case "stars_desc":
              return b.stargazers_count - a.stargazers_count;
            case "stars_asc":
              return a.stargazers_count - b.stargazers_count;
            case "forks_desc":
              return b.forks_count - a.forks_count;
            case "forks_asc":
              return a.forks_count - b.forks_count;
            case "updated_desc":
              return new Date(b.updated_at) - new Date(a.updated_at);
            case "updated_asc":
              return new Date(a.updated_at) - new Date(b.updated_at);
            default:
              return 0;
          }
        });

        // ---SORTBY END--- 

        const paginatedData = sortedData.slice((currentPage - 1) * perPage, currentPage * perPage);

        setRepos(paginatedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [username, currentPage, sortOption]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <div className="total-container">
        <div className="total-repos">
          <span>Total Repositories: {totalRepos}</span>
        </div>
      </div>
      <div className="sort-container">
        <SortBy sortOption={sortOption} setSortOption={setSortOption} />
      </div>
      <table className="repositories-table">
        <tbody>
          {repos.length === 0 ? (
            <tr>
              <td colSpan="1">Heç bir repozitoriya tapılmadı.</td>
            </tr>
          ) : (
            repos.map((repo) => (
              <tr key={repo.id}>
                <td>
                  <ul>
                    <li>{repo.name}</li>
                  </ul>
                </td>
              </tr>
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
  );
}

export default RepositoriesPage;
