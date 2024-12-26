import axios from "axios";
import { showToast } from "./appUtil.js";
import { clearCart, fetchPreviousCart } from "../redux/slices/cartSlice.js";

export const processSignUp = (data, setCookie, navigate, reset) => {
  axios.post(
    import.meta.env.VITE_API_URL.concat("customers"),
    {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      role: "USER"
    },
    {
      headers: { 'Authorization': '' }
    }
  )
    .then((response) => {
      const token = response.headers.getAuthorization().replace('Bearer ', '');
      setCookie('token', token, { httpOnly: true });
      setCookie('customerId', response.data.customerId);
      setCookie('username', response.data.firstName + " " + response.data.lastName);
      setCookie('role', response.data.role);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('token', token);
      localStorage.setItem('cartId', response.data.shoppingCart.cartId);
      showToast("Signed in successfully");
      navigate('/');
    })
    .catch((error) => {
      reset({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      })
      console.error(error);
      showToast("Error in signing up");
    });
}

export const processSignIn = (data, setCookie, navigate, reset, dispatch) => {
  axios.post(
    import.meta.env.VITE_API_URL.concat("auth/authenticate"),
    {
      email: data.email,
      password: data.password
    },
    {
      headers: {
        Authorization: ''
      }
    }
  )
    .then((response) => {
      const token = response.headers.getAuthorization().replace('Bearer ', '');
      setCookie('customerId', response.data.customerId);
      setCookie('username', response.data.firstName + " " + response.data.lastName);
      setCookie('role', response.data.role);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('token', token);
      localStorage.setItem('cartId', response.data.cartId);
      showToast("Logged In");
      fetchPreviousCart(dispatch);
      navigate('/');
    })
    .catch((error) => {
      console.error(error);
      console.error(error?.response?.data?.message);
      showToast("Invalid Credentials");
      reset({
        email: '',
        password: ''
      })
    }
    );
}

export const processLogout = (removeCookie, navigate, dispatch) => {
  dispatch(clearCart());
  removeUserData(removeCookie);
  showToast("Logged out successfully");
  navigate('/');
}

export const checkAuthentication = (removeCookie, navigate) => {
  //Making api call to check if token is valid
  axios.get(import.meta.env.VITE_API_URL.concat("auth/check-token"))
    .then((response) => {
      console.log(response.data);
      showToast("Welcome back");
      navigate('/');
    })
    .catch(() => {
      removeUserData(removeCookie);
    })
}

export const removeUserData = (removeCookie) => {
  axios.defaults.headers.common.Authorization = '';
  localStorage.clear();
  document.cookie = [];
  removeCookie('username');
  removeCookie('customerId');
  removeCookie('role');
}