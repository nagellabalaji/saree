import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SingleProduct.css"

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const[count,setCount]=useState(1)

    const Increment=()=>{
        setCount(count+1)
    }
    const Decrement=()=>{
        setCount(count-1)
    }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://dnunlvzypedahcddkndj.supabase.co/rest/v1/products?id=eq.${id}`,
          {
            headers: {
                        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudW5sdnp5cGVkYWhjZGRrbmRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MzEwMDEsImV4cCI6MjEwMTUwNzAwMX0.cCNtmIcD7fGBD2uFgR0TEGuNCKCWC-QW5ONxfFxgmow",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudW5sdnp5cGVkYWhjZGRrbmRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MzEwMDEsImV4cCI6MjEwMTUwNzAwMX0.cCNtmIcD7fGBD2uFgR0TEGuNCKCWC-QW5ONxfFxgmow"
                    }
          }
        );

        // Supabase returns an array
        setProduct(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  const addToCart = (item) => {
    // Get existing cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists
    const existingProduct = cart.find((p) => p.id === item.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        ...item,
        quantity: 1,
      });
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${item.title} added to cart`);
  };

  return (
    <div className="single-product">

    <div className="product-left">

        <img src={product.image} alt={product.title}/>

    </div>

    <div className="product-right">

        <h1 className="product-title">{product.title}</h1>

        <p className="brand">100ml • Bella Vita</p>

        <div className="rating">
            ⭐ 4.8 (1558 Reviews)
        </div>

        <div className="price">
            <span className="current-price">₹{product.price}</span>

            <span className="old-price">₹999</span>

            <span className="discount">(Save 45%)</span>
        </div>

        <p className="tax">
            Inclusive of all taxes
        </p>

        <p className="description">
            {product.description}
        </p>

        <div className="quantity-box">
            <button onClick={Decrement}>-</button>
            <span>{count}</span>
            <button onClick={Increment}>+</button>
        </div>

        <button onClick={() => addToCart(product)} className="cart-btn">
            ADD TO CART
        </button>

    </div>

</div>
  );
};

export default SingleProduct;