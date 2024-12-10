import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Pagination = ({ currentPage, setCurrentPage, itemsPerPage, totalItems }) => {


  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    setPageNumbers([]);
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pages.push(i);
    }
    setPageNumbers(pages);
    console.log(pageNumbers);
  }, [currentPage, setCurrentPage, itemsPerPage, totalItems]);

  return (
    pageNumbers.length > 1 &&
    <div id='pagination' className='my-4' aria-label="Page Navigation">
      <ul className="pagination justify-content-center">
        <li key={'previous'} className={currentPage == 1 || currentPage == 0 ? 'page-item disabled' : 'page-item'} >
          <button onClick={() => setCurrentPage(currentPage - 1)} className="page-link">Previous</button>
        </li>
        {
          pageNumbers.map((pageNumber) =>
            <li key={pageNumber} className={currentPage == pageNumber ? 'page-item active' : 'page-item'}>
              <button className="page-link" onClick={() => setCurrentPage(pageNumber)} >{pageNumber}</button>
            </li>
          )
        }
        <li key={'next'} className={currentPage >= Math.ceil(totalItems / itemsPerPage) ? 'page-item disabled' : 'page-item'} >
          <button onClick={() => setCurrentPage(currentPage + 1)} className="page-link">Next</button>
        </li>
      </ul>
    </div >
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired
}

export default Pagination