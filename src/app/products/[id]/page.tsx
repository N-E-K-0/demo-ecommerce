"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import ProductReview from "../../../components/ProductReview";
import { parseImageUrl } from "../../../lib/parseImageUrl";
import QuantityControl from "@/components/QuantityControl";
import VariationControl from "@/components/VariationControl";
import ShowImage from "@/components/ShowImage";

const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($id: ID!) {
    product(id: $id) {
      id
      title
      description
      price
      images
      category {
        name
      }
    }
  }
`;

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  // Static variations for size and color
  const sizes = ["Small", "Medium", "Large", "X-Large"];
  const colors = ["Red", "Blue", "Green", "Black"];

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data?.product;

  // Get the image URL
  const mainImageUrl = parseImageUrl(product?.images);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select both size and color.");
      return;
    }

    const productWithVariations = {
      ...product,
      selectedSize,
      selectedColor,
    };

    dispatch(addToCart(productWithVariations));
    router.push("/cart");
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent quantity from going below 1
  };

  return (
    <div>
      <div className="flex justify-between m-10">
        <div className="m-10">
          <ShowImage
            src={mainImageUrl}
            alt={product.title}
            width={100}
            height={600}
          />
        </div>
        <div className="m-10">
          <p className="text-sm font-thin my-2">
            Category: {product.category.name}
          </p>
          <h1 className="text-4xl font-semibold my-4">{product.title}</h1>
          <p className="text-md font-normal my-2">{product.description}</p>
          <p className="text-4xl font-bold mt-4"> ${product.price}</p>

          {/* Product Variations */}
          <div className="flex items-end space-x-10 my-2 font-normal">
            <VariationControl
              type="Size"
              value={selectedSize}
              setSelectedValue={setSelectedSize}
              variationArray={sizes}
            />

            <VariationControl
              type="Color"
              value={selectedColor}
              setSelectedValue={setSelectedColor}
              variationArray={colors}
            />

            <QuantityControl
              quantity={quantity}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
            />
          </div>

          <div className="my-4 text-white">
            <button
              onClick={handleAddToCart}
              className="rounded-md bg-orange-400 p-3 w-[200px]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <ProductReview />
    </div>
  );
}
