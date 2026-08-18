import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Login/Login.css";

import { BASE_URL, headers } from "../../api/Supabase";

const Login = () => {

    const navigate = useNavigate();

    // ==========================
    // STATES
    // ==========================

    const [loginAs, setLoginAs] = useState("User");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    // ==========================
    // ADMIN CREDENTIALS
    // ==========================

    const ADMIN = {

        email: "admin@sainadhsilks.com",

        password: "Admin@123",

        name: "Administrator"

    };

    // ==========================
    // LOGIN
    // ==========================

    const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {

        toast.warning(
            "Please enter email and password"
        );

        return;

    }

    // =====================================
    // ADMIN LOGIN
    // =====================================

    if (loginAs === "Admin") {

        if (
            email.trim() === ADMIN.email &&
            password.trim() === ADMIN.password
        ) {

            localStorage.setItem(
                "admin",
                JSON.stringify(ADMIN)
            );

            toast.success(
                "Welcome Admin 👑"
            );

            setTimeout(() => {

                navigate("/admin");

            }, 1200);

        }

        else {

            toast.error(
                "Invalid Admin Credentials"
            );

        }

        return;

    }


    // =====================================
    // USER LOGIN
    // =====================================

    try {

        const res = await axios.get(

            `${BASE_URL}/register?email=eq.${encodeURIComponent(email)}&password=eq.${encodeURIComponent(password)}`,

            {
                headers
            }

        );


        console.log(
            "LOGIN USER:",
            res.data
        );


        if (res.data.length === 0) {

            toast.error(
                "Invalid Email or Password"
            );

            return;

        }


        // Store the user from THIS database

        localStorage.setItem(
            "user",
            JSON.stringify(res.data[0])
        );


        toast.success(
            `Welcome ${res.data[0].username} 🎉`
        );


        setTimeout(() => {

            navigate("/");

        }, 1200);

    }

    catch (error) {

        console.log(
            "LOGIN ERROR:",
            error
        );

        console.log(
            error.response?.data
        );

        toast.error(
            "Login Failed"
        );

    }

};
    return (

        <div className="login-container">

            <div className="login-card">

                <div className="login-header">

                    <h1>Login Page</h1>

                    <p>
                        Login here to continue your shopping
                    </p>

                </div>

                <form
                    onSubmit={handleLogin}
                    className="login-form"
                >

                    {/* ==========================
                        LOGIN AS
                    ========================== */}

                    <div className="input-group">

                        <label>
                            Login As
                        </label>

                        <select
                            value={loginAs}
                            onChange={(e) =>
                                setLoginAs(e.target.value)
                            }
                            className="login-select"
                        >

                            <option value="User">
                                User
                            </option>

                            <option value="Admin">
                                Admin
                            </option>

                        </select>

                    </div>

                    {/* ==========================
                        EMAIL
                    ========================== */}

                    <div className="input-group">

                        <input
                            type="email"
                            placeholder={
                                loginAs === "Admin"
                                    ? "Enter Admin Email"
                                    : "Enter your email"
                            }
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>

                    {/* ==========================
                        PASSWORD
                    ========================== */}

                    <div className="input-group">

                        <input
                            type="password"
                            placeholder={
                                loginAs === "Admin"
                                    ? "Enter Admin Password"
                                    : "Enter your password"
                            }
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>

                    {/* ==========================
                        LOGIN BUTTON
                    ========================== */}

                    <button
                        type="submit"
                        className="login-btn"
                    >

                        {loginAs === "Admin"
                            ? "Login as Admin"
                            : "Login"
                        }

                    </button>

                    {/* ==========================
                        REGISTER LINK
                    ========================== */}

                    {loginAs === "User" && (

                        <div className="login-header">

                            <p>

                                Don't have an account?{" "}

                                <span className="register">

                                    <a href="/register">
                                        Register
                                    </a>

                                </span>

                            </p>

                        </div>

                    )}

                </form>

            </div>

        </div>

    );

};

export default Login;