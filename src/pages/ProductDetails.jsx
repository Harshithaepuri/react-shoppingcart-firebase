import products from "../data/products";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReviewSection from "../components/ReviewSection";

const ProductDetails = ({ addToCart, addToWishlist, user }) => {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl text-gray-600">Product not found!</h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* ✅ Product Image */}
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="w-full md:w-96 h-auto object-contain rounded-lg shadow-sm"
        />

        {/* ✅ Product Details */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-500 mt-2">{product.category}</p>

          <h2 className="text-2xl font-semibold text-blue-500 mt-4">
            ${product.price.toFixed(2)}
          </h2>

          {/* ✅ Add to Cart */}
          <button
            onClick={() => addToCart(product)}
            className="mt-6 w-full md:w-auto px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            Add to Cart
          </button>

          {/* ✅ Add to Wishlist with Animation */}
          <motion.button
            onClick={() => addToWishlist(product)}
            className="mt-4 w-full md:w-auto px-6 py-3 border-2 border-red-500 bg-red-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ❤️ Add to Wishlist
          </motion.button>

          {/* ✅ Review Section */}
          <div className="mt-10">
            <ReviewSection productId={product.id} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
