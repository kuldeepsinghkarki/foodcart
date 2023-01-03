import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmOrder } from "../../store/cart-actions";
import { cartActions } from "../../store/cart-slice";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSxChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const nameRef = useRef();
  const streetRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostalCode = postalCodeRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isSxChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    dispatch(
      cartActions.addShippingInfo({
        name: enteredName,
        postalCode: enteredPostalCode,
        street: enteredStreet,
        city: enteredCity,
      })
    );
    dispatch(confirmOrder(cart));
  };

  const nameControlClasses = `${classes.control} ${formInputsValidity.name ? "" : classes.invalid}`;
  const streetControlClasses = `${classes.control} ${formInputsValidity.street ? "" : classes.invalid}`;
  const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? "" : classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formInputsValidity.city ? "" : classes.invalid}`;

  return (
    <>
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameRef} />
          {!formInputsValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetRef} />
          {!formInputsValidity.street && <p>Please enter a valid street!</p>}
        </div>
        <div className={postalCodeControlClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={postalCodeRef} />
          {!formInputsValidity.postalCode && <p>Please enter a valid Postal Code!</p>}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityRef} />
          {!formInputsValidity.city && <p>Please enter a valid city!</p>}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    </>
  );
};

export default Checkout;
