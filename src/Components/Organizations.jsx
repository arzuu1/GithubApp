import React, { useState, useEffect } from "react";
import '../styles/organizations.css';
import { api } from "../api";

function OrganizationsComponent({ username }) {
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const axiosOrganizations = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/${username}/orgs`);
        setOrganizations(response.data);
        setError('')
      } catch (error) {
        setError("Something error...");
      } finally {
        setLoading(false);
      }
    };
    axiosOrganizations();
  }, [username]);

  return (
    <div className="organizations-list">
      <h3>Organizations:</h3>
      {error} 
      <ul>
        {organizations.map((org) => (
          <li key={org.id}>{org.login}</li>
        ))}
      </ul>
    </div>
  );
}

export default OrganizationsComponent;
