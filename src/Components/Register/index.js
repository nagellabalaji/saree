import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Register/Register.css";

import { BASE_URL, headers } from "../../api/Supabase";

const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

    e.preventDefault();

    const data = {
        username,
        email,
        phone,
        password
    };

    try {

        const res = await axios.post(

            `${BASE_URL}/register`,

            data,

            {
                headers
            }

        );

        console.log(
            "REGISTER RESPONSE:",
            res.data
        );

        toast.success(
            "Registered successfully"
        );

        navigate("/login");

    }

    catch (error) {

        console.log(
            "REGISTER ERROR:",
            error
        );

        console.log(
            error.response?.data
        );

        toast.error(
            "Something went wrong"
        );

    }

};

    return (

        <div className="register-container">

            <div className="register-card">

                <div className="register-header">

                    <h1>Register Form</h1>

                    <p>
                        Register here to continue your shopping
                    </p>

                </div>

                <form
                    onSubmit={handleRegister}
                    className="register-form"
                >

                    {/* USERNAME */}

                    <div className="input-group">

                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                        />

                    </div>

                    {/* EMAIL */}

                    <div className="input-group">

                        <input
                            type="email"
                            placeholder="something@gmail.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>

                    {/* PHONE */}

                    <div className="input-group">

                        <input
                            type="tel"
                            placeholder="+91 XXXXXXXXXX"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                        />

                    </div>

                    {/* PASSWORD */}

                    <div className="input-group">

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>

                    {/* REGISTER BUTTON */}

                    <button
                        type="submit"
                        className="register-btn"
                    >
                        Register
                    </button>

                    {/* LOGIN LINK */}

                    <div className="register-header">

                        <p>

                            Already have an account?{" "}

                            <a href="/login">
                                Login
                            </a>

                        </p>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default Register;