import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";
import { useSelector } from "react-redux";
import Notification from "../ui/Notification";

const Meals = (props) => {
  const notification = useSelector((state) => state.ui.notification);
  return (
    <>
      <MealsSummary />
      {notification && (
        <Notification status={notification.status} title={notification.title} message={notification.message} />
      )}
      <AvailableMeals mealsData={props.mealsData} />
    </>
  );
};

export default Meals;
