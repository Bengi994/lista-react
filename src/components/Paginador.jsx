import React from 'react'
import './bulma.css'


const Paginador = ({apiTotalPages,currentPage,setCurrentPage}) => {
  
  

  const pagesArray = [...Array(apiTotalPages).keys()].map((page) => page + 1)

  const onPreviusPage = () => {
    if (currentPage == 1){
      return;
  }
  setCurrentPage(currentPage-1);

  }

  const onNextPage = () => {
    if (currentPage >= apiTotalPages){
    return;
    }
    setCurrentPage(currentPage + 1)
  }

  const onSpecificPage = (n) => {
    setCurrentPage(n)
  }

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <a className={`pagination-previous ${currentPage === 1 ? 'is-disabled' : ''}`} onClick={onPreviusPage}>Previous</a>
      <a className={`pagination-next ${currentPage >= apiTotalPages ? 'is-disabled' : ''}`} onClick={onNextPage}>Next page</a>
      <ul className="pagination-list">
        {pagesArray.map((page) => (
          <li key={page}>
             <a
              className={`pagination-link ${currentPage === page ? 'is-current' : ''}`}
              onClick={() => onSpecificPage(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Paginador