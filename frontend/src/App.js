import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import { Container } from "react-bootstrap";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/admin/userslist' element={<UserListScreen />} />
            <Route path='/admin/productslist' element={<ProductListScreen />} />
            <Route
              path='/admin/productslist/:pageNumber'
              element={<ProductListScreen />}
              exact
            />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route
              path='/admin/product/:id/edit'
              element={<ProductEditScreen />}
            />
            <Route path='/orders/:id' element={<OrderScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/search/:keyword' element={<HomeScreen />} />
            <Route
              path='/search/:keyword/pageNumber/:pageNumber'
              element={<HomeScreen />}
            />
            <Route path='/pageNumber/:pageNumber' element={<HomeScreen />} />
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/products/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
