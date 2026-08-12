import {
    useEffect,
    useMemo,
    useState
} from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import "./Cart.css";

import {
    BASE_URL,
    headers
} from "../../api/Supabase";

import {
    useCounts
} from "../../Context/CountContext";


const Cart = () => {


    const {
        fetchCounts
    } = useCounts();


    // =====================================
    // STATES
    // =====================================

    const [cart, setCart] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    // =====================================
    // GET CURRENT USER
    // =====================================

    const getCurrentUser = () => {

        try {

            const storedUser =
                localStorage.getItem("user");

            if (!storedUser) {

                return null;

            }

            return JSON.parse(storedUser);

        }

        catch (error) {

            console.log(
                "USER ERROR:",
                error
            );

            return null;

        }

    };


    // =====================================
    // FETCH CART
    // =====================================

    const fetchCart = async () => {

        const currentUser =
            getCurrentUser();


        if (
            !currentUser ||
            !currentUser.id
        ) {

            setCart([]);

            setLoading(false);

            return;

        }


        try {

            setLoading(true);


            console.log(
                "========== FETCH CART =========="
            );

            console.log(
                "USER ID:",
                currentUser.id
            );


            const res = await axios.get(

                `${BASE_URL}/cart?user_id=eq.${currentUser.id}&select=*,products(*)`,

                {
                    headers
                }

            );


            console.log(
                "CART RESPONSE:",
                res.data
            );


            setCart(
                res.data
            );

        }

        catch (error) {

            console.log(
                "========== CART FETCH ERROR =========="
            );

            console.log(
                "FULL ERROR:",
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
                "Unable to load cart"
            );

        }

        finally {

            setLoading(false);

        }

    };


    // =====================================
    // INITIAL LOAD
    // =====================================

    useEffect(() => {

        fetchCart();

        fetchCounts();

    }, []);


    // =====================================
    // TOTAL PRICE
    // =====================================

    const totalPrice =
        useMemo(() => {

            return cart.reduce(

                (total, item) => {

                    if (
                        !item.products
                    ) {

                        return total;

                    }


                    return (

                        total +

                        (
                            Number(
                                item.quantity
                            ) *

                            Number(
                                item.products.price
                            )
                        )

                    );

                },

                0

            );

        }, [cart]);


    // =====================================
    // INCREASE QUANTITY
    // =====================================

    const increaseQuantity =
        async (item) => {

            try {

                const newQuantity =
                    Number(
                        item.quantity
                    ) + 1;


                await axios.patch(

                    `${BASE_URL}/cart?id=eq.${item.id}`,

                    {
                        quantity:
                            newQuantity
                    },

                    {
                        headers
                    }

                );


                // Immediately update UI

                setCart(

                    (previousCart) =>

                        previousCart.map(

                            (cartItem) =>

                                cartItem.id ===
                                item.id

                                    ? {

                                        ...cartItem,

                                        quantity:
                                            newQuantity

                                    }

                                    : cartItem

                        )

                );


                await fetchCounts();


                toast.success(
                    "Quantity Updated"
                );

            }

            catch (error) {

                console.log(
                    "INCREASE ERROR:",
                    error
                );

                console.log(
                    error.response?.data
                );


                toast.error(
                    "Unable to update quantity"
                );

            }

        };


    // =====================================
    // DECREASE QUANTITY
    // =====================================

    const decreaseQuantity =
        async (item) => {

            try {

                // ---------------------------------
                // If quantity is 1 → remove
                // ---------------------------------

                if (
                    Number(item.quantity) <= 1
                ) {

                    await removeItem(
                        item.id
                    );

                    return;

                }


                const newQuantity =
                    Number(
                        item.quantity
                    ) - 1;


                await axios.patch(

                    `${BASE_URL}/cart?id=eq.${item.id}`,

                    {
                        quantity:
                            newQuantity
                    },

                    {
                        headers
                    }

                );


                // Immediately update UI

                setCart(

                    (previousCart) =>

                        previousCart.map(

                            (cartItem) =>

                                cartItem.id ===
                                item.id

                                    ? {

                                        ...cartItem,

                                        quantity:
                                            newQuantity

                                    }

                                    : cartItem

                        )

                );


                await fetchCounts();


                toast.success(
                    "Quantity Updated"
                );

            }

            catch (error) {

                console.log(
                    "DECREASE ERROR:",
                    error
                );

                console.log(
                    error.response?.data
                );


                toast.error(
                    "Unable to update quantity"
                );

            }

        };


    // =====================================
    // REMOVE ITEM
    // =====================================

    const removeItem =
        async (id) => {

            try {

                await axios.delete(

                    `${BASE_URL}/cart?id=eq.${id}`,

                    {
                        headers
                    }

                );


                // Immediately update UI

                setCart(

                    (previousCart) =>

                        previousCart.filter(

                            (item) =>
                                item.id !== id

                        )

                );


                await fetchCounts();


                toast.success(
                    "Item Removed"
                );

            }

            catch (error) {

                console.log(
                    "REMOVE CART ERROR:",
                    error
                );

                console.log(
                    error.response?.data
                );


                toast.error(
                    "Unable to remove item"
                );

            }

        };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="cart-loading">

                <h2>
                    Loading Cart...
                </h2>

            </div>

        );

    }


    // =====================================
    // LOGIN CHECK
    // =====================================

    const currentUser =
        getCurrentUser();


    if (
        !currentUser ||
        !currentUser.id
    ) {

        return (

            <div className="empty-cart">

                <h1>
                    Please Login
                </h1>

                <p>
                    Login to view your cart.
                </p>

                <Link to="/login">

                    <button>
                        Login
                    </button>

                </Link>

            </div>

        );

    }


    // =====================================
    // EMPTY CART
    // =====================================

    if (cart.length === 0) {

        return (

            <div className="empty-cart">

                <h1>
                    🛒 Your Cart is Empty
                </h1>

                <p>
                    Add your favourite sarees
                    to the cart.
                </p>

                <Link to="/products">

                    <button>
                        Continue Shopping
                    </button>

                </Link>

            </div>

        );

    }


    // =====================================
    // CART UI
    // =====================================

    return (

        <div className="cart-page">

            <h1 className="cart-title">
                Shopping Cart
            </h1>


            <div className="cart-container">


                {/* =================================
                    CART ITEMS
                ================================= */}

                <div className="cart-items">

                    {cart.map((item) => (

                        <div
                            className="cart-card"
                            key={item.id}
                        >


                            {/* IMAGE */}

                            <img
                                src={
                                    item.products?.image
                                }
                                alt={
                                    item.products?.title ||
                                    "Product"
                                }
                                className="cart-image"
                            />


                            {/* DETAILS */}

                            <div className="cart-details">

                                <h2>
                                    {
                                        item.products?.title
                                    }
                                </h2>


                                <h3>

                                    ₹
                                    {Number(
                                        item.products?.price || 0
                                    ).toLocaleString()}

                                </h3>


                                {/* QUANTITY */}

                                <div className="quantity-box">

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(
                                                item
                                            )
                                        }
                                    >
                                        −
                                    </button>


                                    <span>
                                        {item.quantity}
                                    </span>


                                    <button
                                        onClick={() =>
                                            increaseQuantity(
                                                item
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                </div>


                                {/* SUBTOTAL */}

                                <h4>

                                    Subtotal : ₹

                                    {(
                                        Number(
                                            item.quantity
                                        ) *

                                        Number(
                                            item.products?.price ||
                                            0
                                        )

                                    ).toLocaleString()}

                                </h4>


                                {/* REMOVE */}

                                <button
                                    className="remove-btn"
                                    onClick={() =>
                                        removeItem(
                                            item.id
                                        )
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    ))}

                </div>


                {/* =================================
                    ORDER SUMMARY
                ================================= */}

                <div className="cart-summary">

                    <h2>
                        Order Summary
                    </h2>


                    <hr />


                    <div className="summary-row">

                        <span>
                            Total Items
                        </span>


                        <span>

                            {cart.reduce(

                                (sum, item) =>

                                    sum +
                                    Number(
                                        item.quantity
                                    ),

                                0

                            )}

                        </span>

                    </div>


                    <div className="summary-row">

                        <span>
                            Total Price
                        </span>


                        <span>

                            ₹
                            {totalPrice.toLocaleString()}

                        </span>

                    </div>


                    <hr />


                    <Link to="/checkout">

                        <button
                            className="checkout-btn"
                        >
                            Proceed To Checkout
                        </button>

                    </Link>

                </div>

            </div>

        </div>

    );

};


export default Cart;