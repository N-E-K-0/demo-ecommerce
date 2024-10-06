import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../graphql/getProducts";

type CartState = {
  items: Product[];
};

// Only run in browser
const getInitialCartState = (): CartState => {
  if (typeof window !== "undefined") {
    const storedItems = localStorage.getItem("cartItems");
    return {
      items: storedItems ? JSON.parse(storedItems) : [],
    };
  }
  // Return default initial state if not in the browser
  return {
    items: [],
  };
};

const initialState: CartState = getInitialCartState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      // Ensure localStorage access is only in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // Ensure localStorage access is only in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      // Ensure localStorage access is only in the browser
      if (typeof window !== "undefined") {
        localStorage.removeItem("cartItems");
      }
    },
    loadCartFromLocalStorage: (state) => {
      if (typeof window !== "undefined") {
        const storedItems = localStorage.getItem("cartItems");
        if (storedItems) {
          state.items = JSON.parse(storedItems);
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  loadCartFromLocalStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
