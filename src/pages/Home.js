//import "./App.css";
import Header from "../components/layout/Header";
import Meals from "../components/meals/Meals";
import Cart from "../components/cart/Cart";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData, fetchCartData } from "../store/cart-actions";
import { fetchAvailableMeals } from "../utils/DataUtils";
import { Await, defer, useLoaderData } from "react-router-dom";

let isInitial = true;

function Home() {
  const mealsDataLoader = useLoaderData();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      <div>
        <Header className={"header"} />
        {cartIsVisible && <Cart />}
        <main>
          <Suspense fallback={<p>Loading Meals Data...</p>}>
            <Await resolve={mealsDataLoader.meals} errorElement={<p>Meals Data fetch failed</p>}>
              {(loadedMeals) => <Meals mealsData={loadedMeals} />}
            </Await>
          </Suspense>
        </main>
      </div>
    </>
  );
}

export default Home;

export async function mealsLoader() {
  return defer({ meals: fetchAvailableMeals() });
}
