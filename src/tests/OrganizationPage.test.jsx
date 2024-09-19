import '@testing-library/jest-dom'; // for matchers like 'toBeInTheDocument'
import { render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { api } from '../api';
import OrganizationsComponent from '../Components/Organizations';

describe('OrganizationsComponent', () => {

  let mockAxios;

  // Set up a mock for axios
  beforeEach(() => {
    mockAxios = new MockAdapter(api);
  });

  // Reset mocks after each test
  afterEach(() => {
    mockAxios.reset();
  });

  const mockOrganizations = [
    { id: 1, login: 'org1' },
    { id: 2, login: 'org2' },
  ];

  test('renders organization list after successful API call', async () => {
    // Mock the API response
    mockAxios.onGet('/users/testuser/orgs').reply(200, mockOrganizations);

    // Render the component
    render(<OrganizationsComponent username="testuser" />);

    // Assert loading state (if present) or ensure the UI renders first
    expect(screen.getByText(/Organizations:/i)).toBeInTheDocument();

    // Wait for the organizations to appear in the DOM
    await waitFor(() => {
      expect(screen.getByText('org1')).toBeInTheDocument();
      expect(screen.getByText('org2')).toBeInTheDocument();
    });
  });

  test('renders error message when API call fails', async () => {
    // Mock the API to throw an error
    mockAxios.onGet('/users/testuser/orgs').reply(500);

    // Render the component
    render(<OrganizationsComponent username="testuser" />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Something error...')).toBeInTheDocument();
    });
  });

  test('displays no organizations when API returns an empty list', async () => {
    // Mock the API response with an empty list
    mockAxios.onGet('/users/testuser/orgs').reply(200, []);

    // Render the component
    render(<OrganizationsComponent username="testuser" />);

    // Check if the "Organizations:" header is still there
    expect(screen.getByText(/Organizations:/i)).toBeInTheDocument();

    // Ensure no organizations are rendered in the list
    await waitFor(() => {
      const orgItems = screen.queryAllByRole('listitem');
      expect(orgItems.length).toBe(0);
    });
  });
});