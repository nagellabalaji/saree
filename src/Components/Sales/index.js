import { useState, useEffect } from "react";
import axios from "axios";
import "./Sales.css";
import { FaHeart, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL, headers } from "C:/Users/Lakshminarasimha/OneDrive/Desktop/react_practice/frontend/src/api/Supabase";
import { useCounts } from "../../Context/CountContext";
import { addToCart } from "../../services/cartService";

import saree4 from "../images/saree4.avif";
import saree5 from "../images/saree5.avif";
import saree8 from "../images/saree8.webp";
import saree3 from "../images/saree3.avif";

const saleProducts = [
  {
    id: 1,
    image: saree4,
    name: "Wedding Silk Saree",
    oldPrice: 7999,
    newPrice: 5999,
    discount: "25%",
    rating: 4.9,
  },
  {
    id: 2,
    image: saree5,
    name: "Designer Saree",
    oldPrice: 4999,
    newPrice: 3499,
    discount: "30%",
    rating: 4.7,
  },
  {
    id: 3,
    image: saree8,
    name: "Cotton Saree",
    oldPrice: 2499,
    newPrice: 1799,
    discount: "28%",
    rating: 4.6,
  },
  {
    id: 4,
    image: saree3,
    name: "Party Wear Saree",
    oldPrice: 6499,
    newPrice: 4799,
    discount: "26%",
    rating: 4.8,
  },
];

const Sale = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [wishlist, setWishlist] = useState([]);

  const targetDate = new Date("2026-08-15T23:59:59").getTime();
  
  const { fetchCounts } = useCounts();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const fetchWishlist = async () => {

    if (!user) return;

    try {

      const res = await axios.get(
        `${BASE_URL}/wishlist?user_id=eq.${user.id}&select=*`,
        {
          headers,
        }
      );

      setWishlist(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const isInWishlist = (productId) => {

    return wishlist.some(
      (item) => item.product_id === productId
    );

  };

  useEffect(() => {

    if (user) {
      fetchWishlist();
    }

    const timer = setInterval(() => {

      const now = new Date().getTime();

      const difference = targetDate - now;

      if (difference <= 0) {

        clearInterval(timer);

        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      setTimeLeft({

        days: Math.floor(
          difference / (1000 * 60 * 60 * 24)
        ),

        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        ),

        minutes: Math.floor(
          (difference % (1000 * 60 * 60)) /
            (1000 * 60)
        ),

        seconds: Math.floor(
          (difference % (1000 * 60)) /
            1000
        ),

      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // =====================================
  // Add To Cart
  // =====================================

  const handleAddToCart = async (product) => {

    if (!user) {

        toast.error("Please login first");

        return;

    }

    try {

        await addToCart(
            user.id,
            product.id
        );

        await fetchCounts();

        toast.success(
            `${product.name} added to cart`
        );

    }

    catch (error) {

        console.log("ADD TO CART ERROR:", error);

        toast.error(
            "Unable to add to cart"
        );

    }

};

  // =====================================
  // Wishlist
  // =====================================

  const toggleWishlist = async (product) => {

    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {

      const existing = wishlist.find(
        (item) => item.product_id === product.id
      );

      if (existing) {

        await axios.delete(
          `${BASE_URL}/wishlist?id=eq.${existing.id}`,
          {
            headers,
          }
        );

        setWishlist(
          wishlist.filter(
            (item) => item.id !== existing.id
          )
        );
        
        toast.success("Removed from Wishlist");

      } else {

        const res = await axios.post(
          `${BASE_URL}/wishlist`,
          {
            user_id: user.id,
            product_id: product.id,
          },
          {
            headers,
          }
        );

        setWishlist([
          ...wishlist,
          res.data[0],
        ]);

        toast.success("Added to Wishlist");

      }

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");

    }

  };

    return (
    <div className="sale-page">

      <section className="sale-banner">

        <h4>Limited Time Offer</h4>

        <h1>MEGA SALE</h1>

        <p>Up to 70% OFF on Premium Sarees</p>

        <div className="countdown">

          <div>
            <h2>{String(timeLeft.days).padStart(2, "0")}</h2>
            <span>Days</span>
          </div>

          <div>
            <h2>{String(timeLeft.hours).padStart(2, "0")}</h2>
            <span>Hours</span>
          </div>

          <div>
            <h2>{String(timeLeft.minutes).padStart(2, "0")}</h2>
            <span>Minutes</span>
          </div>

          <div>
            <h2>{String(timeLeft.seconds).padStart(2, "0")}</h2>
            <span>Seconds</span>
          </div>

        </div>

      </section>

      <section className="sale-categories">

        <div className="sale-category">
          <h3>👰 Wedding Sale</h3>
          <p>Up to 50% OFF</p>
        </div>

        <div className="sale-category">
          <h3>✨ Designer Sale</h3>
          <p>Flat 40% OFF</p>
        </div>

        <div className="sale-category">
          <h3>🌸 Cotton Sale</h3>
          <p>Buy 2 Get 1</p>
        </div>

        <div className="sale-category">
          <h3>💎 Silk Sale</h3>
          <p>Up to 60% OFF</p>
        </div>

      </section>

      <section className="sale-products">

        <h2>Today's Best Deals</h2>

        <div className="sale-grid">

          {saleProducts.map((product) => (

            <div
              className="sale-card"
              key={product.id}
            >

              <div className="offer-ribbon">
                {product.discount} OFF
              </div>

              <div
                className={`sale-heart ${
                  isInWishlist(product.id)
                    ? "active"
                    : ""
                }`}
                onClick={() => toggleWishlist(product)}
              >
                <FaHeart />
              </div>

              <img
                src={product.image}
                alt={product.name}
              />

              <div className="sale-info">

                <h3>{product.name}</h3>

                <div className="sale-rating">

                  <FaStar />

                  <span>{product.rating}</span>

                </div>

                <div className="sale-price">

                  <span className="new-price">
                    ₹{product.newPrice.toLocaleString()}
                  </span>

                  <del>
                    ₹{product.oldPrice.toLocaleString()}
                  </del>

                </div>

                <p className="save-price">
                  You Save ₹
                  {(product.oldPrice - product.newPrice).toLocaleString()}
                </p>

                <button
    onClick={() => handleAddToCart(product)}
>
    Add To Cart
</button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
};

export default Sale;