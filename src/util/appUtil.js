import * as bootstrap from 'bootstrap';
import axios from "axios";

export const getFormattedPrice = (price) => {
  return Number(price).toLocaleString('en-IN');
}

export const setAxiosInterceptors = (setIsLoading) => {
  axios.interceptors.request.use(
    config => {
      // setIsLoading(true);
      const xsrfToken = document.cookie.split(';').find(cookie => cookie.includes('XSRF-TOKEN'))?.split('=')?.[1];
      config.headers.set('X-XSRF-TOKEN', xsrfToken);
      axios.defaults.headers.common['X-XSRF-TOKEN'] = xsrfToken;
      if (localStorage.getItem('token') != undefined) {
        const authToken = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    error => {
      // setIsLoading(false);
      return Promise.reject(new Error(error));
    }
  );
  axios.interceptors.response.use(
    response => {
      // setIsLoading(false);
      return response;
    },
    error => {
      console.error(error);
      console.error(error.message);
      if (error?.response?.data?.message?.includes("JWT") || error?.response?.message == "Unauthorized" || error?.response?.status == 401) {
        document.cookie = '';
        delete axios.defaults.headers.common["Authorization"];
        // window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );
}

export const showToast = (message) => {
  const toast = document.getElementById('toast-alert');
  toast.getElementsByClassName('toast-body')[0].innerHTML = message;
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)
  toastBootstrap.show();
}