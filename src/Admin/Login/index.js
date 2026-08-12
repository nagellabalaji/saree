import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

import "./Login.css";
import { ADMIN } from "../Config/admin";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    console.log("Entered Email:", `"${email}"`);
    console.log("Entered Password:", `"${password}"`);
    console.log("Admin Email:", `"${ADMIN.email}"`);
    console.log("Admin Password:", `"${ADMIN.password}"`);

    if (
        email.trim() === ADMIN.email.trim() &&
        password.trim() === ADMIN.password.trim()
    ) {
        
        console.log("Login Success");


        localStorage.setItem(
            "admin",
            JSON.stringify(ADMIN)
        );

        navigate("/admin");

    } else {

        console.log("Login Failed");

        toast.error("Invalid Admin Credentials");

    }

};

  return (

    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-header">

          <FaUserShield className="admin-icon" />

          <h1>Admin Login</h1>

          <p>Login to access the Admin Dashboard</p>

        </div>

        <form
          onSubmit={handleLogin}
          className="admin-form"
        >

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter Admin Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <div className="password-box">

              <FaLock className="lock-icon" />

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>

          </div>

          <button
            type="submit"
            className="admin-login-btn"
          >

            Login

          </button>

        </form>

      </div>

    </div>

  );

};

export default AdminLogin;