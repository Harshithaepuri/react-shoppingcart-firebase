import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WishListPage = ({ wishlist, removeFromWishlist }) => {
  if (wishlist.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Your wishlist is empty!</h1>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
{wishlist.map((item) => (
  <div key={item.id} className="border-2 p-4 rounded-lg shadow-md">
    <Link to={`/product/${item.id}`}>
      <img src={item.image} alt={item.name} className="h-40 w-full object-contain mb-2"/>
      <h1 className="text-lg font-bold">{item.name}</h1>
    </Link>
    <h1 className="text-blue-500">${item.price}</h1>
    <motion.div
      className="inline-block px-4 py-2 rounded-lg border-2 bg-red-500 text-white mt-2 cursor-pointer"
      onClick={() => removeFromWishlist(item.id)}
      whileHover={{ scale: 1.05 }}
    >
      Remove
    </motion.div>
  </div>
))}

    </div>
  );
};

export default WishListPage;
