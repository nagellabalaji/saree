import "./Subscribe.css";
import { FaPaperPlane } from "react-icons/fa";

const Subscribe = () => {

    return (

        <section className="subscribe">

            <div className="subscribe-content">

                <h1>Subscribe To Our Newsletter</h1>

                <p>
                    Get exclusive offers, latest collections, festive discounts
                    and fashion updates directly to your inbox.
                </p>

                <div className="subscribe-box">

                    <input
                        type="email"
                        placeholder="Enter your email address"
                    />

                    <button>

                        <FaPaperPlane />

                        Subscribe

                    </button>

                </div>

            </div>

        </section>

    );

}

export default Subscribe;