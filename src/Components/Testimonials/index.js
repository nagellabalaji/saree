import "./Testimonials.css";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    name: "Priya Sharma",
    city: "Hyderabad",
    review:
      "Excellent quality sarees. The fabric is soft, the delivery was quick, and the packaging was beautiful."
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    name: "Anjali Reddy",
    city: "Bangalore",
    review:
      "I ordered a wedding saree and it looked exactly like the pictures. Highly recommended!"
  },
  {
    id: 3,
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    name: "Sneha Patel",
    city: "Chennai",
    review:
      "Amazing customer service and premium quality. Definitely buying again."
  }
];

const Testimonials = () => {

  return (

    <section className="testimonials">

      <div className="testimonial-title">

        <h1>What Our Customers Say</h1>

        <p>Thousands of Happy Customers Across India</p>

      </div>

      <div className="testimonial-container">

        {reviews.map((item) => (

          <div
            className="testimonial-card"
            key={item.id}
          >

            <img
              src={item.image}
              alt={item.name}
            />

            <h3>{item.name}</h3>

            <span>{item.city}</span>

            <div className="stars">

              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />

            </div>

            <p>

              "{item.review}"

            </p>

          </div>

        ))}

      </div>

    </section>

  );

};

export default Testimonials;