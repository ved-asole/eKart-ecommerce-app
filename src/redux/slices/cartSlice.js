import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalPrice: 0,
  cartTotalDiscount: 0,
  cartFinalAmount: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.productId === action.payload.productId)
      if (itemIndex >= 0) state.cartItems[itemIndex].countToAddInCart += action.payload.countToAddInCart;
      else {
        const tempCartItem = { ...action.payload, cartQuantity: action.payload.countToAddInCart };
        state.cartItems.push(tempCartItem);
      }
      state.cartTotalQuantity += action.payload.countToAddInCart;
      state.cartTotalPrice += action.payload.price * action.payload.countToAddInCart;
      state.cartTotalDiscount += action.payload.price * action.payload.discount / 100 * action.payload.countToAddInCart;
      state.cartFinalAmount += action.payload.price * (1 - action.payload.discount / 100) * action.payload.countToAddInCart;
    },
    updateCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.productId === action.payload.productId)
      const cartQuantityDiff = action.payload.cartQuantity - state.cartItems[itemIndex].cartQuantity;
      if (itemIndex >= 0) state.cartItems[itemIndex].cartQuantity += cartQuantityDiff;
      state.cartTotalQuantity += cartQuantityDiff;
      state.cartTotalPrice += action.payload.price * cartQuantityDiff;
      state.cartTotalDiscount += action.payload.price * action.payload.discount / 100 * cartQuantityDiff;
      state.cartFinalAmount += action.payload.price * (1 - action.payload.discount / 100) * cartQuantityDiff;
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.productId === action.payload.productId)

      if (itemIndex >= 0) {
        let cartItem = state.cartItems[itemIndex];
        state.cartTotalQuantity = state.cartTotalQuantity - cartItem.cartQuantity;
        state.cartTotalPrice -= cartItem.price * cartItem.cartQuantity;
        state.cartTotalDiscount -= action.payload.price * action.payload.discount / 100 * cartItem.cartQuantity;
        state.cartFinalAmount -= action.payload.price * (1 - action.payload.discount / 100) * cartItem.cartQuantity;
        state.cartItems.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalPrice = 0;
      state.cartTotalDiscount = 0;
      state.cartFinalAmount = 0;
    }
  }
})

export const { addToCart, updateCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;