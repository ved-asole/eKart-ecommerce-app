import React from 'react'

const HomeCarousel = React.memo(() => {
  return (
    <section id="carouselSection">
      <div id='heroCarousel' className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <div className='bg-dark bg-opacity-50 rounded px-1 m-0'>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
        </div>
        <div className="carousel-inner rounded">
          <div className="carousel-item active">
            <img fetchpriority="high" src="/images/carousel/new-online-store-yellow.webp"
              className="d-block w-100 mx-auto img-fluid" alt="Banner 1" />
          </div>
          <div className="carousel-item">
            <img fetchpriority="low" loading='lazy' src="/images/carousel/shopping-time-blue.webp"
              className="d-block w-100 mx-auto img-fluid" alt="Banner 2" />
          </div>
          <div className="carousel-item">
            <img fetchpriority="low" loading='lazy' src="/images/carousel/enjoy-purchase-yellow.webp"
              className="d-block w-100 mx-auto  img-fluid" alt="Banner 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon p-4 bg-dark bg-opacity-50 rounded" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon p-4 bg-dark bg-opacity-50 rounded" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  )
})

export default HomeCarousel