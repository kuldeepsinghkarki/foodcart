import classes from "./Header.module.css";
import mealsImg from "../../assets/meals.jpeg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h2>Karki Online Sweets Cart</h2>

        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>{<img src={mealsImg} alt="A table full of delicious food!" />}</div>
    </>
  );
};

export default Header;
