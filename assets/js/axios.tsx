import axios from "axios";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

/**
 * Creates the default axios object to access the backend.
 */

export default axios.create({
  //baseURL: "http://localhost:4000/",
  baseURL: "https://glistening-stale-arcticfox.gigalixirapp.com/",
  responseType: "json",
});
