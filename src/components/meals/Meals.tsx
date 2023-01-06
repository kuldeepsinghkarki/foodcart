import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";
import { useSelector } from "react-redux";
import Notification from "../ui/Notification";
import { PropsWithChildren } from "react";
import { MealsDataType } from "../models/MealsDataType";
import { RootState } from "../../store/app-store";

const Meals = (props: PropsWithChildren<{ mealsData: MealsDataType }>) => {
  const notification = useSelector((state: RootState) => state.ui.notification);
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
