import React, { Suspense, lazy } from 'react';
import AppLoader from '../components/common/AppLoader';

const CategoriesBar = lazy(() => import('../components/home/CategoriesBar'));
const ProductsCarousel = lazy(() => import('../components/home/ProductsCarousel'));

const Home = () => {

  return (
    <div className='home container'>

      {/* CategoriesBar Section */}
      <Suspense fallback={<AppLoader />} >
        <CategoriesBar />
      </Suspense>

      {/* Carousel Section */}
      <Suspense fallback={<AppLoader />} >
        <ProductsCarousel />
      </Suspense>

    </div>
  )
}

export default Home