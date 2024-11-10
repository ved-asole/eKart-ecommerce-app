import { createSlice } from "@reduxjs/toolkit"
import fetchData, { deleteData, postData, updateData } from "../../util/DataFetcher";
import { showToast } from "../../util/appUtil";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalPrice: 0,
  cartTotalDiscount: 0,
  cartFinalAmount: 0,
  cartId: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getPreviousCart: (state) => {
      state.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      state.cartTotalQuantity = Number(localStorage.getItem('cartTotalQuantity') || 0);
      state.cartTotalPrice = Number(localStorage.getItem('cartTotalPrice') || 0);
      state.cartTotalDiscount = Number(localStorage.getItem('cartTotalDiscount') || 0);
      state.cartFinalAmount = Number(localStorage.getItem('cartFinalAmount') || 0);
      state.cartId = Number(localStorage.getItem('cartId') || 0);
    },
    addToCart: (state, action) => {
      const product = action.payload.product;
      const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.product.productId === action.payload.product.productId)
      const cartItem = state.cartItems[itemIndex];
      const cartQuantity = action.payload.quantity ? action.payload.quantity : action.payload.countToAddInCart;
      delete action.payload.countToAddInCart;
      if (itemIndex >= 0) cartItem.quantity += cartQuantity;
      else {
        const tempCartItem = { ...action.payload, quantity: cartQuantity };
        state.cartItems.push(tempCartItem);
      }
      state.cartTotalQuantity += cartQuantity;
      state.cartTotalPrice += product.price * cartQuantity;
      state.cartTotalDiscount += product.price * product.discount / 100 * cartQuantity;
      state.cartFinalAmount += product.price * (1 - product.discount / 100) * cartQuantity;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('cartTotalQuantity', state.cartTotalQuantity);
      localStorage.setItem('cartTotalPrice', state.cartTotalPrice);
      localStorage.setItem('cartTotalDiscount', state.cartTotalDiscount);
      localStorage.setItem('cartFinalAmount', state.cartFinalAmount);

    },
    updateCart: (state, action) => {
      const product = action.payload.product;
      const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.product.productId === action.payload.product.productId)
      const cartItem = state.cartItems[itemIndex];
      const cartQuantityDiff = action.payload.quantity - cartItem.quantity;
      if (itemIndex >= 0) state.cartItems[itemIndex].quantity += cartQuantityDiff;
      state.cartTotalQuantity += cartQuantityDiff;
      state.cartTotalPrice += product.price * cartQuantityDiff;
      state.cartTotalDiscount += product.price * product.discount / 100 * cartQuantityDiff;
      state.cartFinalAmount += product.price * (1 - product.discount / 100) * cartQuantityDiff;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('cartTotalQuantity', state.cartTotalQuantity);
      localStorage.setItem('cartTotalPrice', state.cartTotalPrice);
      localStorage.setItem('cartTotalDiscount', state.cartTotalDiscount);
      localStorage.setItem('cartFinalAmount', state.cartFinalAmount);
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.product.productId === action.payload)

      if (itemIndex >= 0) {
        let cartItem = state.cartItems[itemIndex];
        let product = cartItem.product;
        state.cartTotalQuantity = state.cartTotalQuantity - cartItem.quantity;
        state.cartTotalPrice -= product.price * cartItem.quantity;
        state.cartTotalDiscount -= product.price * product.discount / 100 * cartItem.quantity;
        state.cartFinalAmount -= product.price * (1 - product.discount / 100) * cartItem.quantity;
        state.cartItems.splice(itemIndex, 1);
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        localStorage.setItem('cartTotalQuantity', state.cartTotalQuantity);
        localStorage.setItem('cartTotalPrice', state.cartTotalPrice);
        localStorage.setItem('cartTotalDiscount', state.cartTotalDiscount);
        localStorage.setItem('cartFinalAmount', state.cartFinalAmount);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalPrice = 0;
      state.cartTotalDiscount = 0;
      state.cartFinalAmount = 0;

      if (!document.cookie.includes('customerId')) localStorage.removeItem('cartId');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartTotalQuantity');
      localStorage.removeItem('cartTotalPrice');
      localStorage.removeItem('cartTotalDiscount');
      localStorage.removeItem('cartFinalAmount');
    }
  }
})

