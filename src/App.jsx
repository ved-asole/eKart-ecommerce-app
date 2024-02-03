import { Outlet, ScrollRestoration } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <div className='container-fluid bg-dark text-white text-center py-2 px-2 py-md-3 px-md-5 mt-5 mt-md-0' data-bs-theme="dark">
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
