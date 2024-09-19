import '@testing-library/jest-dom'; // for matchers like 'toBeInTheDocument'
import { render, screen } from '@testing-library/react';
import React from 'react';
import PaginationComponent from '../Components/Pagination';


// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Keep other functions from react-router-dom intact
    useNavigate: jest.fn(), // Mock the useNavigate hook
    useLocation: jest.fn()
}));

describe('PaginationComponent', () => {


    test('renders organization list after successful API call', async () => {

        render(<PaginationComponent currentPage={1} setCurrentPage={() => { }} totalPages={2} />);

        // Assert loading state (if present) or ensure the UI renders first
        expect(screen.getByText('Page 1 / 2')).toBeInTheDocument();

    });
});