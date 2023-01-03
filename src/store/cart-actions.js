import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

const backendURL = process.env.REACT_APP_DB_HOST + process.env.REACT_APP_CART_NAME;

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(backendURL);
      if (!response.ok) {
        console.log("got exception");
        throw new Error("Sending cart data failed.");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalAmount: cartData.totalAmount || 0,
        })
      );
    } catch (error) {
      uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Fetching cart data failed!",
      });
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(backendURL, {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        console.log("got exception");
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (exception) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const confirmOrder = (cart) => {
  return async (dispatch) => {
    const response = await fetch(backendURL, {
      method: "POST",
      body: JSON.stringify(cart),
    });

    if (!response.ok) {
      console.log("Got eeror in confirm order");
      uiActions.showNotification({
        status: "error",
        title: "Failed to confirm order!",
        message: "Failed to confirm order!",
      });
    }
  };
};
