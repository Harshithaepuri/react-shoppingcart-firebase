import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const ProductList = ({ products, addToCart, addToWishlist }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {products.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
        />
      ))}
    </motion.div>
  );
};

export default ProductList;
