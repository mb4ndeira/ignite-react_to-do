import axios from "axios";

console.log(
  process.env,
  process.env.NEXT_TODO_API_URL,
  process.env.TODO_API_URL,
);

export const toDo = axios.create({
  baseURL: process.env.NEXT_TODO_API_URL || "http://localhost:3030",
});
