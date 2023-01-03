import Card from "../ui/Card";
import classes from "./AvailableMeals.module.css";
import Mealitem from "./mealitem/MealItem";

const AvailableMeals = (props) => {
  const meals = props.mealsData;

  const mealsList = meals.map((meal) => {
    return <Mealitem key={meal.id} id={meal.id} name={meal.name} price={meal.price} description={meal.description} />;
  });
  return (
    <section className={classes.mealsList}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
