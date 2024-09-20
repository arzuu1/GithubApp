import '@testing-library/jest-dom'; 
import { render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { api } from '../api';
import OrganizationsComponent from '../Components/Organizations';

describe('OrganizationsComponent', () => {

  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(api);
  });


  const mockOrganizations = [
    { id: 1, login: 'org1' },
    { id: 2, login: 'org2' },
  ];

  test('renders organization list after successful API call', async () => {
    
    mockAxios.onGet('/users/testuser/orgs').reply(200, mockOrganizations);

   
    render(<OrganizationsComponent username="testuser" />);

    expect(screen.getByText(/Organizations:/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('org1')).toBeInTheDocument();
      expect(screen.getByText('org2')).toBeInTheDocument();
    });
  });

  test('renders error message when API call fails', async () => {
    
    mockAxios.onGet('/users/testuser/orgs').reply(500);

    render(<OrganizationsComponent username="testuser" />);

    await waitFor(() => {
      expect(screen.getByText('Something error...')).toBeInTheDocument();
    });
  });

  test('displays no organizations when API returns an empty list', async () => {
    
    mockAxios.onGet('/users/testuser/orgs').reply(200, []);

    render(<OrganizationsComponent username="testuser" />);

    expect(screen.getByText(/Organizations:/i)).toBeInTheDocument();

    await waitFor(() => {
      const orgItems = screen.queryAllByRole('listitem');
      expect(orgItems.length).toBe(0);
    });
  });
});