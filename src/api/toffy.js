import axios from "axios";
import StorageHelper from "../helpers/StorageHelper";

// This is my axios instance,
// Here I set the location of the tournament server

const DEV = false
const BACKEND_URL = "https://api-toffy.herokuapp.com"

const AxiosInstance = () => {
  const instance = axios.create({
    baseURL: DEV ? "http://localhost:3333" : BACKEND_URL,
    timeout: 5000,
  });

  const token = StorageHelper.getStorage("@token");
  if (token) {
    instance.defaults.headers.common["X-Authorization"] = token;
  }

  delete instance.defaults.headers.common["Accept"];

  return instance;
};

export default AxiosInstance();
