import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product, addToCart, addToWishlist }) => {
  return (
    <motion.div
      className="border rounded-xl shadow-md bg-white p-4 flex flex-col items-center hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* ✅ Image */}
      <Link
        to={`/product/${product.id}`}
        className="flex flex-col items-center"
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-contain mb-4"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 150 }}
        />
        <h1 className="text-lg font-semibold text-gray-800 text-center">
          {product.name}
        </h1>
      </Link>

      {/* ✅ Price */}
      <p className="text-xl font-bold text-blue-600 mt-2">${product.price}</p>
      <p className="text-sm text-gray-500">{product.category}</p>

      {/* ✅ Buttons */}
      <div className="flex gap-3 mt-4 w-full">
        <motion.button
          className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition"
          onClick={() => addToCart(product)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🛒 Add to Cart
        </motion.button>

        <motion.button
          className="flex-1 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg shadow-md hover:shadow-lg transition"
          onClick={() => addToWishlist(product)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ❤️ Wishlist
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
