import { Toast, Modal } from 'bootstrap';
import axios from "axios";

export const getFormattedPrice = (price) => {
  return Number(price).toLocaleString('en-IN');
}

export const getFormattedDate = (date) => {
  return date.replaceAll('T', ' ');
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
      console.error(error?.message);
      if (error?.response?.data?.message?.includes("JWT") || error?.response?.message == "Unauthorized" || error?.response?.status == 401) {
        document.cookie = '';
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem('token');
        // window.location.href = "/";
      }
      return Promise.reject(new Error(error));
    }
  );
}

export const showToast = (message) => {
  const toast = document.getElementById('toast-alert');
  toast.getElementsByClassName('toast-body')[0].innerHTML = message;
  const toastBootstrap = Toast.getOrCreateInstance(toast)
  toastBootstrap.show();
}

export const appendAlert = (elementId, message, type, closeButtonRequired) => {
  const alertPlaceholder = document.getElementById(elementId);
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} text-sm" role="alert">`,
    `   <div>${message}</div>`,
    closeButtonRequired ?
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
      : '',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

export const hideModel = (modalId) => {
  const modal = document.getElementById(modalId);
  const modalBootstrap = Modal.getInstance(modal);
  modalBootstrap.hide();
  const modalBackdrops = document.getElementsByClassName('modal-backdrop');
  for (let i = 0; i < modalBackdrops.length; i++) {
    modalBackdrops.item(i).remove();
  }
}