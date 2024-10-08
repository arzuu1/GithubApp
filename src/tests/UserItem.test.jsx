import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import UserItem from '../Components/UserItem'; 

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('UserItem', () => {
  const mockNavigate = jest.fn();
  const user = {
    login: 'testuser',
    avatar_url: 'https://example.com/avatar.jpg',
  };

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders user information correctly', () => {
    render(<UserItem user={user} />);

    const avatarImage = screen.getByAltText('testuser');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', user.avatar_url);

    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  test('navigates to organizations page when "Show Organizations" is clicked', () => {
    render(<UserItem user={user} />);

    const showOrgsButton = screen.getByText('Show Organizations');
    fireEvent.click(showOrgsButton);

    
    expect(mockNavigate).toHaveBeenCalledWith(`/organizations/${user.login}`);
  });

  test('navigates to repositories page when "Show Repositories" is clicked', () => {
    render(<UserItem user={user} />);

    const showReposButton = screen.getByText('Show Repositories');
    fireEvent.click(showReposButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/repositories/${user.login}`);
  });

  test('renders user item with correct classes', () => {
    render(<UserItem user={user} />);
    
    const userItem = screen.getByRole('row'); 
    expect(userItem).toHaveClass('user-item');
  });

  test('does not render non-existent user information', () => {
    const emptyUser = {};
    render(<UserItem user={emptyUser} />);


    expect(screen.queryByAltText('')).not.toBeInTheDocument();
    expect(screen.queryByText(/testuser/i)).not.toBeInTheDocument();
  });
});
