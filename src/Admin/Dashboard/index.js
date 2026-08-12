import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBoxOpen,
  FaUsers,
  FaShoppingBag,
  FaRupeeSign
} from "react-icons/fa";

import "./Dashboard.css";
import { BASE_URL, headers } from "../../api/Supabase";
import Sidebar from "../Components/Sidebar";

const Dashboard = () => {

  const [products, setProducts] = useState(0);
  const [users, setUsers] = useState(0);
  const [orders, setOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const [

        productsRes,

        usersRes,

        ordersRes

      ] = await Promise.all([

        axios.get(
          `${BASE_URL}/products?select=*`,
          { headers }
        ),

        axios.get(
          `${BASE_URL}/register?select=*`,
          { headers }
        ),

        axios.get(
          `${BASE_URL}/orders?select=*`,
          { headers }
        )

      ]);

      setProducts(productsRes.data.length);

      setUsers(usersRes.data.length);

      setOrders(ordersRes.data.length);

      const totalRevenue = ordersRes.data.reduce(

        (sum, order) =>

          sum + Number(order.total_price || 0),

        0

      );

      setRevenue(totalRevenue);

    }

    catch (error) {

      console.log(error);

    }

  };

  return (
    
    <div className="admin-layout">
        <Sidebar/>
    <div className="dashboard">

      <h1 className="dashboard-title">

        Admin Dashboard

      </h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <FaBoxOpen />

          <h2>{products}</h2>

          <p>Total Products</p>

        </div>

        <div className="dashboard-card">

          <FaUsers />

          <h2>{users}</h2>

          <p>Total Users</p>

        </div>

        <div className="dashboard-card">

          <FaShoppingBag />

          <h2>{orders}</h2>

          <p>Total Orders</p>

        </div>

        <div className="dashboard-card">

          <FaRupeeSign />

          <h2>

            ₹{revenue.toLocaleString()}

          </h2>

          <p>Total Revenue</p>

        </div>

      </div>

    </div>
    </div>

  );

};

export default Dashboard;