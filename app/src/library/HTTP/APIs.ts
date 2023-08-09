import axios from "axios";

export const toDo = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.TODO_API_URL
      : "http://localhost:3030",
});
