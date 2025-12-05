import Cart from "../components/Cart";

const CartPage = ({cart,increaseQty, decreaseQty, removeItem}) => {
    return(
        <div className="max-w-screen-xl mx-auto p-4">
       <Cart cart = {cart} increaseQty ={increaseQty} decreaseQty = {decreaseQty} removeItem = {removeItem}/>
        </div>
    )
}

export default CartPage;