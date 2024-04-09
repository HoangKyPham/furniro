import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LayoutAdmin from './components/layouts/LayoutAdmin'
import ProductList from './pages/admin/ProductList'
import ProductAdd from './pages/admin/ProductAdd'
import ProductEdit from './pages/admin/ProductEdit'
import LayoutWebsite from './components/layouts/LayoutWebsite'
import Cart from './pages/Cart'
import Index from './pages/Index'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import CheckOut from './pages/CheckOut'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import OderList from './pages/admin/OderList'
import OrderUpdate from './pages/admin/OrderUpdate'
import UserInfo from './pages/UserInfo'
import { ToastContainer } from 'react-toastify'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutWebsite />} >
          <Route index element={<Index />} />
          <Route path='shop' element={<Shop />} />
          <Route path='product-detail/:id' element={<ProductDetail />} />
          
          <Route path='cart' element={<Cart />} />
          <Route path='check-out' element={<CheckOut />} />
          <Route path='register' element={<Register />} />
          <Route path='user-info' element={<UserInfo />} />

        </Route>

        <Route path='/admin' element={<PrivateRoute><LayoutAdmin /></PrivateRoute>}>
          {/* Product */}
          <Route index element={<ProductList />} />
          <Route path='products/add' element={<ProductAdd />} />
          <Route path='products/edit/:id' element={<ProductEdit />} />
          {/* Order*/}
          <Route path='orders' element={<OderList />} />
          <Route path='orders/detail/:orderId' element={<OrderUpdate />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
