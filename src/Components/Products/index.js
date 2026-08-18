import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

import "./Products.css";
import { BASE_URL, headers } from "../../api/Supabase";
import { useCounts } from "../../Context/CountContext";
import { useSearch } from "../../Context/SearchContext";
import { useCategory } from "../../Context/CategoryContext";
import { usePrice } from "../../Context/PriceContext";
import { useSort } from "../../Context/SortContext";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchCounts } = useCounts();
  const { searchTerm } = useSearch();
  const { category, setCategory } = useCategory();
  const { price, setPrice } = usePrice();
  const { sortBy, setSortBy } = useSort();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    if (user) {
      fetchWishlist();
    }

    fetchProducts();

  }, []);

  // ===========================
  // Fetch Products
  // ===========================

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        `${BASE_URL}/products`,
        {
          headers,
        }
      );

      setProducts(res.data);

    } catch (error) {

      console.log(error);

      toast.error("Unable to fetch products");

    } finally {

      setLoading(false);

    }

  };

  // ===========================
  // Fetch Wishlist
  // ===========================

  const fetchWishlist = async () => {

    try {

      const res = await axios.get(
        `${BASE_URL}/wishlist?user_id=eq.${user.id}&select=*`,
        {
          headers,
        }
      );

      setWishlist(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ===========================
  // Check Wishlist
  // ===========================

  const isInWishlist = (productId) => {

    return wishlist.some(
      (item) => item.product_id === productId
    );

  };

    // ===========================
  // Add To Cart
  // ===========================

  // ===========================
// Add To Cart
// ===========================

const addToCart = async (product) => {

    const user =
        JSON.parse(localStorage.getItem("user"));

    if (!user) {

        toast.error(
            "Please login first"
        );

        return;

    }

    try {

        const check = await axios.get(

            `${BASE_URL}/cart?user_id=eq.${user.id}&product_id=eq.${product.id}`,

            {
                headers
            }

        );


        if (check.data.length > 0) {

            const cartItem =
                check.data[0];


            await axios.patch(

                `${BASE_URL}/cart?id=eq.${cartItem.id}`,

                {
                    quantity:
                        Number(cartItem.quantity) + 1
                },

                {
                    headers
                }

            );


            await fetchCounts();


            toast.success(
                `${product.title} quantity updated`
            );

        }

        else {

            await axios.post(

                `${BASE_URL}/cart`,

                {
                    user_id:
                        user.id,

                    product_id:
                        product.id,

                    quantity: 1
                },

                {
                    headers
                }

            );


            await fetchCounts();


            toast.success(
                `${product.title} added to cart`
            );

        }

    }

    catch (error) {

        console.log(
            "CART ERROR:",
            error
        );

        console.log(
            "STATUS:",
            error.response?.status
        );

        console.log(
            "DATA:",
            error.response?.data
        );


        toast.error(
            "Unable to add product"
        );

    }

};


// ===========================
// Wishlist
// ===========================

const toggleWishlist = async (product) => {

    const user =
        JSON.parse(localStorage.getItem("user"));

    if (!user) {

        toast.error(
            "Please login first"
        );

        return;

    }

    try {

        const existing =
            wishlist.find(

                (item) =>
                    Number(item.product_id) ===
                    Number(product.id)

            );


        // ==============================
        // REMOVE
        // ==============================

        if (existing) {

            await axios.delete(

                `${BASE_URL}/wishlist?id=eq.${existing.id}`,

                {
                    headers
                }

            );


            setWishlist(

                wishlist.filter(

                    (item) =>
                        item.id !== existing.id

                )

            );


            await fetchCounts();


            toast.success(
                `${product.title} removed from wishlist`
            );

        }


        // ==============================
        // ADD
        // ==============================

        else {

            const res =
                await axios.post(

                    `${BASE_URL}/wishlist`,

                    {
                        user_id:
                            user.id,

                        product_id:
                            product.id
                    },

                    {
                        headers
                    }

                );


            if (
                res.data &&
                res.data.length > 0
            ) {

                setWishlist([

                    ...wishlist,

                    res.data[0]

                ]);

            }


            await fetchCounts();


            toast.success(
                `${product.title} added to wishlist`
            );

        }

    }

    catch (error) {

        console.log(
            "WISHLIST ERROR:",
            error
        );

        console.log(
            "STATUS:",
            error.response?.status
        );

        console.log(
            "DATA:",
            error.response?.data
        );


        toast.error(
            "Something went wrong"
        );

    }

};
  const filteredProducts = [...products]

  .filter((_, index) => index !== 1)

  .filter((product) => {

    const searchMatch =
      !searchTerm ||
      product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const categoryMatch =
      category === "All" ||
      product.title
        .toLowerCase()
        .includes(category.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(category.toLowerCase());

    const productPrice = Number(product.price);

    let priceMatch = true;

    switch (price) {

      case "0-1000":
        priceMatch = productPrice <= 1000;
        break;

      case "1000-3000":
        priceMatch =
          productPrice > 1000 &&
          productPrice <= 3000;
        break;

      case "3000-5000":
        priceMatch =
          productPrice > 3000 &&
          productPrice <= 5000;
        break;

      case "5000":
        priceMatch = productPrice > 5000;
        break;

      default:
        priceMatch = true;

    }

    return (
      searchMatch &&
      categoryMatch &&
      priceMatch
    );

  })

  .sort((a, b) => {

    switch (sortBy) {

      case "low-high":
        return Number(a.price) - Number(b.price);

      case "high-low":
        return Number(b.price) - Number(a.price);

      case "a-z":
        return a.title.localeCompare(b.title);

      case "z-a":
        return b.title.localeCompare(a.title);

      default:
        return 0;

    }

  });

    if (loading) {
    return (
      <div className="container">
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Loading Products...
        </h2>
      </div>
    );
    
  }
  

  return (
  <>
  <div className="container">

    <h1 className="heading">
      Product List
    </h1>

    {filteredProducts.length === 0 ? (

      <div className="no-products">

        <img
          src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
          alt="No Products"
        />

        <h2>No Products Found</h2>

        <p>
          Try searching with another keyword.
        </p>

      </div>

    ) : (

      <>

       <div className="filter-bar">

    {/* Category */}

    <div className="filter-group">

        <label>Category</label>

        <select
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="filter-select"
        >

            <option value="All">All Categories</option>
            <option value="Wedding">Wedding</option>
            <option value="Silk">Silk</option>
            <option value="Cotton">Cotton</option>
            <option value="Designer">Designer</option>
            <option value="Party Wear">Party Wear</option>

        </select>

    </div>

    {/* Price */}

    <div className="filter-group">

        <label>Price</label>

        <select
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            className="filter-select"
        >

            <option value="All">All Prices</option>
            <option value="0-1000">₹0 - ₹1000</option>
            <option value="1000-3000">₹1000 - ₹3000</option>
            <option value="3000-5000">₹3000 - ₹5000</option>
            <option value="5000">Above ₹5000</option>

        </select>

    </div>

    {/* Sort */}

    <div className="filter-group">

        <label>Sort By</label>

        <select
            value={sortBy}
            onChange={(e)=>setSortBy(e.target.value)}
            className="filter-select"
        >

            <option value="default">Default</option>

            <option value="low-high">
                Price : Low → High
            </option>

            <option value="high-low">
                Price : High → Low
            </option>

            <option value="a-z">
                Name : A → Z
            </option>

            <option value="z-a">
                Name : Z → A
            </option>

        </select>
        

    </div>
    

</div>




        <div className="products">

          {filteredProducts.map((product) => (

            <div
              className="card"
              key={product.id}
            >

              <div
                className={`wishlist-icon ${
                  isInWishlist(product.id)
                    ? "active"
                    : ""
                }`}
                onClick={() => toggleWishlist(product)}
              >
                <FaHeart />
              </div>

              <Link to={`/product/${product.id}`}>

                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />

              </Link>

              <div className="card-body">

                <h2>{product.title}</h2>

                <p>{product.description}</p>

                <h3>₹{product.price}</h3>

                <button
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      </>

    )}

  </div>
</>
);
};

export default Products;