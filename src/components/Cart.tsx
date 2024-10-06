"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart, clearCart } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {items.length > 0 && <button onClick={handleClear}>Clear Cart</button>}
    </div>
  );
};

export default Cart;
