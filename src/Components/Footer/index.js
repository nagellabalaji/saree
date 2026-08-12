import "./Footer.css";

import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope
} from "react-icons/fa";

import {
    SiVisa,
    SiMastercard,
    SiPaypal
} from "react-icons/si";

const Footer = () => {

    return (

        <footer className="footer">

            <div className="footer-container">

                {/* Company */}

                <div className="footer-column">

                    <h2 className="footer-logo">
                        Saree<span>Store</span>
                    </h2>

                    <p>

                        SareeStore brings premium sarees, ethnic wear,
                        festive collections and designer fashion at
                        affordable prices across India.

                    </p>

                    <div className="social-icons">

                        <a href="/">
                            <FaFacebookF />
                        </a>

                        <a href="/">
                            <FaInstagram />
                        </a>

                        <a href="/">
                            <FaTwitter />
                        </a>

                        <a href="/">
                            <FaYoutube />
                        </a>

                    </div>

                </div>

                {/* Quick Links */}

                <div className="footer-column">

                    <h3>Quick Links</h3>

                    <ul>

                        <li>Home</li>

                        <li>Shop</li>

                        <li>Collections</li>

                        <li>About Us</li>

                        <li>Contact</li>

                    </ul>

                </div>

                {/* Categories */}

                <div className="footer-column">

                    <h3>Categories</h3>

                    <ul>

                        <li>Silk Sarees</li>

                        <li>Cotton Sarees</li>

                        <li>Wedding Sarees</li>

                        <li>Designer Sarees</li>

                        <li>Party Wear</li>

                    </ul>

                </div>

                {/* Contact */}

                <div className="footer-column">

                    <h3>Contact Us</h3>

                    <p>

                        <FaMapMarkerAlt />

                        Hyderabad, Telangana

                    </p>

                    <p>

                        <FaPhoneAlt />

                        +91 98765 43210

                    </p>

                    <p>

                        <FaEnvelope />

                        support@sareestore.com

                    </p>

                    <div className="payment-icons">

                        <SiVisa />

                        <SiMastercard />

                        <SiPaypal />

                    </div>

                </div>

            </div>

            <div className="footer-bottom">

                © 2026 SareeStore. All Rights Reserved.

            </div>

        </footer>

    );

}

export default Footer;