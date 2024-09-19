import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import SearchComponent from '../Components/Search';
import '@testing-library/jest-dom';
import { api } from '../api';


const mockSearchResults = {
  items: [
    { login: 'user1', id: 1 },
    { login: 'user2', id: 2 },
  ],
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: jest.fn(),
  useLocation: jest.fn()
}));

describe('SearchComponent', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(api);
    window.alert = jest.fn();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('should perform a search and navigate to results', async () => {
    mockAxios.onGet('/search/users?q=testuser&page=1').reply(200, mockSearchResults.items);

    const setSearchResults = jest.fn();
    const setQuery = jest.fn();
    const query = 'testuser';

    render(<SearchComponent setSearchResults={setSearchResults} setQuery={setQuery} query={query} />);

    fireEvent.change(screen.getByPlaceholderText('Search GitHub users'), { target: { value: 'testuser' } });
    fireEvent.click(screen.getByText('Search'));
    expect(screen.getByText('Loading...')).toBeInTheDocument();


    await waitFor(() => {
      expect(setSearchResults).toHaveBeenCalled();
    });
  });

  test('should handle search failure gracefully', async () => {
    mockAxios.onGet('/search/users?q=testuser&page=1').reply(500);

    const setSearchResults = jest.fn();
    const setQuery = jest.fn();
    const query = 'testuser';

    render(<SearchComponent setSearchResults={setSearchResults} setQuery={setQuery} query={query} />);

    fireEvent.change(screen.getByPlaceholderText('Search GitHub users'), { target: { value: 'testuser' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(setSearchResults).toHaveBeenCalledWith([]);
      expect(window.alert).toHaveBeenCalledWith('Search failed. Please try again later.');
    });
  });

  test('should show alert if query is empty', () => {
    const setSearchResults = jest.fn();
    const setQuery = jest.fn();

    render(<SearchComponent setSearchResults={setSearchResults} setQuery={setQuery} query="" />);

    fireEvent.click(screen.getByText('Search'));

    expect(window.alert).toHaveBeenCalledWith('Please enter a search query.');
  });
});
