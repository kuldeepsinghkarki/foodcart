import { createSlice } from "@reduxjs/toolkit";

type ShippingInfo = {
  name: string;
  street: string;
  postalCode: string;
  city: string;
};

type Meal = {
  id: string;
  price: number;
  quantity: number;
  totalPrice: number;
  name: string;
};
export type CartState = {
  items: Meal[];
  shippingInfo: ShippingInfo;
  totalAmount: number;
  totalQuantity: number;
  changed: boolean;
};

const initialCartState = {
  items: [],
  shippingInfo: { name: "", street: "", postalCode: "", city: "" },
  totalAmount: 0,
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state: CartState, action) {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
      state.changed = false;
    },

    addItem(state: CartState, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price * newItem.quantity,
          name: newItem.name,
        });
      } else {
        existingItem.quantity = existingItem.quantity + newItem.quantity;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      state.totalAmount = state.totalAmount + newItem.price * newItem.quantity;
      state.changed = true;
    },

    removeItem(state: CartState, action) {
      const id = action.payload;
      const existingItem: Meal = state.items.find((item) => item.id === id)!;
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
      state.totalAmount = state.totalAmount - existingItem.price;
      state.changed = true;
    },

    addShippingInfo(state, action) {
      state.shippingInfo.city = action.payload.city;
      state.shippingInfo.name = action.payload.name;
      state.shippingInfo.street = action.payload.street;
      state.shippingInfo.postalCode = action.payload.postalCode;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
