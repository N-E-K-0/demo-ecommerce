import React from "react";

type VariationControlProps = {
  type: string;
  value: string;
  setSelectedValue: () => void;
  variationArray: string[];
};

export default function VariationControl({
  type,
  value,
  setSelectedValue,
  variationArray,
}: VariationControlProps) {
  return (
    <div className="my-4">
      <label htmlFor="size" className="block text-md font-medium">
        {type}:
      </label>
      <select
        id="size"
        value={value}
        onChange={(e) => setSelectedValue(e.target.value)}
        className="rounded-md p-2 border border-gray-300"
      >
        <option value="">Select {type}</option>
        {variationArray.map((variation, index) => (
          <option key={index} value={variation}>
            {variation}
          </option>
        ))}
      </select>
    </div>
  );
}
