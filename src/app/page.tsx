"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRODUCTS, ProductsData } from "../graphql/getProducts";
import { addToCart } from "../redux/cartSlice";
import { RootState } from "../redux/store";
import cart_image from "../../public/assets/shopping-cart.png";
import ShowImage from "@/components/ShowImage";
import { Product } from "../graphql/getProducts";

type Category = {
  id: string;
  name: string;
};

export default function Home() {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery<ProductsData>(GET_PRODUCTS);

  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Memoized unique categories
  const uniqueCategories = useMemo(() => {
    return data?.products.reduce((acc: Category[], product: Product) => {
      if (!acc.some((item) => item.name === product.category.name)) {
        acc.push({ id: product.category.id, name: product.category.name });
      }
      return acc;
    }, [] as Category[]);
  }, [data?.products]);

  // Memoized product filtering and sorting
  const filteredProducts = useMemo(() => {
    if (!data) return [];

    let products = [...data.products];

    // Apply category filtering
    if (selectedCategory) {
      products = products.filter(
        (product) => product.category.name === selectedCategory
      );
    }

    // Apply sorting
    if (sortBy === "price-low-high") {
      products = products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      products = products.sort((a, b) => b.price - a.price);
    }

    return products;
  }, [data, selectedCategory, sortBy]);

  // Memoized callback for adding products to the cart
  const handleAddToCart = useCallback(
    (product: Product) => {
      const itemInCart = cartItems.find((item) => item.id === product.id);

      if (itemInCart) {
        alert("This item is already in your cart.");
      } else {
        dispatch(addToCart(product));
        alert("Product added to your cart!");
      }
    },
    [dispatch, cartItems]
  );

  if (loading)
    return <p className="flex justify-center items-center">Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="font-semibold text-4xl my-6">Products</h1>

      {/* Sorting and Filtering Controls */}
      <div className="flex md:justify-end text-right space-x-4 mb-6">
        {/* Sorting */}
        <div className="flex flex-col items-start">
          <label htmlFor="sortBy">Sort By: </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-2 border-gray-300	rounded-md"
          >
            <option value="">Select</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col items-start">
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border-2 border-gray-300	rounded-md"
          >
            <option value="">All Categories</option>
            {uniqueCategories?.map((category: Category) => (
              <option key={category?.id} value={category?.name}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Listing */}
      <ul className="grid grid-col-2 gap-4 md:grid-cols-4 md:gap-x-6 md:gap-y-6 rounded-md">
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <ShowImage
                src={product.category?.image}
                alt={product.title || "Product_image"}
                width={350}
                height={150}
              />
            </Link>

            <div className="mx-2">
              <h2 className="text-base md:text-sm font-bold">
                {product.title}
              </h2>
              <div className="flex justify-between items-center">
                <p className="text-base md:text-sm text-gray-700">
                  ${product.price}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex justify-end bg-gray-100 rounded-lg p-2 hover:bg-[#FFC830]"
                >
                  <ShowImage
                    src={cart_image}
                    alt="shopping_cart"
                    width={16}
                    height={10}
                  />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
