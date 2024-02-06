import React from 'react';
import CategoriesBar from '../components/home/CategoriesBar';
import ProductsCarousel from '../components/home/ProductsCarousel';

const Home = () => {

  return (
    <div className='home container'>

      {/* CategoriesBar Section */}
      <CategoriesBar />

      {/* Carousel Section */}
      <ProductsCarousel />

    </div>
  )
}

export default Home