import axios from "axios";

const axiosinstance = axios.create({
  baseURL: "http://localhost:8080",
});

export default axiosinstance;
