import React from "react";
import classes from "./Input.module.css";

export type InputProps = {
  label: string;
  id: string;
  type: string;
  min: string;
  max: string;
  step: string;
  defaultValue: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input ref={ref} {...props}></input>
    </div>
  );
});

export default Input;
