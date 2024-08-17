import React from 'react'

const Pagination = ({ currentPage, setCurrentPage, productsPerPage, totalProducts }) => {

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
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
        <li key={'next'} className={currentPage >= Math.ceil(totalProducts / productsPerPage) ? 'page-item disabled' : 'page-item'} >
          <button onClick={() => setCurrentPage(currentPage + 1)} className="page-link">Next</button>
        </li>
      </ul>
    </div >
  )
}

export default Pagination