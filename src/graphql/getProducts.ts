import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      title
      price
      description
      images
      category {
        id
        name
        image
      }
    }
  }
`;

// TypeScript types for the query
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export type ProductsData = {
  products: Product[];
};
