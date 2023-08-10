import axios from "axios";

export const toDo = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TODO_API_URL || "http://localhost:3030",
});
