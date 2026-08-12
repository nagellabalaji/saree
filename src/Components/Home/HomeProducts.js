import "./Home.css";
import { FaHeart, FaStar } from "react-icons/fa";
import saree1 from "../images/saree1.avif"
import saree2 from "../images/saree2.jpg"
import saree3 from "../images/saree3.avif"
import saree4 from "../images/saree4.avif"
import saree5 from "../images/saree5.avif"
import saree6 from "../images/saree6.avif"
import saree7 from "../images/saree7.webp"
import saree8 from "../images/saree8.webp"

const products = [
  {
    id: 1,
    image: saree1,
    name: "Royal Silk Saree",
    price: 5499,
    oldPrice: 6999,
    discount: "20%",
    rating: 4.8,
  },
  {
    id: 2,
    image: saree2,
    name: "Banarasi Silk Saree",
    price: 3999,
    oldPrice: 4999,
    discount: "18%",
    rating: 4.7,
  },
  {
    id: 3,
    image: saree3,
    name: "Cotton Printed Saree",
    price: 1499,
    oldPrice: 1999,
    discount: "25%",
    rating: 4.5,
  },
  {
    id: 4,
    image: saree4,
    name: "Designer Saree",
    price: 2299,
    oldPrice: 2899,
    discount: "22%",
    rating: 4.6,
  },
  {
    id: 5,
    image: saree5,
    name: "Wedding Saree",
    price: 8999,
    oldPrice: 10999,
    discount: "20%",
    rating: 5.0,
  },
  {
    id: 6,
    image: saree8,
    name: "Floral Saree",
    price: 1899,
    oldPrice: 2499,
    discount: "24%",
    rating: 4.4,
  },
  {
    id: 7,
    image: saree7,
    name: "Net Saree",
    price: 2799,
    oldPrice: 3499,
    discount: "20%",
    rating: 4.8,
  },
  {
    id: 8,
    image: saree6,
    name: "Linen Saree",
    price: 1699,
    oldPrice: 2199,
    discount: "18%",
    rating: 4.5,
  },
];

const HomeProducts = () => {
  return (
    <section className="trending-products">

      <div className="section-title">

        <h1>Trending Products</h1>

        <p>Our Most Loved Collection</p>

      </div>

      <div className="products-container">

        {products.map((product) => (

          <div className="product-card" key={product.id}>

            <span className="discount-badge">
              {product.discount}
            </span>

            <span className="wishlist">
              <FaHeart />
            </span>

            <div className="image-container">

              <img src={product.image} alt={product.name} />

            </div>

            <div className="product-details">

              <h3>{product.name}</h3>

              <div className="rating">

                <FaStar />

                <span>{product.rating}</span>

              </div>

              <div className="price">

                <span className="new-price">
                  ₹{product.price.toLocaleString()}
                </span>

                <span className="old-price">
                  ₹{product.oldPrice.toLocaleString()}
                </span>

              </div>

              <button>Add To Cart</button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default HomeProducts;