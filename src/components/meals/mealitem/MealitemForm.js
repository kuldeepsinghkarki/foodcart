import classes from "./MealItemForm.module.css";
import Input from "../../ui/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const inputQuantityRef = useRef();
  const [quantityIsValid, setQuantityIsValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredQuantity = inputQuantityRef.current.value;
    const enteredQuantityNumber = +enteredQuantity;
    if (enteredQuantity.trim().length === 0 || enteredQuantityNumber < 1 || enteredQuantityNumber > 5) {
      setQuantityIsValid(false);
      return;
    }
    setQuantityIsValid(false);
    console.log("Amoint is ", inputQuantityRef.current.value);
    props.onAddToCart(enteredQuantityNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Quantity"
        ref={inputQuantityRef}
        input={{
          id: "quantity" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
