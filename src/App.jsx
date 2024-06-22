import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Auth from './components/auth/Auth';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Auth/>}>
          <Route path="home" element={<Home/>} />
        </Route>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
