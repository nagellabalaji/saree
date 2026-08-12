import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const addToWishlist = (product) => {

    const alreadyExists = wishlist.find(
      (item) => item.id === product.id
    );

    if (alreadyExists) {

      toast.info("Already in Wishlist ❤️");

      return;
    }

    setWishlist([...wishlist, product]);

    toast.success("Added To Wishlist ❤️");
  };

  const removeFromWishlist = (id) => {

    setWishlist(
      wishlist.filter((item) => item.id !== id)
    );

    toast.error("Removed From Wishlist");
  };

  const isInWishlist = (id) => {

    return wishlist.some(
      (item) => item.id === id
    );
  };

  const clearWishlist = () => {

    setWishlist([]);

    toast.success("Wishlist Cleared");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);