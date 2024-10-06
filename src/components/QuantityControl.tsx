import React from "react";

type QuantityControlProps = {
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
};

export default function QuantityControl({
  quantity,
  decreaseQuantity,
  increaseQuantity,
}: QuantityControlProps) {
  return (
    <div className="flex items-center space-x-4 my-4">
      <label htmlFor="quantity" className="block text-md font-medium">
        Quantity:
      </label>
      <div className="flex items-center">
        <button
          onClick={decreaseQuantity}
          className="border-gray-300 rounded-l-md p-2 bg-gray-100"
        >
          -
        </button>
        <input
          type="number"
          id="quantity"
          value={quantity}
          readOnly
          className="text-center border border-gray-200 w-16 h-10"
        />
        <button
          onClick={increaseQuantity}
          className="border-gray-300 rounded-r-md p-2 bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  );
}
