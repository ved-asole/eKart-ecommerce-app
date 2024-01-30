import { Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Home from './pages/Home';

function App() {
  return (
    <div className='container-fluid bg-dark text-white text-center py-2 px-2 py-md-3 px-md-5 mt-5 mt-md-0' data-bs-theme="dark">
      <Header />
      <Routes>
        <Route path='*' element={<Home />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default App;
