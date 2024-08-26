import * as bootstrap from 'bootstrap';

export const getFormattedPrice = (price) => {
  return Number(price).toLocaleString('en-IN');
}

export const showToast = (message) => {
  const toast = document.getElementById('toast-alert');
  toast.getElementsByClassName('toast-body')[0].innerHTML = message;
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)
  toastBootstrap.show();
}