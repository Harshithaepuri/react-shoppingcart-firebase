import { useState } from "react";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prev) =>
      prev.find(item => item.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter(item => item.id !== id));
  };

  return [wishlist, addToWishlist, removeFromWishlist];
};

export default useWishlist;
