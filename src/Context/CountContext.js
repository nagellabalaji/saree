import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, headers } from "../api/Supabase";

const CountContext = createContext();

export const CountProvider = ({ children }) => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [cartCount, setCartCount] = useState(0);

  const [wishlistCount, setWishlistCount] = useState(0);

  const fetchCounts = async () => {

    if (!user) {

      setCartCount(0);
      setWishlistCount(0);
      return;

    }

    try {

      const [cartRes, wishlistRes] = await Promise.all([

        axios.get(

          `${BASE_URL}/cart?user_id=eq.${user.id}&select=id`,

          { headers }

        ),

        axios.get(

          `${BASE_URL}/wishlist?user_id=eq.${user.id}&select=id`,

          { headers }

        )

      ]);

      setCartCount(cartRes.data.length);

      setWishlistCount(wishlistRes.data.length);

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchCounts();

  }, []);

  return (

    <CountContext.Provider

      value={{

        cartCount,

        wishlistCount,

        fetchCounts,

      }}

    >

      {children}

    </CountContext.Provider>

  );

};

export const useCounts = () => useContext(CountContext);