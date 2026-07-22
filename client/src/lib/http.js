import axios from "axios";
export const httpRequest = axios.create({
  baseURL: "https://notebook-ztxd.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});