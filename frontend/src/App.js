
import './App.css';
import {Routes, Route}  from 'react-router-dom'
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import AddProduct from './Pages/AddProduct';
import EditProduct from './Pages/EditProduct';
import Main from './Pages/Main';
import ProtectedRoutes from './Component/ProtectedRoutes';
function App() {
  return (
    <div className="App">
  
  <Routes>
  <Route path='/' element={<Main />} />
  <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register/>} />
    <Route path={`:user/home`} element={<ProtectedRoutes> <Home /></ProtectedRoutes>} />
    <Route path={`:user/add_product`} element={<ProtectedRoutes><AddProduct /> </ProtectedRoutes>} />
    <Route path={`:user/edit_product/:product_id/:title`} element={<ProtectedRoutes><EditProduct /> </ProtectedRoutes>} />

  </Routes>

    </div>
  );
}

export default App;
