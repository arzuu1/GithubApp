import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import './RepositoriesComponent.css'; 
import Pagination from './Pagination'; 
import SortBy from './SortBy'; 
import { api } from "../api";

const RepositoriesComponent = () => {
  const { username } = useParams();
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRepos, setTotalRepos] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("stars");

  useEffect(() => {
    const axiosRepositories = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/${username}/repos`, {
          params: {
            per_page: 10,
            page: currentPage,
            sort: sortOption,
          },
        });
        
        setRepos(response.data);

        const totalCount = parseInt(response.headers['x-total-count'] || response.data.length, 10);
        const maxRepos = totalCount > 1000 ? 1000 : totalCount; 
        setTotalRepos(maxRepos);
        setTotalPages(Math.ceil(maxRepos / 10));
      } catch (error) {
        setError("Repo məlumatları gətirilərkən bir xəta baş verdi.");
      } finally {
        setLoading(false);
      }
    };
    axiosRepositories();
  }, [username, currentPage, sortOption]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <div>Yüklənir...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="repositories-container">
      <h2>{username}'nin Repozitoriyaları</h2>
      <div className="total-repos">
        <span>Cəmi Repozitoriyalar: {totalRepos}</span>
      </div>
      <SortBy sortOption={sortOption} setSortOption={setSortOption} />
      <table className="repositories-table">
        <thead>
          <tr>
            <th>Repozitoriyanın Adı</th>
          </tr>
        </thead>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RepositoriesComponent;
