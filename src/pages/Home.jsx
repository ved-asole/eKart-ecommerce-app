import React, { Suspense, lazy } from 'react';
import AppLoader from '../components/common/AppLoader';

const CategoriesBar = lazy(() => import('../components/home/CategoriesBar'));
const HomeCarousel = lazy(() => import('../components/home/HomeCarousel'));
const TopDeals = lazy(() => import('../components/home/TopDeals'));

const Home = () => {

  return (
    <div className='home container px-0'>

      {/* CategoriesBar Section */}
      <Suspense fallback={<AppLoader />} >
        <CategoriesBar />
      </Suspense>

      {/* Carousel Section */}
      <Suspense fallback={<AppLoader />} >
        <HomeCarousel />
      </Suspense>

      <Suspense fallback={<AppLoader />} >
        <TopDeals />
      </Suspense>

    </div>
  )
}

export default Home