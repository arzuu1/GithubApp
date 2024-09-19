import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SearchComponent from './SearchComponent';
import '@testing-library/jest-dom/extend-expect';

const mock = new MockAdapter(axios);

const mockSearchResults = {
  items: [
    { login: 'user1', id: 1 },
    { login: 'user2', id: 2 },
  ],
};

describe('SearchComponent', () => {
  beforeEach(() => {
    mock.reset(); 
  });

  test('should perform a search and navigate to results', async () => {
    mock.onGet('http://localhost:3001/search/users?q=testuser&page=1').reply(200, mockSearchResults);

    const setSearchResults = jest.fn();
    const setQuery = jest.fn();
    const query = 'testuser';

    render(
      <Router>
        <SearchComponent setSearchResults={setSearchResults} setQuery={setQuery} query={query} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Search GitHub users'), { target: { value: 'testuser' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(setSearchResults).toHaveBeenCalledWith(mockSearchResults.items);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  test('should handle search failure gracefully', async () => {
    mock.onGet('http://localhost:3001/search/users?q=testuser&page=1').reply(500);

    const setSearchResults = jest.fn();
    const setQuery = jest.fn();
    const query = 'testuser';

    render(
      <Router>
        <SearchComponent setSearchResults={setSearchResults} setQuery={setQuery} query={query} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Search GitHub users'), { target: { value: 'testuser' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(setSearchResults).toHaveBeenCalledWith([]);
      expect(screen.getByText('Search failed. Please try again later.')).toBeInTheDocument();
    });
  });

  test('should show alert if query is empty', () => {
    const setSearchResults = jest.fn();
    const setQuery = jest.fn();

    render(
      <Router>
        <SearchComponent setSearchResults={setSearchResults} setQuery={setQuery} query="" />
      </Router>
    );

    fireEvent.click(screen.getByText('Search'));

    expect(window.alert).toHaveBeenCalledWith('Please enter a search query.');
  });
});
