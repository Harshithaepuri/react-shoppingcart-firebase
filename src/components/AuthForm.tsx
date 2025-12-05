import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthForm({ setUser, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      const userCredential = isSignUp
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isSignUp ? "Create Account" : "Welcome Back"}
      </h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleAuth}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition mb-3"
      >
        {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Log In"}
      </button>
      <p
        className="text-center text-blue-600 cursor-pointer"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
}