export const fetchPreviousCart = (dispatch) => {
  if (document.cookie.includes('customerId')
    // || localStorage.getItem('cartId')
  ) {
    const customerId = document.cookie.split(';').find(cookie => cookie.includes('customerId'))?.split('=')?.[1];
    fetchData(
      `shopping-cart/customer/${customerId}`,
      (data) => {
        const cartItemJson = JSON.stringify(data.shoppingCartItems);
        localStorage.setItem('cartId', data.cartId);
        localStorage.setItem('cartItems', cartItemJson);
        let cartTotalQuantity = 0;
        JSON.parse(cartItemJson).forEach(cartItem => {
          cartTotalQuantity += cartItem.quantity;
        });
        localStorage.setItem('cartTotalQuantity', cartTotalQuantity);
        localStorage.setItem('cartTotalPrice', Number(data.total));
        localStorage.setItem('cartTotalDiscount', Number(data.discount));
        localStorage.setItem('cartFinalAmount', Number(data.total - data.discount));
        // }
        dispatch(getPreviousCart());
      },
      (error) => {
        dispatch(clearCart(error));
      }
    )
  } else {
    dispatch(getPreviousCart());
  }
}

export const addItemToCart = (dispatch, product, quantity) => {
  if (document.cookie.includes('customerId')) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));
    let cartItem;
    if (cartItems && cartItems.length != 0) {
      cartItem = cartItems.filter(cartItem =>
        cartItem.product.productId === product.productId
      )[0];
    }
    if (cartItem != undefined) {
      cartItem.quantity += quantity;
      updateItemInCart(dispatch, cartItem);
      return;
    } else {
      postData(
        `shopping-cart/${localStorage.getItem('cartId')}/items`,
        {
          "product": product,
          "quantity": quantity,
          "cartId": localStorage.getItem('cartId')
        },
        (data) => {
          dispatch(addToCart(data));
        },
        (error) => {
          console.log(error);
        }
      )
    }
  } else {
    dispatch(addToCart({ product, quantity }));
  }
  showToast("Item added to cart");
  fetchPreviousCart(dispatch);
}

export const updateItemInCart = (dispatch, cartItem) => {
  if (document.cookie.includes('customerId')) {
    updateData(
      `shopping-cart/${localStorage.getItem('cartId')}/items`,
      { ...cartItem, cartId: localStorage.getItem('cartId') },
      (data) => {
        dispatch(updateCart(data));
      },
      (error) => {
        console.log(error);
      }
    )
  } else {
    dispatch(updateCart(cartItem));
  }
  showToast("Cart Updated");
  fetchPreviousCart(dispatch);
}

export const processRemoveFromCart = (dispatch, cartItem) => {
  if (document.cookie.includes('customerId')
    // || localStorage.getItem('cartId')
  ) {
    deleteData(
      `shopping-cart/${localStorage.getItem('cartId')}/items/${cartItem.cartItemId}`,
      (data) => {
        dispatch(removeFromCart(cartItem.product.productId));
      },
      (error) => {
        console.log(error);
      }
    )
  } else {
    dispatch(removeFromCart(cartItem.product.productId));
  }
  showToast("Item removed successfully");
  fetchPreviousCart(dispatch);
}

export const clearAllItemsFromCart = (dispatch) => {
  if (document.cookie.includes('customerId')
  ) {
    deleteData(
      `shopping-cart/${localStorage.getItem('cartId')}/items`,
      () => {
        dispatch(clearCart());
      },
      (error) => {
        console.log(error);
      }
    )
  } else {
    dispatch(clearCart());
  }
}

export const { getPreviousCart, addToCart, updateCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;