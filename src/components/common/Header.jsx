import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'
import Home from '../../pages/Home'
import Categories from '../../pages/Categories'
import Products from '../../pages/Products';

export default function Header() {
  return (
    <header style={{ 'marginTop': "65px" }} >
      <nav className="navbar navbar-expand-md fixed-top bg-secondary-subtle">
        <div className="container gap-md-2 mx-auto">
          <Link to={"/"} className="navbar-brand mt-1 ms-2">
            <img src="/logo.webp" alt="Logo" width="30" height="30"
              className="d-inline-block mb-2" />
            <span className='fw-medium' >eKart Shopping</span>
          </Link>
          <button className="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <form className="d-flex flex-fill me-2 mx-md-2 mt-2 mt-md-1 mb-1" role="search">
            <input className="form-control" type="search" placeholder="Search for products, brands and more" name="search" aria-label="Search" />
            <button className="btn btn-outline-success ms-1" aria-label='search' type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </button>
          </form>
          <div className="collapse navbar-md-collapse d-md-flex" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link mx-1" aria-current="page" to={"/"} >
                Home
              </NavLink>
              <NavLink className="nav-link mx-1" aria-current="page"
                to={"/categories"} >
                Categories
              </NavLink>
              <NavLink className="nav-link mx-1" aria-current="page"
                to={"/products"} >
                Products
              </NavLink>
              <NavLink className="nav-link mx-2 me-3" aria-current="page"
                to={"/cart"} >
                <FontAwesomeIcon className='me-1' icon={faCartShopping} />
                <span>Cart</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}