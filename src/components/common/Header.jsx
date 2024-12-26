import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Collapse, Dropdown } from 'bootstrap';
import { useEffect, useState } from 'react';
import { fetchPreviousCart } from '../../redux/slices/cartSlice';
import fetchData from '../../util/DataFetcher';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';

export default function Header() {

  let cartTotalQuantity = useSelector((state) => state.cart.cartTotalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileSize, setIsMobileSize] = useState(false);

  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 1200) {
      setIsMobileSize(true)
    } else {
      setIsMobileSize(false)
    }
  }

  useEffect(() => {
    fetchPreviousCart(dispatch);
    if (window.innerWidth < 1200) {
      setIsMobileSize(true)
    } else {
      setIsMobileSize(false)
    }
    window.addEventListener("resize", handleResize);
  }, [])


  const toggleCollapse = (event) => {
    try {
      if (
        document.getElementById('navbarToggler') &&
        document.getElementById('navbarToggler').getAttribute('aria-expanded') == 'true'
      ) {
        const collapse = Collapse.getOrCreateInstance(document.getElementById('navbarNavAltMarkup'));
        collapse.toggle();
      }
    } catch (e) {
      console.log(e);
    }
  }

  const toggleDropdown = (event) => {
    const dropdownElementList = document.querySelectorAll('.dropdown-menu-dark');
    [...dropdownElementList].forEach(dropdownToggleEl => Dropdown.getOrCreateInstance(dropdownToggleEl).toggle());
  }

  const toggleDropdownAndCollapse = (event) => {
    toggleDropdown();
    toggleCollapse();
  }

  const toggleSearchBar = (event) => {
    if (event.type === 'click') {
      const dropdownElementList = document.querySelectorAll('#searchBar');
      [...dropdownElementList].forEach(dropdownToggleEl => Dropdown.getOrCreateInstance(dropdownToggleEl).toggle());
      setSearchKey('');
      setSearchResults([]);
    } else {
      const dropdownElementList = document.querySelectorAll('#searchBar');
      [...dropdownElementList].forEach(dropdownToggleEl => Dropdown.getOrCreateInstance(dropdownToggleEl).hide());
      setSearchKey('');
      setSearchResults([]);
    }
  }

  const handleSearchKey = (event) => {
    event.preventDefault();
    setSearchKey(event.target.value);
    if (searchKey === '') {
      setSearchResults([]);
      const dropdownElementList = document.querySelectorAll('#searchBar');
      [...dropdownElementList].forEach(dropdownToggleEl => Dropdown.getOrCreateInstance(dropdownToggleEl).hide());
    }
    else {
      fetchData(
        `products/search?searchKey=${searchKey}`,
        (data) => setSearchResults(data._embedded.products),
        (errorMsg) => {
          console.log(errorMsg);
          setSearchResults([])
        }
      )
      const dropdownElementList = document.querySelectorAll('#searchBar');
      [...dropdownElementList].forEach(dropdownToggleEl => Dropdown.getOrCreateInstance(dropdownToggleEl).show());
    }
  }

  return (
    <header style={isMobileSize ? { 'marginTop': "65px" } : { 'marginTop': "50px" }} >
      <nav className="navbar navbar-expand-md fixed-top bg-secondary-subtle">
        <div className="container gap-md-2 mx-auto">
          <Link to={"/"} className="navbar-brand mt-1 ms-md-2">
            <img src="/logo.webp" alt="Logo" width="30" height="30"
              className="d-inline-block mb-2" />
            <span className='fw-medium'>eKart Shopping</span>
          </Link>
          <button id='navbarToggler' className="navbar-toggler me-md-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id='searchBar' className="d-flex flex-fill me-md-2 mx-md-2 mt-2 mt-md-1 mb-1 dropdown" role="search">
            <input
              onKeyUp={handleSearchKey}
              onChange={e => setSearchKey(e.target.value)}
              onBlur={(event) => { toggleSearchBar(event) }}
              className="form-control"
              type="search"
              autoComplete="false"
              placeholder="Search for products, brands and more"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              name="search"
              aria-label="Search"
              value={searchKey}
            />
            <ul className="dropdown-menu overflow-hidden w-100">
              {
                searchResults.length > 0 ?
                  searchResults.map((result) =>
                    <Link
                      key={result.productId}
                      className="dropdown-item"
                      onMouseDown={(event) => {
                        navigate(`/products/${result.productId}`);
                      }}
                      onMouseUp={(event) => {
                        toggleSearchBar(event);
                        console.log("toggleSearchBar Completed");
                      }}
                      to={`/products/${result.productId}`}
                    >
                      {result.name}
                    </Link>
                  )
                  :
                  <li className="dropdown-item">
                    <p className="dropdown-item-text text-body-secondary mb-0 py-0">No results found</p>
                  </li>
              }
            </ul>
            <button className="btn btn-outline-success ms-1 "
              aria-label='search' onClick={handleSearchKey}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </button>
          </div>
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
              {document.cookie.includes("customerId") ?
                <div className="nav-item dropdown">
                  <button className="btn dropdown-toggle" data-bs-toggle="dropdown"
                    onClick={toggleDropdown} aria-expanded="false">
                    {document.cookie.split('username=')[1].split(';')[0].split('%20')[0]}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <NavLink className="nav-link mx-1" aria-current="page"
                        to={"/profile"} onClick={toggleDropdownAndCollapse}>
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link mx-1" aria-current="page"
                        to={"/orders"} onClick={toggleDropdownAndCollapse}>
                        Orders
                      </NavLink>
                    </li>
                    {
                      document.cookie.includes("role") && document.cookie.split('role=')[1].split(';')[0] == 'ADMIN' &&
                      <li>
                        <NavLink className="nav-link mx-1" aria-current="page"
                          to={"/admin"} onClick={toggleDropdownAndCollapse}>
                          Admin Panel
                        </NavLink>
                      </li>
                    }
                    <li>
                      <NavLink className="nav-link mx-1" aria-current="page"
                        to={"/auth?mode=logout"} onClick={toggleDropdownAndCollapse}>
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div> :
                <NavLink className="nav-link mx-1" aria-current="page"
                  to={"/auth"} onClick={toggleCollapse}>
                  Login
                </NavLink>
              }
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