import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../graphql/getProducts";

type CartState = {
  items: Product[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
    loadCartFromLocalStorage: (state) => {
      const storedItems = localStorage.getItem("cartItems");
      if (storedItems) {
        state.items = JSON.parse(storedItems);
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
