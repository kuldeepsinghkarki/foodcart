import classes from "./HeaderCartButton.module.css";
import CartIcon from "../cart/CartIcon";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const HeaderCarButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const dispatch = useDispatch();

  const cartSlice = useSelector((state) => state.cart);
  let allItemsQuantity = cartSlice.items.reduce((val, item) => {
    return val + item.quantity;
  }, 0);
  const fullAmount = `$${cartSlice.totalAmount.toFixed(2)}`;
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;
  const { items } = cartSlice;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const showCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button className={btnClasses} onClick={showCartHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{allItemsQuantity}</span>
      <span>Value</span>
      <span className={classes.badge}>{fullAmount}</span>
    </button>
  );
};

export default HeaderCarButton;
