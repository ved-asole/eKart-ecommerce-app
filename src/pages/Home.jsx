import React from 'react';
import Categories from '../components/home/Categories';
import ProductBanner from '../components/home/ProductBanner';

const Home = () => {

  return (
    <div className='home container'>

      {/* Categories Section */}
      <Categories />

      {/* Carousel Section */}
      <ProductBanner />

    </div>
  )
}

export default Home