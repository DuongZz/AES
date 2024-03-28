import axios from "axios";
import CONSTANT from "../utils/constant";

const axiosApiInstance = axios.create({
  baseURL: CONSTANT.baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  },
});

export default axiosApiInstance;