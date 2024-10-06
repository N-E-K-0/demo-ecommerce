"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { clearCart } from "../../redux/cartSlice";
import ShowImage from "@/components/ShowImage";
import { parseImageUrl } from "@/lib/parseImageUrl";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const totalPrice = items.reduce((total, item) => total + item.price, 0);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order submission
    alert("Order confirmed!");
    router.push("/thank-you");
    dispatch(clearCart());
  };

  console.log("items", items);

  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-white/50 min-h-screen text-center">
      <div className="bg-gray-100/25 border-2 rounded-md shadow-md p-10 m-10 w-[75%]">
        <h1 className="text-3xl font-semibold mb-10">Checkout</h1>
        {items.length === 0 ? (
          <p>Your cart is empty. Add items to the cart before proceeding.</p>
        ) : (
          <div className="flex justify-center items-center divide-x-2 divide-gray-200 space-x-4">
            <div>
              <h3 className="text-lg ">Items</h3>
              <ul>
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex space-x-4 md:space-x-4 justify-between items-center m-2 gap-4"
                  >
                    <div className="flex items-center space-x-4 md:gap-4">
                      <ShowImage
                        // @ts-expect-error:next-line
                        // ignoring this error because the function parseImage has null checker
                        src={parseImageUrl(item.images[0])}
                        alt={item.title || "Product_image"}
                        width={40}
                        height={20}
                      />
                    </div>
                    <h3 className="hidden md:contents">{item.title}</h3>
                    <div className="flex items-center space-x-4">
                      <p>${item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-start m-2 p-2 gap-4"
            >
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="bg-gray-100 p-2"
                />
              </div>
              <div>
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  required
                  className="bg-gray-100 p-2"
                />
              </div>
              <div className="text-lg font-bold">
                {items.length > 0 && <p>Total Price: ${totalPrice}</p>}
              </div>
              <button
                type="submit"
                className="bg-green-500 p-2 border-2 rounded-md text-white"
              >
                Confirm Order
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
