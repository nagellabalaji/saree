import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Checkout.css";
import { BASE_URL, headers } from "../../api/Supabase";

const Checkout = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState("");

  const [city, setCity] = useState("");

  const [pincode, setPincode] = useState("");

  useEffect(() => {

    if (user) {

      fetchCart();

    } else {

      setLoading(false);

    }

  }, []);

  const fetchCart = async () => {

    try {

      const res = await axios.get(

        `${BASE_URL}/cart?user_id=eq.${user.id}&select=*,products(*)`,

        {
          headers,
        }

      );

      setCart(res.data);

    } catch (error) {

      console.log(error);

      toast.error("Unable to load cart");

    } finally {

      setLoading(false);

    }

  };

  const totalPrice = useMemo(() => {

    return cart.reduce(

      (total, item) =>

        total +

        item.quantity * Number(item.products.price),

      0

    );

  }, [cart]);

  const totalItems = useMemo(() => {

    return cart.reduce(

      (total, item) =>

        total + item.quantity,

      0

    );

  }, [cart]);
    // =====================================
  // Place Order
  // =====================================

  const placeOrder = async () => {

    if (!address.trim()) {
      toast.error("Please enter your address");
      return;
    }

    if (!city.trim()) {
      toast.error("Please enter your city");
      return;
    }

    if (!pincode.trim()) {
      toast.error("Please enter your pincode");
      return;
    }

    if (pincode.length !== 6) {
      toast.error("Pincode must be 6 digits");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {

      const order = {

    user_id: user.id,

    name: user.username || user.name,

    phone: user.phone,

    address,

    city,

    state: "AP",

    pincode,

    total_price: totalPrice,

    status: "pending",

};

      await axios.post(

        `${BASE_URL}/orders`,

        order,

        {
          headers,
        }

      );

      await axios.delete(

        `${BASE_URL}/cart?user_id=eq.${user.id}`,

        {
          headers,
        }

      );

      toast.success("Order Placed Successfully");

      navigate("/order-success");

    } catch (error) {

  console.log(error);

  console.log(error.response);

  console.log(error.response?.data);

  toast.error("Unable to place order");

}

  };
    if (loading) {

    return (
      <div className="checkout-loading">
        <h2>Loading Checkout...</h2>
      </div>
    );

  }

  if (!user) {

    return (

      <div className="checkout-empty">

        <h1>Please Login</h1>

        <p>Login to continue with checkout.</p>

        <button onClick={() => navigate("/login")}>
          Login
        </button>

      </div>

    );

  }

  if (cart.length === 0) {

    return (

      <div className="checkout-empty">

        <h1>Your Cart is Empty</h1>

        <p>Add products before placing an order.</p>

        <button onClick={() => navigate("/products")}>
          Continue Shopping
        </button>

      </div>

    );

  }

  return (

    <div className="checkout-page">

      <h1 className="checkout-title">
        Checkout
      </h1>

      <div className="checkout-container">

        {/* ================= LEFT ================= */}

        <div className="checkout-form">

          <h2>Delivery Address</h2>

          <label>Name</label>

          <input
            type="text"
            value={user.username}
            readOnly
          />

          <label>Phone</label>

          <input
            type="text"
            value={user.phone}
            readOnly
          />

          <label>Address</label>

          <textarea
            rows="4"
            placeholder="Enter Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

          <label>City</label>

          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
          />

          <label>State</label>

          <input
            type="text"
            value="Andhra Pradesh"
            readOnly
          />

          <label>Pincode</label>

          <input
            type="text"
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e) =>
              setPincode(e.target.value)
            }
          />

        </div>

        {/* ================= RIGHT ================= */}

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          <hr />

          {cart.map((item) => (

            <div
              className="summary-item"
              key={item.id}
            >

              <span>

                {item.products.title}

                × {item.quantity}

              </span>

              <span>

                ₹
                {(
                  item.quantity *
                  Number(item.products.price)
                ).toLocaleString()}

              </span>

            </div>

          ))}

          <hr />

          <div className="summary-item">

            <strong>Total Items</strong>

            <strong>{totalItems}</strong>

          </div>

          <div className="summary-item">

            <strong>Total Price</strong>

            <strong>

              ₹{totalPrice.toLocaleString()}

            </strong>

          </div>

          <button
            className="place-order-btn"
            onClick={placeOrder}
          >

            Place Order

          </button>

        </div>

      </div>

    </div>

  );

};

export default Checkout;