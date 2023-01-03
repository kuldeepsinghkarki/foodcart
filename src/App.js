import "./App.css";

import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Offers from "./pages/Offers";
import OfferDetails from "./components/offers/OfferDetails";
import { offerDetailsLoader } from "./components/offers/OfferDetails";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/Error";
import { mealsLoader } from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route index element={<AuthPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/home" element={isLoggedIn && <Home />} loader={mealsLoader} />
        <Route path="/offers" element={isLoggedIn && <Offers />}>
          <Route path=":offer" element={<OfferDetails />} loader={offerDetailsLoader} />
        </Route>
        <Route path="*" element={<h1>No Matching Path Found</h1>} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
