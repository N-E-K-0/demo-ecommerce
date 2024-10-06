import React from "react";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Amazing product! Highly recommend it.",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    comment: "Very good quality, but it took a bit longer to arrive.",
  },
  {
    id: 3,
    name: "Alice Johnson",
    rating: 3,
    comment: "It's okay, but I've seen better for the price.",
  },
];

const ProductReview = () => {
  return (
    <div className="rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Customer Reviews</h2>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id} className="border-b border-gray-300 pb-2">
            <div className="flex justify-between">
              <span className="font-semibold">{review.name}</span>
              <span className="text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductReview;
