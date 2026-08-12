import "./Features.css";

import {
    FaShippingFast,
    FaCreditCard,
    FaUndoAlt,
    FaAward
} from "react-icons/fa";

const Features = () => {

    const features = [
        {
            id: 1,
            icon: <FaShippingFast />,
            title: "Free Shipping",
            subtitle: "On Orders Above ₹999"
        },
        {
            id: 2,
            icon: <FaCreditCard />,
            title: "Secure Payment",
            subtitle: "100% Safe Checkout"
        },
        {
            id: 3,
            icon: <FaUndoAlt />,
            title: "Easy Returns",
            subtitle: "7 Days Return Policy"
        },
        {
            id: 4,
            icon: <FaAward />,
            title: "Premium Quality",
            subtitle: "Trusted by Thousands"
        }
    ];

    return (

        <section className="features">

            {features.map((item) => (

                <div className="feature-card" key={item.id}>

                    <div className="feature-icon">

                        {item.icon}

                    </div>

                    <div>

                        <h3>{item.title}</h3>

                        <p>{item.subtitle}</p>

                    </div>

                </div>

            ))}

        </section>

    );
};

export default Features;