import axios from "axios";
import { BASE_APP_JSON_URL, JSON_EXTENSION } from "./commonConstants";

axios.defaults.withCredentials = true;

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

  try {
    let url = import.meta.env.VITE_API_URL.concat(path);
    // console.info("Data fetching for url : " + url);
    const response = await axios.get(url);
    // console.info("Data fetched successfully for " + path);
    successFunction(response.data);
    return true;
  } catch (err) {
    // console.error("Data fetched failure for " + path + "\n error : \"" + err.message + "\"");
    failureFunction(err.message);
    return false;
  }


}

const fetchMultipleApiData = async (path, successFunction, failureFunction, arrayName) => {

  try {
    let url = import.meta.env.VITE_API_URL.concat(path);
    // console.info("Multiple Data fetching for url : " + url);
    const response = await axios.get(url);
    // console.info("Data fetched successfully for " + path);
    // console.info("Data  : " + response.data._embedded[arrayName]);
    successFunction(response.data._embedded[arrayName]);
    return true;
  } catch (err) {
    // console.error("Data fetched failure for " + path + "\n error : \"" + err.message + "\"");
    failureFunction(err.message);
    return false;
  }

}

export const fetchLocalData = async (path, successFunction, failureFunction) => {


  try {
    let url = BASE_APP_JSON_URL.concat(path).concat(JSON_EXTENSION)
    // console.log("Sending request to url : " + url);
    const response = await axios.get(url);
    // console.info("Data fetched successfully for " + path);
    successFunction(response.data)
    return true;
  } catch (err) {
    // console.error("Data fetched failure for " + path + "\n error : \"" + err.message + "\"");
    failureFunction(err.message)
    return false;
  }
}

export default fetchData