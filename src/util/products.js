import { showToast } from './appUtil.js';
import { postData } from "./DataFetcher.js";

export const addProduct = (data) => {
  postData(
    `products`,
    data,
    (data) => {
      showToast("Product added successfully");
      window.location.href = `/products/${data.productId}`;
      return true;
    },
    (error) => {
      console.log(error);
      return false;
    }
  )
}