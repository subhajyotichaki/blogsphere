import axios from "axios";

const API = axios.create({
  baseURL: "https://blogsphere-api-567t.onrender.com/api",
});

export default API;