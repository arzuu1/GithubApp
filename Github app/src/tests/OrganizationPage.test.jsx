import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import OrganizationsPage from './OrganizationsPage';
import './axios'; 

describe('OrganizationsPage', () => {
  test('should display organizations when API returns data', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('https://api.github.com/users/testuser/orgs').reply(200, [
      { id: 1, login: 'Organization1' },
      { id: 2, login: 'Organization2' }
    ]);

    render(
      <Router>
        <OrganizationsPage />
      </Router>
    );

   
    await waitFor(() => {
      expect(screen.getByText('Organization1')).toBeInTheDocument();
      expect(screen.getByText('Organization2')).toBeInTheDocument();
    });
  });

  test('should handle API errors gracefully', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('https://api.github.com/users/testuser/orgs').reply(500);

    render(
      <Router>
        <OrganizationsPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Request failed with status code 500')).toBeInTheDocument();
    });
  });
});
