import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className='container-fluid bg-dark text-white text-center py-2 px-2 py-md-3 px-md-5' data-bs-theme="dark">
      <Header />
      <h1 className='mt-3'>eKart Ecommerce Application</h1>
    </div>
  );
}

export default App;
