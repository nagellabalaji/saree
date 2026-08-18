import "./Navbar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useCounts } from "../../Context/CountContext";
import { useSearch } from "../../Context/SearchContext";
import { useCategory } from "../../Context/CategoryContext";

const Navbar = () => {
  const { cartCount, wishlistCount } = useCounts();
  const { searchTerm, setSearchTerm } = useSearch();
  const { setCategory } = useCategory();

  const [theme, setTheme] = useState("light");

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      {/* Top Offer Bar */}

      <div className="top-bar">
        <p>✨ Free Shipping on Orders Above ₹999</p>
      </div>

      {/* Header */}

      <header className="header">
        <div className="logo">
          <Link to="/">
            <h1>Sainadh Silks</h1>
            <span>THE EPITOME OF PURE SILK & ELEGANCE</span>
          </Link>
        </div>

        {/* Search */}

        <div className="search-box">

  <FaSearch className="search-icon" />

  <input
    type="text"
    placeholder="Search Sarees..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
  />

  {searchTerm && (

    <button
      className="clear-search"
      onClick={() => setSearchTerm("")}
    >

      Clear

    </button>

  )}

</div>

        {/* Icons */}

        <div className="header-icons">

          {/* Wishlist */}

          <Link to="/wishlist" className="icon-link">

            <div className="icon-box">

              <div className="icon-wrapper">

                <FaHeart />

                {wishlistCount > 0 && (

                  <span className="count-badge">
                    {wishlistCount}
                  </span>

                )}

              </div>

              <span>Wishlist</span>

            </div>

          </Link>

          {/* Cart */}

          <Link to="/cart" className="icon-link">

            <div className="icon-box">

              <div className="icon-wrapper">

                <FaShoppingCart />

                {cartCount > 0 && (

                  <span className="count-badge">
                    {cartCount}
                  </span>

                )}

              </div>

              <span>Cart</span>

            </div>

          </Link>

          {/* Account */}

          <Link to="/profile" className="icon-link">

    <div className="icon-box">

        <FaUserCircle />

        <span>Profile</span>

    </div>

</Link>

          {/* Theme */}

          <div
            className="theme-btn"
            onClick={changeTheme}
          >
            {theme === "light" ? (
              <FaMoon />
            ) : (
              <FaSun />
            )}
          </div>

        </div>
      </header>

      {/* Bottom Nav */}

      <nav className="bottom-nav">

        <div className="menu">

          <Link to="/">Home</Link>

          <Link
  to="/products"
  onClick={() => setCategory("All")}
>
  Products
</Link>

          <Link to="/collections">Collections</Link>

          <Link to="/">New Arrivals</Link>

          <Link to="/sale">Sale</Link>

          <Link to="/contact">Contact</Link>

        </div>

        <div className="auth-buttons">

          <Link
            to="/register"
            className="register-btn"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>

        </div>

      </nav>

    </>
  );
};

export default Navbar;