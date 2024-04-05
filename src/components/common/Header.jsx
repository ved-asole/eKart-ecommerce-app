import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Collapse } from 'bootstrap';

export default function Header() {

  let cartTotalQuantity = useSelector((state) => state.cart.cartTotalQuantity);

  const toggleCollapse = (event) => {
    try {
      if (document.getElementById(navbarToggler).getAttribute('aria-expanded') == 'true') {
        const collapse = Collapse.getOrCreateInstance(document.getElementById('navbarNavAltMarkup'));
        collapse.toggle();
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <header style={{ 'marginTop': "65px" }} >
      <nav className="navbar navbar-expand-md fixed-top bg-secondary-subtle">
        <div className="container gap-md-2 mx-auto">
          <Link to={"/"} className="navbar-brand mt-1 ms-md-2">
            <img src="/logo.webp" alt="Logo" width="30" height="30"
              className="d-inline-block mb-2" />
            <span className='fw-medium' >eKart Shopping</span>
          </Link>
          <button id='navbarToggler' className="navbar-toggler me-md-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <form className="d-flex flex-fill me-md-2 mx-md-2 mt-2 mt-md-1 mb-1" role="search">
            <input className="form-control" type="search" placeholder="Search for products, brands and more" name="search" aria-label="Search" />
            <button className="btn btn-outline-success ms-1" aria-label='search' type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </button>
          </form>
          <div className="collapse navbar-md-collapse d-md-flex" id="navbarNavAltMarkup">
            <div className="navbar-nav fw-medium">
              <NavLink className="nav-link mx-1" aria-current="page" to={"/"}
                onClick={toggleCollapse}>
                Home
              </NavLink>
              <NavLink className="nav-link mx-1" aria-current="page"
                to={"/categories"} onClick={toggleCollapse}>
                Categories
              </NavLink>
              <NavLink className="nav-link mx-1" aria-current="page"
                to={"/products"} onClick={toggleCollapse}>
                Products
              </NavLink>
              <NavLink className="nav-link mx-2 me-3" aria-current="page"
                to={"/cart"} onClick={toggleCollapse}>
                <FontAwesomeIcon className={cartTotalQuantity > 0 ? '' : 'me-1'} icon={faCartShopping} />
                <span> {cartTotalQuantity || 'Cart'}</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}