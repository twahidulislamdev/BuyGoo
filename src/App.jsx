import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/layouts/RootLayout";
import Home from "./components/pages/Home";
import Shop from "./components/pages/Shop";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import ProductDetails from "./components/pages/ProductDetails";
import AddToCart from "./components/pages/AddToCart";
import CheckOut from "./components/pages/CheckOut";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="productdetails" element={<ProductDetails />} />
            <Route path="addtocart" element={<AddToCart />} />
            <Route path="checkout" element={<CheckOut />} />
          </Route>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
