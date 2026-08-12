import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    BASE_URL,
    headers
} from "../../api/Supabase";

import {
    useCounts
} from "../../Context/CountContext";

import "./Wishlist.css";


const Wishlist = () => {

    const navigate = useNavigate();

    const {
        fetchCounts
    } = useCounts();


    // =====================================
    // STATES
    // =====================================

    const [wishlist, setWishlist] =
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
    // FETCH WISHLIST
    // =====================================

    const fetchWishlist = async () => {

        const currentUser =
            getCurrentUser();


        if (
            !currentUser ||
            !currentUser.id
        ) {

            setWishlist([]);

            setLoading(false);

            return;

        }


        try {

            setLoading(true);


            const res = await axios.get(

                `${BASE_URL}/wishlist?user_id=eq.${currentUser.id}&select=*,products(*)`,

                {
                    headers
                }

            );


            console.log(
                "WISHLIST RESPONSE:",
                res.data
            );


            setWishlist(
                res.data
            );

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
                "Unable to load wishlist"
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

        fetchWishlist();

        fetchCounts();

    }, []);


    // =====================================
    // REMOVE FROM WISHLIST
    // =====================================

    const removeFromWishlist =
        async (wishlistId) => {

            try {

                await axios.delete(

                    `${BASE_URL}/wishlist?id=eq.${wishlistId}`,

                    {
                        headers
                    }

                );


                // Immediately update UI

                setWishlist(

                    (previousWishlist) =>

                        previousWishlist.filter(

                            (item) =>
                                item.id !==
                                wishlistId

                        )

                );


                await fetchCounts();


                toast.success(
                    "Removed from Wishlist"
                );

            }

            catch (error) {

                console.log(
                    "REMOVE WISHLIST ERROR:",
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
    // MOVE TO CART
    // =====================================

    const moveToCart = async (item) => {

        const currentUser =
            getCurrentUser();


        // ---------------------------------
        // Check Login
        // ---------------------------------

        if (
            !currentUser ||
            !currentUser.id
        ) {

            toast.error(
                "Please login first"
            );

            return;

        }


        // ---------------------------------
        // Check Product
        // ---------------------------------

        if (
            !item ||
            !item.product_id
        ) {

            toast.error(
                "Invalid product"
            );

            return;

        }


        try {

            console.log(
                "========== MOVE TO CART =========="
            );

            console.log(
                "USER ID:",
                currentUser.id
            );

            console.log(
                "PRODUCT ID:",
                item.product_id
            );


            // =================================
            // CHECK IF PRODUCT ALREADY IN CART
            // =================================

            const check =
                await axios.get(

                    `${BASE_URL}/cart?user_id=eq.${currentUser.id}&product_id=eq.${item.product_id}&select=*`,

                    {
                        headers
                    }

                );


            console.log(
                "CART CHECK:",
                check.data
            );


            // =================================
            // ALREADY IN CART
            // =================================

            if (
                check.data.length > 0
            ) {

                const cartItem =
                    check.data[0];


                const newQuantity =
                    Number(
                        cartItem.quantity
                    ) + 1;


                await axios.patch(

                    `${BASE_URL}/cart?id=eq.${cartItem.id}`,

                    {
                        quantity:
                            newQuantity
                    },

                    {
                        headers
                    }

                );


                console.log(
                    "Cart quantity updated"
                );

            }


            // =================================
            // NOT IN CART
            // =================================

            else {

                const cartData = {

                    user_id:
                        currentUser.id,

                    product_id:
                        item.product_id,

                    quantity: 1

                };


                console.log(
                    "ADDING TO CART:",
                    cartData
                );


                await axios.post(

                    `${BASE_URL}/cart`,

                    cartData,

                    {
                        headers
                    }

                );


                console.log(
                    "Product added to cart"
                );

            }


            // =================================
            // REMOVE FROM WISHLIST DATABASE
            // =================================

            await axios.delete(

                `${BASE_URL}/wishlist?id=eq.${item.id}`,

                {
                    headers
                }

            );


            // =================================
            // REMOVE FROM WISHLIST UI
            // =================================

            setWishlist(

                (previousWishlist) =>

                    previousWishlist.filter(

                        (wishlistItem) =>
                            wishlistItem.id !==
                            item.id

                    )

            );


            // =================================
            // UPDATE COUNTS
            // =================================

            await fetchCounts();


            // =================================
            // SUCCESS
            // =================================

            toast.success(
                "Product moved to cart 🛒"
            );


            // =================================
            // GO TO CART
            // =================================

            navigate("/cart");

        }

        catch (error) {

            console.log(
                "========== MOVE TO CART ERROR =========="
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

            console.log(
                "URL:",
                error.config?.url
            );


            toast.error(

                error.response?.data?.message ||
                "Unable to move item"

            );

        }

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="wishlist-loading">

                <h2>
                    Loading Wishlist...
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

            <div className="empty-wishlist">

                <h1>
                    Please Login
                </h1>

                <p>
                    Login to view your wishlist.
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
    // EMPTY WISHLIST
    // =====================================

    if (wishlist.length === 0) {

        return (

            <div className="empty-wishlist">

                <h1>
                    ❤️ Your Wishlist is Empty
                </h1>

                <p>
                    Save your favourite sarees here.
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
    // UI
    // =====================================

    return (

        <div className="wishlist-page">

            <h1 className="wishlist-title">
                My Wishlist
            </h1>


            <div className="wishlist-grid">

                {wishlist.map((item) => (

                    <div
                        className="wishlist-card"
                        key={item.id}
                    >

                        <img
                            src={item.products.image}
                            alt={item.products.title}
                            className="wishlist-image"
                        />


                        <div className="wishlist-details">

                            <h3>
                                {item.products.title}
                            </h3>


                            <h2>
                                ₹
                                {Number(
                                    item.products.price
                                ).toLocaleString()}
                            </h2>


                            <div className="wishlist-buttons">


                                {/* MOVE TO CART */}

                                <button
                                    className="move-btn"
                                    onClick={() =>
                                        moveToCart(item)
                                    }
                                >

                                    Move To Cart

                                </button>


                                {/* REMOVE */}

                                <button
                                    className="remove-btn"
                                    onClick={() =>
                                        removeFromWishlist(
                                            item.id
                                        )
                                    }
                                >

                                    Remove

                                </button>


                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};


export default Wishlist;