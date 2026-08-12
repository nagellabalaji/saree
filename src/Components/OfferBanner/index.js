import "./OfferBanner.css";
import banner from "../images/banner.avif";

const OfferBanner = () => {

    return (

        <section className="offer-banner">

            <img
                src={banner}
                alt="Festival Offer"
            />

            <div className="offer-overlay">

                <h4>Festival Collection 2026</h4>

                <h1>Flat 50% OFF</h1>

                <p>
                    Discover Premium Silk Sarees, Wedding Collections,
                    Banarasi, Kanchipuram and Designer Sarees.
                </p>

                <button>
                    Shop Now
                </button>

            </div>

        </section>

    );

}

export default OfferBanner;