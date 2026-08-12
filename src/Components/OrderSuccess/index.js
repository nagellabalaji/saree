import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {

  return (

    <div className="success-page">

      <div className="success-card">

        <FaCheckCircle className="success-icon" />

        <h1>Order Placed Successfully!</h1>

        <p>

          Thank you for shopping with us.

        </p>

        <p>

          Your order has been received and is being processed.

        </p>

        <div className="success-buttons">

          <Link to="/orders">

            <button className="orders-btn">

              View Orders

            </button>

          </Link>

          <Link to="/products">

            <button className="shop-btn">

              Continue Shopping

            </button>

          </Link>

        </div>

      </div>

    </div>

  );

};

export default OrderSuccess;