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
  let errorMessage = '';
  try {
    const response = await axios.get(url);
    successFunction(response.data ? response.data : response);
    return true;
  } catch (error) {
    errorMessage = error.message;
    failureFunction(errorMessage);
    return false;
  }
}

const fetchMultipleApiData = async (path, successFunction, failureFunction, arrayName) => {
  let url = import.meta.env.VITE_API_URL.concat(path);
  let errorMessage = '';
  try {
    const response = await axios.get(url);
    successFunction(response.data._embedded ? response.data._embedded[arrayName] : []);
    return true;
  } catch (error) {
    console.log(error?.response?.status);
    errorMessage = error.message;
    if (error.code != "ERR_NETWORK" && (error?.response?.data?.message?.includes("JWT") || error?.response?.message == "Unauthorized")) {
      console.log("Invalid token or Unauthorized");
      fetchMultipleApiData(path, successFunction, failureFunction, arrayName);
    } else {
      failureFunction(errorMessage);
      return false;
    }
  }
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

export const deleteData = async (path, successFunction, failureFunction) => {
  let url = import.meta.env.VITE_API_URL.concat(path);
  await axios.delete(url)
    .then((response) => {
      successFunction(response.data);
      return true;
    }
    ).catch((error) => {
      failureFunction(error.message);
      return false;
    });
}

export const updateData = async (path, data, successFunction, failureFunction) => {
  let url = import.meta.env.VITE_API_URL.concat(path);
  await axios.put(
    url,
    data
  )
    .then((response) => {
      successFunction(response.data);
      return true;
    }
    ).catch((error) => {
      failureFunction(error.message);
      return false;
    });
}

export const postData = async (path, data, successFunction, failureFunction) => {
  let url = import.meta.env.VITE_API_URL.concat(path);
  await axios.post(
    url,
    data
  )
    .then((response) => {
      successFunction(response.data);
      return true;
    }
    ).catch((error) => {
      failureFunction(error.message);
      return false;
    });
}

export default fetchData