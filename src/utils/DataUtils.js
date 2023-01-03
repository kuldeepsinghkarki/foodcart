import { useContext } from "react";
import AuthContext from "../store/auth-context";

const backendURL = process.env.REACT_APP_DB_HOST + process.env.REACT_APP_MEALS;

/**
 *
 * @param {*} url
 * @param {*} id
 * @returns
 */
export async function fetchDataByParams(url, id) {
  console.log("inside datautils");
  let response = await fetch(url);
  if (!response.ok) {
    console.log("Got Exception ");
    throw { message: `Failed to fetch data from ${url}` };
  }
  let offerDetails = await response.json();
  let myofferDetails = offerDetails[id];
  return myofferDetails;
}

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

/**
 *
 * @returns
 */
export async function fetchAvailableMeals() {
  // await timeout(2000);

  const response = await fetch(backendURL);
  if (!response.ok) {
    console.log("got exception");
    throw new Error("Fetching Meals data failed.");
  }
  const availableMeals = await response.json();
  let loadedMeals = [];
  console.log("before load", availableMeals);
  for (const key in availableMeals) {
    loadedMeals.push({
      id: key,
      name: availableMeals[key].name,
      price: availableMeals[key].price,
      description: availableMeals[key].description,
    });
  }
  return loadedMeals;
}
