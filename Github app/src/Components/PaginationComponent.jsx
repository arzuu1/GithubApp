import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/pagination.css'; 

function PaginationComponent({ currentPage, setCurrentPage, totalPages }) {
  const navigate = useNavigate();
  const location = useLocation();

  const updatePageInURL = (newPage) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", newPage);
    navigate({ search: searchParams.toString() });
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updatePageInURL(newPage);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      updatePageInURL(newPage);
    }
  };

  return (
    <div className="pagination-container">
      <div>
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
      </div>
      <span style={{marginTop:'20px'}}>
        Page {currentPage} / {totalPages}
      </span>
     

    </div>
  );
}

export default PaginationComponent;
