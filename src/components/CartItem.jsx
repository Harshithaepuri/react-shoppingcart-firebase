import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CartItem = ({ cart, increaseQty, decreaseQty, removeItem }) => {
  return (
    <motion.div
      className="p-4 bg-white rounded-xl shadow-md flex flex-col sm:flex-row items-center gap-6 mb-4 hover:shadow-lg transition"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* ✅ Image */}
      <Link to={`/product/${cart.id}`}>
        <motion.img
          src={cart.image}
          alt={cart.name}
          className="w-28 h-28 object-contain"
          whileHover={{ scale: 1.05 }}
        />
      </Link>

      {/* ✅ Info */}
      <div className="flex flex-col items-center sm:items-start flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{cart.name}</h2>
        <p className="text-xl font-bold text-blue-600">${cart.price}</p>
        <p className="text-gray-500">Quantity: {cart.quantity}</p>
      </div>

      {/* ✅ Buttons */}
      <div className="flex gap-3">
        <motion.button
          className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={() => increaseQty(cart.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ➕
        </motion.button>

        <motion.button
          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={() => removeItem(cart.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🗑️
        </motion.button>

        <motion.button
          className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          onClick={() => decreaseQty(cart.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ➖
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CartItem;
