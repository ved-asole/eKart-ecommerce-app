import axios from "axios";
import { BASE_APP_JSON_URL, JSON_EXTENSION } from "./commonConstants";

const fetchData = (path, successFunction, failureFunction) => {

  let dataFetchSuccessful = false;
  let url = BASE_APP_JSON_URL.concat(path).concat(JSON_EXTENSION)
  // console.log("Sending request to url : " + url);

  axios.get(url)
    .then(res => {
      dataFetchSuccessful = true;
      // console.info("Data fetched successfully for " + path);
      successFunction(res.data)
    })
    .catch(err => {
      // console.error("Data fetched failure for " + path + "\n error : \"" + err.message + "\"");
      failureFunction(err.message)
    });

  return dataFetchSuccessful

}

export default fetchData