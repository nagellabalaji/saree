import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Profile.css";
import { BASE_URL, headers } from "../../api/Supabase";

const Profile = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // ==========================
  // STATES
  // ==========================

  const [ordersCount, setOrdersCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const [isEditing, setIsEditing] = useState(false);

  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");

  // ==========================
  // LOAD COUNTS
  // ==========================

  useEffect(() => {

    if (user) {
      fetchCounts();
    }

  }, []);

  // ==========================
  // FETCH COUNTS
  // ==========================

  const fetchCounts = async () => {

    try {

      const [orders, wishlist, cart] = await Promise.all([

        axios.get(
          `${BASE_URL}/orders?user_id=eq.${user.id}&select=id`,
          { headers }
        ),

        axios.get(
          `${BASE_URL}/wishlist?user_id=eq.${user.id}&select=id`,
          { headers }
        ),

        axios.get(
          `${BASE_URL}/cart?user_id=eq.${user.id}&select=id`,
          { headers }
        ),

      ]);

      setOrdersCount(orders.data.length);
      setWishlistCount(wishlist.data.length);
      setCartCount(cart.data.length);

    } catch (error) {

      console.log(error);

      toast.error("Unable to load profile");

    }

  };

  // ==========================
  // LOGOUT
  // ==========================

  const logout = () => {

    localStorage.removeItem("user");

    toast.success("Logged Out Successfully");

    navigate("/login");

  };

  // ==========================
  // UPDATE PROFILE
  // ==========================

  const updateProfile = async () => {

    try {

      await axios.patch(

        `${BASE_URL}/register?id=eq.${user.id}`,

        {
          phone,
          address,
        },

        {
          headers,
        }

      );

      const updatedUser = {

        ...user,

        phone,
        address,

      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      toast.success("Profile Updated Successfully");

      setIsEditing(false);

    } catch (error) {

      console.log(error);
      console.log(error.response?.data);

      toast.error("Unable to update profile");

    }

  };
    if (!user) {

    return (

      <div className="profile-login">

        <h2>Please Login First</h2>

      </div>

    );

  }

  return (

    <div className="profile-page">

      <div className="profile-card">

        {/* =========================
              PROFILE HEADER
        ========================== */}

        <div className="profile-header">

          <FaUserCircle className="profile-avatar" />

          <h2>{user.username}</h2>

          <p>{user.email}</p>

        </div>

        {/* =========================
              PROFILE DETAILS
        ========================== */}

        <div className="profile-details">

          {/* Phone */}

          <div className="detail">

            <strong>Phone</strong>

            {

              isEditing ?

              <input

                type="text"

                value={phone}

                onChange={(e)=>setPhone(e.target.value)}

                placeholder="Enter Phone Number"

              />

              :

              <span>

                {phone || "Not Available"}

              </span>

            }

          </div>

          {/* Address */}

          <div className="detail">

            <strong>Address</strong>

            {

              isEditing ?

              <textarea

                value={address}

                onChange={(e)=>setAddress(e.target.value)}

                placeholder="Enter Address"

                rows={3}

              />

              :

              <span>

                {address || "Not Available"}

              </span>

            }

          </div>

        </div>

        {/* =========================
                STATS
        ========================== */}

        <div className="profile-stats">

          <div className="stat-card">

            <FaShoppingBag />

            <h3>{ordersCount}</h3>

            <p>Orders</p>

          </div>

          <div className="stat-card">

            <FaHeart />

            <h3>{wishlistCount}</h3>

            <p>Wishlist</p>

          </div>

          <div className="stat-card">

            <FaShoppingCart />

            <h3>{cartCount}</h3>

            <p>Cart</p>

          </div>

        </div>

        {/* =========================
              BUTTONS
        ========================== */}

        <div className="profile-buttons">

          {

            isEditing ?

            <button

              className="edit-btn"

              onClick={updateProfile}

            >

              <FaSave />

              Save Profile

            </button>

            :

            <button

              className="edit-btn"

              onClick={()=>setIsEditing(true)}

            >

              <FaEdit />

              Edit Profile

            </button>

          }

          <button

            className="logout-btn"

            onClick={logout}

          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

    </div>

  );

};

export default Profile;