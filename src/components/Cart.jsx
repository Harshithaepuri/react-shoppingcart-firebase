import CartItem from "./CartItem";

const Cart = ({ cart, increaseQty, decreaseQty, removeItem }) => {
  if (cart.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold text-gray-700 mt-8 font-poppins">
          No products added to cart.
        </h1>
      </div>
    );
  }

  return (
    <div>
      {cart.map((item) => (
        <CartItem
          cart={item}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
};

export default Cart;
