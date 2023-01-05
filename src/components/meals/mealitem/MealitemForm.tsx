import classes from "./MealItemForm.module.css";
import Input from "../../ui/Input";
import React, { useRef } from "react";

const MealItemForm: React.FC<{ id: string; onAddToCart: (quantity: number) => void }> = (props) => {
  const inputQuantityRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredQuantity = inputQuantityRef.current!.value;
    const enteredQuantityNumber = +enteredQuantity;
    props.onAddToCart(enteredQuantityNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputQuantityRef}
        label="Quantity"
        id={`quantity${props.id}`}
        type="number"
        min="1"
        max="5"
        step="1"
        defaultValue="1"
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
