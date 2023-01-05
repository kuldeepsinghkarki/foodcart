import React from "react";
import { useDispatch } from "react-redux";

import { cartActions } from "../../../store/cart-slice";

import classes from "./MealItem.module.css";
import MealItemForm from "./MealitemForm";

const Mealitem: React.FC<{ name: string; description: string; id: string; price: number }> = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const dispatch = useDispatch();

  const onAddToCartHandler = (enteredQuantity: number) => {
    console.log("Card handler additon", enteredQuantity);
    dispatch(
      cartActions.addItem({
        id: props.id,
        name: props.name,
        quantity: enteredQuantity,
        price: props.price,
      })
    );
  };

  return (
    <li className={classes.meal}>
      <div>
        <h1>{props.name}</h1>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={onAddToCartHandler} />
      </div>
    </li>
  );
};

export default Mealitem;
