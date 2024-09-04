import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';
import Header from './components/common/Header';
import AppLoader from './components/common/AppLoader';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { setAxiosInterceptors } from './util/appUtil';
const Footer = lazy(() => import('./components/common/Footer'));
const Toast = lazy(() => import('./components/common/Toast'));

function App() {

  //Get the page navigation
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAxiosInterceptors(setIsLoading);
  }, [])

  useEffect(() => {
    setIsLoading(navigation.state === "loading");
  }, [navigation])

  return (
    <div className='container-fluid bg-dark text-white text-center py-2 px-2 py-md-3 px-md-5 mt-5 mt-md-0 h-100'
      data-bs-theme="dark">
      <ScrollRestoration />
      <Header />
      <AppLoader status={isLoading}>
        <Suspense fallback={<AppLoader />}>
          <section id="mainSection" className='w-100 h-100 overflow-hidden'
          //  className='pt-2 pt-md-1'
          >
            <Outlet />
          </section>
          <Footer />
          <Toast />
        </Suspense>
      </AppLoader>
    </div>
  );
}

export default App;