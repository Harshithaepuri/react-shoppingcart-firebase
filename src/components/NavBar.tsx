// src/components/Navbar.tsx
import { Link } from "react-router-dom";

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
  return (
    <nav className="flex gap-4 p-4 bg-gray-200 justify-end">
      <Link to="/" className="hover:text-gray-600 transition duration-300">
        Home
      </Link>

      <Link to="/wishlist"  className="hover:text-gray-600 transition duration-300">
        Wishlist</Link>

        <Link to="/allreviews" className="hover:text-gray-600 transition duration-300">
          All Reviews
        </Link>

      {user ? (
        <button
          onClick={handleSignOut}
          className="hover:text-gray-600 transition duration-300"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={onAuthClick}
          className="hover:text-gray-600 transition duration-300"
        >
          Log In / Sign Up
        </button>
      )}

      <Link
        to="/cart"
        className="hover:text-gray-600 transition duration-300"
      >
        Cart ({cartCount})
      </Link>
    </nav>
  );
}
