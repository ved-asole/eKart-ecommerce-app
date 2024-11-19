import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { RouterProvider } from 'react-router-dom';
import App from './App';
import router from './routes.jsx';
import AppLoader from './components/common/AppLoader.jsx';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <Suspense fallback={<AppLoader />}>
          <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <App />
          </CookiesProvider>
        </Suspense>
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
