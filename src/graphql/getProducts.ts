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

export type Product = {
  id: string;
  title?: string;
  description?: string;
  images?: string[] | null;
  name: string;
  price: number;
  image: string;
  category: {
    id: string;
    name: string;
    image: string;
  };
};

export type ProductsData = {
  products: Product[];
};
