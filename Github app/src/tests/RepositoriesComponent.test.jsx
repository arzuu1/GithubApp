import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RepositoriesComponent from './RepositoriesComponent';
import axios from 'axios';
import './axios'; 

describe('RepositoriesComponent', () => {
  test('should display repositories when API returns data', async () => {
    render(
      <Router>
        <RepositoriesComponent />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Repo1')).toBeInTheDocument();
      expect(screen.getByText('Repo2')).toBeInTheDocument();
      expect(screen.getByText('Cəmi Repozitoriyalar: 20')).toBeInTheDocument();
    });
  });

  test('should handle API errors gracefully', async () => {
    render(
      <Router>
        <RepositoriesComponent />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Repo məlumatları gətirilərkən bir xəta baş verdi.')).toBeInTheDocument();
    });
  });
});
