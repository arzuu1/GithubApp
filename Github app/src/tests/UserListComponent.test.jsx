import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserListComponent from './UserListComponent';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import './axios'; 

describe('UserListComponent', () => {
  test('should display users when API returns data', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('https://api.github.com/search/users', {
      params: {
        q: 'testuser',
        page: 1,
        per_page: 10,
      },
    }).reply(200, {
      items: [
        { id: 1, login: 'user1', avatar_url: 'http://example.com/user1.png' },
        { id: 2, login: 'user2', avatar_url: 'http://example.com/user2.png' },
      ],
      total_count: 20,
    });

    render(
      <Router>
        <UserListComponent />
      </Router>
    );

    
    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
      expect(screen.getByText('No users found.')).not.toBeInTheDocument();
    });
  });

  test('should handle API errors gracefully', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('https://api.github.com/search/users').reply(500);

    render(
      <Router>
        <UserListComponent />
      </Router>
    );

    await waitFor(() => {
      
      expect(screen.getByText('No users found.')).toBeInTheDocument();
    });
  });
});
