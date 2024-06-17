
import './App.css';
import {Routes, Route}  from 'react-router-dom'
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import AddProduct from './Pages/AddProduct';
import EditProduct from './Pages/EditProduct';
function App() {
  return (
    <div className="App">
  
  <Routes>
  <Route path='/' element={<Login />} />
    <Route path='/register' element={<Register/>} />
    <Route path={`:userId/home`} element={<Home />} />
    <Route path={`:userId/add_product`} element={<AddProduct />} />
    <Route path={`:userId/edit_product/:product_id`} element={<EditProduct />} />

  </Routes>

    </div>
  );
}

export default App;
