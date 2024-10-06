"use client";

import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromCart, clearCart } from "../../redux/cartSlice";
import { useRouter } from "next/navigation";
import { loadCartFromLocalStorage } from "../../redux/cartSlice";
import ShowImage from "@/components/ShowImage";
import { parseImageUrl } from "@/lib/parseImageUrl";
import { Product } from "../../graphql/getProducts";

type Items = Product & {
  selectedColor?: string;
  selectedSize?: string;
};

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const items: Items[] = useSelector((state: RootState) => state.cart.items);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  useEffect(() => {
    dispatch(loadCartFromLocalStorage());
  }, [dispatch]);

  const handleRemove = useCallback(
    (id: string) => {
      dispatch(removeFromCart(id));
    },
    [dispatch]
  );

  const handleClear = () => {
    dispatch(clearCart());
  };

  // Memoize total price calculation
  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + item.price, 0);
  }, [items]);

  const handleProceedToCheckout = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/auth/login");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-white/50 min-h-screen text-center">
      <div className="bg-gray-100/25 border-2 rounded-md shadow-md p-10 m-10 w-[75%]">
        <h1 className="text-2xl font-semibold mb-10">Shopping Cart</h1>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex space-x-4 md:space-x-4  justify-between items-center m-2"
                >
                  <div className="flex items-center space-x-4 md:gap-4">
                    <ShowImage
                      // @ts-expect-error:next-line
                      // ignoring this error because the function parseImage has null checker
                      src={parseImageUrl(item?.images[0])}
                      alt={item.title || "Product_image"}
                      width={40}
                      height={20}
                      className="rounded-md"
                    />
                    <h3 className="hidden md:contents">{item.title}</h3>
                    <h3 className="hidden md:contents">
                      ({item.selectedColor})
                    </h3>
                    <h3 className="hidden md:contents">
                      ({item.selectedSize})
                    </h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p>${item.price}</p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-sm rounded-md text-red-600 font-bold px-2 py-1"
                    >
                      x
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="flex justify-end font-bold text-lg m-2 pe-10">
              Total: ${totalPrice}
            </p>
            <div className="flex flex-col md:flex-row justify-end items-center mt-5 space-x-4 gap-4">
              <button
                onClick={handleClear}
                className="text-lg rounded-md bg-red-400 px-3 py-2 text-white"
              >
                Clear Cart
              </button>
              <button
                onClick={handleProceedToCheckout}
                className="text-lg rounded-md bg-amber-500 px-3 py-2 text-white"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
