import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar({
  user,
  handleSignOut,
  cartCount,
  onAuthClick,
}: {
  user: any;
  handleSignOut: () => void;
  cartCount: number;
  onAuthClick: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          ShopEase
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">

          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          <Link to="/wishlist" className="hover:text-blue-600 transition">
            Wishlist
          </Link>

          <Link to="/allreviews" className="hover:text-blue-600 transition">
            Reviews
          </Link>

          <Link to="/cart" className="relative hover:text-blue-600 transition">
            Cart
            <span className="ml-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </Link>

          {user ? (
            <button onClick={handleSignOut} className="hover:text-red-500 transition">
              Sign Out
            </button>
          ) : (
            <button
              onClick={onAuthClick}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-inner px-4 py-4 flex flex-col gap-4">

          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/wishlist" onClick={() => setOpen(false)}>Wishlist</Link>
          <Link to="/allreviews" onClick={() => setOpen(false)}>Reviews</Link>

          <Link to="/cart" onClick={() => setOpen(false)}>
            Cart ({cartCount})
          </Link>

          {user ? (
            <button onClick={handleSignOut} className="text-left text-red-500">
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => {
                onAuthClick();
                setOpen(false);
              }}
              className="bg-blue-600 text-white py-2 rounded-lg"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
