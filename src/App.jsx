import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AppLoader from './components/common/AppLoader';

function App() {

  //Get the page navigation
  const navigation = useNavigation();

  // If page is in loading state, display loader.
  if (navigation.state === "loading") return <AppLoader />;

  // If page is not in loading state, display page. 
  else {

    return (
      <div className='container-fluid bg-dark text-white text-center py-2 px-2 py-md-3 px-md-5 mt-5 mt-md-0' data-bs-theme="dark">
        <ScrollRestoration />
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  }
}

export default App;
