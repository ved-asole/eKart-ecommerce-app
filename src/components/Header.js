import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-md">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">eKart Shopping</a>
          <button className="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <form className="d-flex flex-fill me-2 mx-md-2 mt-2 mt-md-1 mb-1" role="search">
            <input className="form-control" type="search" placeholder="Search for products, brands and more" aria-label="Search" />
            <button className="btn btn-outline-success ms-1" type="submit">Search</button>
          </form>
          <div className="collapse navbar-md-collapse d-md-flex justify-content-md-end" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
              <a className="nav-link" href="/categories">Categories</a>
              <a className="nav-link" href="/login">Login</a>
              <a className="nav-link" href='/cart'>
                <FontAwesomeIcon className='me-1' icon={faCartShopping} />
                <span>Cart</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
