import axios from "axios";
import { BASE_URL, headers } from "../api/Supabase";

// ==========================================
// ADD PRODUCT TO CART
// ==========================================

export const addToCart = async (userId, productId, quantity = 1) => {

    // Check whether product already exists
    const check = await axios.get(

        `${BASE_URL}/cart?user_id=eq.${userId}&product_id=eq.${productId}&select=*`,

        {
            headers
        }

    );

    // ==========================================
    // PRODUCT ALREADY IN CART
    // ==========================================

    if (check.data.length > 0) {

        const cartItem = check.data[0];

        const newQuantity =
            Number(cartItem.quantity) + Number(quantity);

        const response = await axios.patch(

            `${BASE_URL}/cart?id=eq.${cartItem.id}`,

            {
                quantity: newQuantity
            },

            {
                headers
            }

        );

        return {
            ...cartItem,
            quantity: newQuantity,
            response: response.data
        };

    }

    // ==========================================
    // NEW CART ITEM
    // ==========================================

    const response = await axios.post(

        `${BASE_URL}/cart`,

        {
            user_id: userId,
            product_id: productId,
            quantity: quantity
        },

        {
            headers
        }

    );

    return response.data[0];

};


// ==========================================
// GET USER CART
// ==========================================

export const getCart = async (userId) => {

    const response = await axios.get(

        `${BASE_URL}/cart?user_id=eq.${userId}&select=*`,

        {
            headers
        }

    );

    return response.data;

};


// ==========================================
// UPDATE QUANTITY
// ==========================================

export const updateCartQuantity = async (
    cartId,
    quantity
) => {

    const response = await axios.patch(

        `${BASE_URL}/cart?id=eq.${cartId}`,

        {
            quantity
        },

        {
            headers
        }

    );

    return response.data;

};


// ==========================================
// REMOVE CART ITEM
// ==========================================

export const removeFromCart = async (cartId) => {

    const response = await axios.delete(

        `${BASE_URL}/cart?id=eq.${cartId}`,

        {
            headers
        }

    );

    return response.data;

};