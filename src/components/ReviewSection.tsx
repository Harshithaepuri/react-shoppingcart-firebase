"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebaseConfig";

const ReviewSection = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  // Temporary user (replace later with real auth)
  const user = { uid: "123", name: "Guest User" };

  // Fetch reviews for this product
  const fetchReviews = async () => {
    const q = query(
      collection(firestore, "reviews"),
      where("productId", "==", productId)
    );
    const querySnapshot = await getDocs(q);
    const reviewList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReviews(reviewList);
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async () => {
    if (!review || rating === 0)
      return alert("Please enter a review and select a rating");

    await addDoc(collection(firestore, "reviews"), {
      productId,
      userId: user.uid,
      userName: user.name,
      review,
      rating,
      createdAt: new Date(),
      productName,
    });

    setReview("");
    setRating(0);
    fetchReviews();
  };

  return (
    <div className="p-4 border rounded-lg bg-white mt-6">
      <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-2xl ${
              rating >= star ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Review
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="border-b py-2">
              <p className="font-semibold">{r.userName}</p>
              <p className="text-yellow-500">{`★`.repeat(r.rating)}</p>
              <p>{r.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
