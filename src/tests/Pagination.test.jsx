import '@testing-library/jest-dom'; 
import { render, screen } from '@testing-library/react';
import React from 'react';
import PaginationComponent from '../Components/Pagination';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useNavigate: jest.fn(), 
    useLocation: jest.fn()
}));

describe('PaginationComponent', () => {


    test('renders organization list after successful API call', async () => {

        render(<PaginationComponent currentPage={1} setCurrentPage={() => { }} totalPages={2} />);

        expect(screen.getByText('Page 1 / 2')).toBeInTheDocument();

    });
});