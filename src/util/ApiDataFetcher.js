import axios from "axios";
import { BASE_APP_JSON_URL, JSON_EXTENSION } from "./commonConstants";

const fetchData = (urlPath, successFunction, failureFunction) => {

  let dataFetchSuccessful = false;
  let url = BASE_APP_JSON_URL.concat(urlPath).concat(JSON_EXTENSION)

  axios.get(url)
    .then(res => { dataFetchSuccessful = true; successFunction(res.data) })
    .catch(err => { failureFunction(err.message) });

  return dataFetchSuccessful

}

export default fetchData