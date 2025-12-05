import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";
import AuthForm from "./components/AuthForm";
import useCart from "./hooks/useCart";
import Navbar from "./components/NavBar";
import useWishlist from "./hooks/useWishlist";
import WishlistPage from "./pages/WishlistPage";
import AllReviews from "./pages/AllReviews";

function App() {
  const [cart, setCart] = useCart();
  const [wishlist, addToWishlist, removeFromWishlist] = useWishlist();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => console.error("Error signing out:", error.message));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          category: item.category,
          image: item.image,
        }));
        setProducts(formattedData);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (product) => {
    setCart((oldVal) =>
      oldVal.find((item) => item.id === product.id)
        ? oldVal.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...oldVal, { ...product, quantity: 1 }]
    );
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  let filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (item) => item.category === category
    );
  }
  if (sort === "low") filteredProducts.sort((a, b) => a.price - b.price);
  if (sort === "high") filteredProducts.sort((a, b) => b.price - a.price);

  return (
    <Router>
      {/* ✅ Navbar */}
      <Navbar
        user={user}
        handleSignOut={handleSignOut}
        cartCount={cart.length}
        onAuthClick={() => setShowAuthModal(true)}
      />

      {/* ✅ Auth Modal */}
      {showAuthModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowAuthModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowAuthModal(false)}
            >
              ✕
            </button>
            <AuthForm
              setUser={setUser}
              onClose={() => setShowAuthModal(false)}
            />
          </div>
        </div>
      )}

      {/* ✅ Routes */}
      <Routes>
        {/* Home Page with Banner */}
        <Route
          path="/"
          element={
            <Home
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
              products={filteredProducts}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
            />
          }
        />

        {/* Cart Page */}
        <Route
          path="/cart"
          element={
            user ? (
              <CartPage
                cart={cart}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
              />
            ) : (
              <div className="text-center text-xl mt-10">
                Please log in to view your cart.
              </div>
            )
          }
        />

        {/* Product Details */}
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
              addToWishlist={addToWishlist}
            />
          }
        />

        {/* All Reviews */}
        <Route path="/allreviews" element={<AllReviews />} />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={
            <WishlistPage
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
