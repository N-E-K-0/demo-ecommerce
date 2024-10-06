import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../graphql/getProducts";

type ProductState = {
  products: Product[];
};

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
