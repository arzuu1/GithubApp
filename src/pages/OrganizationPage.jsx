import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/organizations.css';
import { config } from "../config";
import { api } from "../api";

function OrganizationsPage() {
  const { username } = useParams();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const axiosOrganizations = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/${username}/orgs`);

        setOrganizations(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    axiosOrganizations();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <table className="organizations-table">
        <thead>
          <tr>
            <th>Organization Name</th>
          </tr>
        </thead>
        <tbody>
          {organizations.length === 0 ? (
            <tr>
              <td colSpan="1">No organizations found.</td>
            </tr>
          ) : (
            organizations.map((org) => (
              <tr key={org.id}>
                <td>{org.login}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrganizationsPage;
