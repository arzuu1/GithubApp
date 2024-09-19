import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SortBy from '../Components/SortBy';

describe('SortBy Component', () => {
  const mockSetSortOption = jest.fn();

  beforeEach(() => {
    mockSetSortOption.mockClear();  
  });

  test('renders SortBy component correctly', () => {
    render(<SortBy sortOption="stars_desc" setSortOption={mockSetSortOption} />);

    expect(screen.getByLabelText(/Sort by:/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Most stars/i }).selected).toBe(true);
  });

  test('calls setSortOption when a new option is selected', () => {
    render(<SortBy sortOption="stars_desc" setSortOption={mockSetSortOption} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'stars_asc' } });

    expect(mockSetSortOption).toHaveBeenCalledWith('stars_asc');
  });

  test('renders all sort options correctly', () => {
    render(<SortBy sortOption="stars_desc" setSortOption={mockSetSortOption} />);

 
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(6);

    expect(screen.getByRole('option', { name: 'Most stars' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Fewest stars' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Most forks' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Fewest forks' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Recently updated' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Least recently updated' })).toBeInTheDocument();
  });
});
