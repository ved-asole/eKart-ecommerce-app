import React from 'react'

const Pagination = ({ currentPage, setCurrentPage, productsPerPage, totalProducts }) => {

  const pageNumbers = [];
  for (let i = 1; i < Math.floor(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='my-4' aria-label="Page Navigation">
      <ul className="pagination justify-content-center">
        <li key={'previous'} className={currentPage === 1 ? 'page-item disabled' : 'page-item'} >
          <a href='#' className="page-link">Previous</a>
        </li>
        {
          pageNumbers.map((pageNumber) =>
            <li key={pageNumber} className="page-item">
              <a href='#' className="page-link" onClick={() => setCurrentPage(pageNumber)} >{pageNumber}</a>
            </li>
          )
        }
        <li key={'next'} className={currentPage >= Math.floor(totalProducts / productsPerPage) - 1 ? 'page-item disabled' : 'page-item'} >
          <a href='#' className="page-link">Next</a>
        </li>
      </ul>
    </nav >
  )
}

export default Pagination
