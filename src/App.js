import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import SingleProduct from "./Components/SingleProduct";
import Collections from "./Components/Collections";
import Sale from "./Components/Sales";
import Wishlist from "./Components/Wishlist";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import OrderSuccess from "./Components/OrderSuccess";
import Orders from "./Components/Orders";
import Profile from "./Components/Profile";

import AdminLogin from "./Admin/Login";
import Dashboard from "./Admin/Dashboard";
import ProtectedAdminRoute from "./Admin/Components/ProtectedAdminRoute";
import AdminProducts from "./Admin/Products";
import Contact from "./Components/Contact";

const AppContent = () => {

  const location = useLocation();

  const hideNavbar =

    location.pathname === "/login" ||

    location.pathname === "/register" ||

    location.pathname.startsWith("/admin");

  return (

    <>

      {!hideNavbar && <Navbar />}

      <Routes>

        {/* User Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/product/:id" element={<SingleProduct />} />

        <Route path="/collections" element={<Collections />} />

        <Route path="/sale" element={<Sale />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/profile" element={<Profile />} />
        <Route
    path="/contact"
    element={ <Contact/>}
/>

        {/* Authentication */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Admin */}

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route

          path="/admin"

          element={

            <ProtectedAdminRoute>

              <Dashboard />

            </ProtectedAdminRoute>

          }

        />

        <Route
    path="/admin/products"
    element={
        <ProtectedAdminRoute>
            <AdminProducts />
        </ProtectedAdminRoute>
    }
/>

      </Routes>

    </>

  );

};

const App = () => {

  return (

    <Router basename={process.env.PUBLIC_URL}>

      <AppContent />

    </Router>

  );

};

export default App;