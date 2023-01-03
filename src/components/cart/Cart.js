import classes from "./Cart.module.css";
import Modal from "../layout/Modal";

import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { uiActions } from "../../store/ui-slice";
import { useState } from "react";
import Checkout from "./Checkout";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartItemsList = useSelector((state) => state.cart.items);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const [isCheckout, setIsCheckout] = useState(false);

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItem({ ...item, quantity: 1 }));
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartItemsList.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const hasItems = cartItemsList.length > 0;
  const totalAmount = `$${cartTotalAmount.toFixed(2)}`;

  const closeCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const onCancelHandler = () => {
    setIsCheckout(false);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={closeCartHandler}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={closeCartHandler}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={onCancelHandler} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
