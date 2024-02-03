import React from 'react';
import CategoriesBar from '../components/home/CategoriesBar';
import ProductBanner from '../components/home/ProductBanner';

const Home = () => {

  return (
    <div className='home container'>

      {/* CategoriesBar Section */}
      <CategoriesBar />

      {/* Carousel Section */}
      <ProductBanner />

    </div>
  )
}

export default Home