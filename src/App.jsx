import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { setAxiosInterceptors } from './util/appUtil';
const Footer = lazy(() => import('./components/common/Footer'));
const Toast = lazy(() => import('./components/common/Toast'));
const AppLoader = lazy(() => import('./components/common/AppLoader'));
const Header = lazy(() => import('./components/common/Header'));

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
    <div className='container-fluid text-white text-center py-2 px-2 py-md-3 px-md-5 mt-5 mt-md-0 min-h-100'
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