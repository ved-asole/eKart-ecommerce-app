import React, { Suspense, lazy } from 'react';

const CategoriesBar = lazy(() => import('../components/home/CategoriesBar.jsx'));
const HomeCarousel = lazy(() => import('../components/home/HomeCarousel.jsx'));
const TopDeals = lazy(() => import('../components/home/TopDeals.jsx'));
const AppLoader = lazy(() => import('../components/common/AppLoader.jsx'));

const Home = () => {

  return (
    <div className='home container min-vh-100 px-0'>

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