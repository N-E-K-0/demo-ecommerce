"use client";

import Link from "next/link";

const ThankYouPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
      <p className="text-lg mb-6">
        Your order has been successfully processed.
      </p>
      <Link href="/" passHref>
        <button className="bg-amber-500 text-white py-2 px-4 rounded-md">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default ThankYouPage;
