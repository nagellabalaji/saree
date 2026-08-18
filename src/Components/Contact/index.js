import { useState } from "react";
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaPaperPlane
} from "react-icons/fa";
import { toast } from "react-toastify";

import "./Contact.css";

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });


    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };


    const handleSubmit = (e) => {

        e.preventDefault();


        if (
            !formData.name ||
            !formData.email ||
            !formData.subject ||
            !formData.message
        ) {

            toast.warning(
                "Please fill all required fields"
            );

            return;

        }


        toast.success(
            "Thank you! Your message has been sent successfully 💖"
        );


        setFormData({

            name: "",
            email: "",
            phone: "",
            subject: "",
            message: ""

        });

    };


    return (

        <div className="contact-page">

            {/* =================================
                HERO
            ================================= */}

            <section className="contact-hero">

                <div className="contact-hero-content">

                    <span>
                        WE'D LOVE TO HEAR FROM YOU
                    </span>

                    <h1>
                        Get In Touch
                    </h1>

                    <p>
                        Have a question about our sarees,
                        orders or collections?
                        We're here to help.
                    </p>

                </div>

            </section>


            {/* =================================
                CONTACT CONTENT
            ================================= */}

            <section className="contact-section">

                <div className="contact-container">


                    {/* =================================
                        LEFT SIDE
                    ================================= */}

                    <div className="contact-info">

                        <span className="contact-small-title">
                            CONTACT US
                        </span>

                        <h2>
                            Let's Talk About
                            <br />
                            Something Beautiful
                        </h2>

                        <p className="contact-description">

                            Whether you're looking for the
                            perfect saree for a special occasion
                            or need help with your order,
                            our team is always happy to assist you.

                        </p>


                        {/* PHONE */}

                        <div className="contact-info-item">

                            <div className="contact-icon">

                                <FaPhone />

                            </div>

                            <div>

                                <h3>
                                    Phone
                                </h3>

                                <p>
                                    +91 98765 43210
                                </p>

                            </div>

                        </div>


                        {/* EMAIL */}

                        <div className="contact-info-item">

                            <div className="contact-icon">

                                <FaEnvelope />

                            </div>

                            <div>

                                <h3>
                                    Email
                                </h3>

                                <p>
                                    support@sainadhsilks.com
                                </p>

                            </div>

                        </div>


                        {/* LOCATION */}

                        <div className="contact-info-item">

                            <div className="contact-icon">

                                <FaMapMarkerAlt />

                            </div>

                            <div>

                                <h3>
                                    Visit Us
                                </h3>

                                <p>
                                    Main Market Road,
                                    <br />
                                    Gudur, Andhra Pradesh
                                </p>

                            </div>

                        </div>


                        {/* WORKING HOURS */}

                        <div className="contact-info-item">

                            <div className="contact-icon">

                                <FaClock />

                            </div>

                            <div>

                                <h3>
                                    Working Hours
                                </h3>

                                <p>
                                    Monday - Saturday
                                    <br />
                                    10:00 AM - 8:00 PM
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        CONTACT FORM
                    ================================= */}

                    <div className="contact-form-card">

                        <div className="form-title">

                            <h2>
                                Send Us A Message
                            </h2>

                            <p>
                                Fill out the form below and
                                we'll get back to you soon.
                            </p>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="contact-form"
                        >


                            {/* NAME + EMAIL */}

                            <div className="form-row">

                                <div className="contact-input">

                                    <label>
                                        Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />

                                </div>


                                <div className="contact-input">

                                    <label>
                                        Email *
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* PHONE + SUBJECT */}

                            <div className="form-row">

                                <div className="contact-input">

                                    <label>
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />

                                </div>


                                <div className="contact-input">

                                    <label>
                                        Subject *
                                    </label>

                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="What is this about?"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* MESSAGE */}

                            <div className="contact-input">

                                <label>
                                    Message *
                                </label>

                                <textarea
                                    name="message"
                                    rows="6"
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* BUTTON */}

                            <button
                                type="submit"
                                className="contact-submit"
                            >

                                <FaPaperPlane />

                                Send Message

                            </button>

                        </form>

                    </div>

                </div>

            </section>


            {/* =================================
                BOTTOM MESSAGE
            ================================= */}

            <section className="contact-bottom">

                <h2>
                    Tradition Meets Trend ✨
                </h2>

                <p>
                    Discover timeless sarees crafted
                    for every beautiful occasion.
                </p>

            </section>

        </div>

    );

};

export default Contact;