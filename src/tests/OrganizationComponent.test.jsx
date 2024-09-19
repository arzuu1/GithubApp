import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import OrganizationsComponent from './OrganizationsComponent';
import axios from 'axios';
import './axios'; 

describe('OrganizationsComponent', () => {
  test('should display organizations when API returns data', async () => {
    render(
      <Router>
        <OrganizationsComponent username="testuser" />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Organization1')).toBeInTheDocument();
      expect(screen.getByText('Organization2')).toBeInTheDocument();
    });
  });

  test('should handle API errors gracefully', async () => {
    render(
      <Router>
        <OrganizationsComponent username="testuser" />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Something error...')).toBeInTheDocument();
    });
  });
});
