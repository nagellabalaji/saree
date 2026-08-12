import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  FaHome,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaChartLine,
  FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const logout = () => {

    localStorage.removeItem("admin");

    navigate("/login");

  };

  return (

    <div className="sidebar">

      <h2 className="logo">

        👑 Saree Elegance

      </h2>

      <ul>

        <li className={location.pathname==="/admin"?"active":""}>

          <Link to="/admin">

            <FaHome/>

            Dashboard

          </Link>

        </li>

        <li>

          <Link to="/admin/products">

            <FaBoxOpen/>

            Products

          </Link>

        </li>

        <li>

          <Link to="/admin/orders">

            <FaShoppingBag/>

            Orders

          </Link>

        </li>

        <li>

          <Link to="/admin/users">

            <FaUsers/>

            Users

          </Link>

        </li>

        <li>

          <Link to="/admin/analytics">

            <FaChartLine/>

            Analytics

          </Link>

        </li>

      </ul>

      <button

      className="logout"

      onClick={logout}

      >

      <FaSignOutAlt/>

      Logout

      </button>

    </div>

  );

};

export default Sidebar;