import axios from "axios";
import { BASE_APP_JSON_URL, JSON_EXTENSION } from "./commonConstants";

axios.defaults.withCredentials = true;
axios.defaults.proxy = {
  protocol: 'http',
  host: import.meta.env.VITE_API_URL,
  port: 8000
}

export const fetchData = (path, successFunction, failureFunction, arrayName) => {
  const fetchFromApi = import.meta.env.VITE_FETCH_API_DATA;
  if (fetchFromApi) {
    let fetchFunction = arrayName ? fetchMultipleApiData : fetchApiData;
    return fetchFunction(path, successFunction, failureFunction, arrayName);
  } else {
    return fetchLocalData(path, successFunction, failureFunction);
  }
}

const fetchApiData = async (path, successFunction, failureFunction) => {
  let url = import.meta.env.VITE_API_URL.concat(path);
  let retryCount = 0;
  let errorMessage = '';
  while (retryCount <= 2) {
    try {
      const response = await axios.get(url);
      successFunction(response.data);
      return true;
    } catch (error) {
      errorMessage = error.message;
      retryCount++;
      await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second before retrying
    }
  }
  failureFunction(errorMessage);
  return false;
}

const fetchMultipleApiData = async (path, successFunction, failureFunction, arrayName) => {
  let url = import.meta.env.VITE_API_URL.concat(path);

  let retryCount = 0;
  let errorMessage = '';
  while (retryCount <= 2) {
    try {
      const response = await axios.get(url);
      successFunction(response.data._embedded[arrayName]);
      return true;
    } catch (error) {
      errorMessage = error.message;
      retryCount++;
      await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second before retrying
    }
  }
  failureFunction(errorMessage);
  return false;
}

export const fetchLocalData = async (path, successFunction, failureFunction) => {
  try {
    let url = BASE_APP_JSON_URL.concat(path).concat(JSON_EXTENSION)
    const response = await axios.get(url);
    successFunction(response.data)
    return true;
  } catch (err) {
    failureFunction(err.message)
    return false;
  }
}

export default fetchData