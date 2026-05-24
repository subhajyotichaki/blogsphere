import axios from "axios";

const API = axios.create({
  baseURL: "https://blogsphere-5ckb.onrender.com/api",
});

export default API;