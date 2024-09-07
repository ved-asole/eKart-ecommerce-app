import axios from 'axios';

const createCheckoutSession = async (customerId, cartItems) => {
  try {
    await axios.post(
      import.meta.env.VITE_API_URL.concat("payment/create-checkout-session"),
      {
        "customerId": customerId,
        "shoppingCartItems": cartItems.map((item) => {
          return {
            "productId": item.productId,
            "quantity": item.cartQuantity
          }
        })
      }
    ).then((response) => {
      console.log(response.data);
      window.location = response.data;
    }).catch((error) => {
      console.log(error);
    })
  } catch (error) {
    console.error('Error sending cart items to backend:', error);
    throw error;
  }
};

export default createCheckoutSession;