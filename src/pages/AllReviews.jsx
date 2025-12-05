import { useState, useEffect } from "react";
import { firestore } from "../firebase/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterProduct, setFilterProduct] = useState("");
  const [sortOption, setSortOption] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(firestore, "reviews"),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(data);
    } catch (error) {
      console.log("something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading)
    return (
      <p className="text-xl text-center font-bold mt-10">
        {" "}
        loading review, Please Wait...
      </p>
    );

  if (reviews.length === 0)
    return <p className="text-center mt-10"> No Reviews Yet...</p>;

  return (
    <div className="max-w-screen-xl mx-auto p-4 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex gap-4 mb-4">
        <select
          value={filterProduct}
          onChange={(e) => setFilterProduct(e.target.value)}
        >
          <option value="All">All Products</option>
          {[...new Set(reviews.map((r) => r.productName))].map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="newest"> newest First </option>
          <option value="oldest"> oldest First </option>
          <option value="highest"> highest First </option>
          <option value="lowest"> lowest First </option>
        </select>
      </div>

      {reviews.map((review) => (
        <motion.div
          key={review.id}
          className="border p-4 rounded-lg shadow-md bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-semibold text-xl">{review.productName}</h2>
          <h2 className="font-semibold mt-2 text-yellow-500">
            Rating: ⭐ {review.rating}
          </h2>
          <h2 className="text-lg">{review.review}</h2>
          {review.userName && (
            <p className="mt-1 text-sm text-gray-500">
              {" "}
              By: {review.userName}{" "}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default AllReviews;
