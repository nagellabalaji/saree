import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Orders.css";
import { BASE_URL, headers } from "C:/Users/Lakshminarasimha/OneDrive/Desktop/react_practice/frontend/src/api/Supabase";

const Orders = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user) {

      fetchOrders();

    } else {

      setLoading(false);

    }

  }, []);

  const fetchOrders = async () => {

    try {

      const res = await axios.get(

        `${BASE_URL}/orders?user_id=eq.${user.id}&select=*&order=created_at.desc`,

        {
          headers,
        }

      );

      setOrders(res.data);

    } catch (error) {

      console.log(error);

      toast.error("Unable to fetch orders");

    } finally {

      setLoading(false);

    }

  };

  const getStatusColor = (status) => {

    switch (status?.toLowerCase()) {

      case "pending":
        return "#f39c12";

      case "shipped":
        return "#3498db";

      case "delivered":
        return "#27ae60";

      case "cancelled":
        return "#e74c3c";

      default:
        return "#666";

    }

  };

    // =====================================
  // Format Date
  // =====================================

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  };

  // =====================================
  // Loading
  // =====================================

  if (loading) {

    return (

      <div className="orders-loading">

        <h2>Loading Orders...</h2>

      </div>

    );

  }

  // =====================================
  // User Not Logged In
  // =====================================

  if (!user) {

    return (

      <div className="empty-orders">

        <h1>Please Login</h1>

        <p>
          Login to view your orders.
        </p>

        <Link to="/login">

          <button>
            Login
          </button>

        </Link>

      </div>

    );

  }

  // =====================================
  // No Orders
  // =====================================

  if (orders.length === 0) {

    return (

      <div className="empty-orders">

        <h1>📦 No Orders Yet</h1>

        <p>
          You haven't placed any orders yet.
        </p>

        <Link to="/products">

          <button>
            Continue Shopping
          </button>

        </Link>

      </div>

    );

  }

    return (

    <div className="orders-page">

      <h1 className="orders-title">
        My Orders
      </h1>

      <div className="orders-container">

        {orders.map((order) => (

          <div
            className="order-card"
            key={order.id}
          >

            <div className="order-header">

              <div>

                <h2>
                  Order #{order.id}
                </h2>

                <p>
                  {formatDate(order.created_at)}
                </p>

              </div>

              <span
                className="status-badge"
                style={{
                  backgroundColor: getStatusColor(
                    order.status
                  ),
                }}
              >
                {order.status}
              </span>

            </div>

            <hr />

            <div className="order-details">

              <div className="address-box">

  <strong>Delivery Address</strong>

  <p>
    {order.address || "Not Available"}
  </p>

  <p>
    {order.city} - {order.pincode}
  </p>

  <p>
    {order.state}
  </p>

</div>

              <div className="detail-row">

                <span>Phone</span>

                <strong>
                  {order.phone || "Not Available"}
                </strong>

              </div>

              <div className="detail-row">

                <span>Address</span>

                <strong>

                  {order.address
                    ? `${order.address}, ${order.city}, ${order.state} - ${order.pincode}`
                    : "Not Available"}

                </strong>

              </div>

              <div className="detail-row">

                <span>Total Amount</span>

                <strong className="price">

                  ₹{Number(order.total_price).toLocaleString()}

                </strong>

              </div>

            </div>
            <div className="order-footer">

  <span className="order-id">
    Order ID : #{order.id}
  </span>

  <button className="track-btn">
    Track Order
  </button>

</div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Orders;