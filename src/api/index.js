import axios from "axios";
//
const url = "http://localhost:6789/todos";
//
export const readTodo = () => axios.get(url);
export const createTodo = (newTodo) => axios.post(url, newTodo);
export const updateTodo = (id, updateTodo) =>
  axios.patch(`${url}/${id}`, updateTodo);
export const deleteTodo = (id) => axios.delete(`${url}/${id}`);
