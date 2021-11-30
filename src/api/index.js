import axios from "axios";
//
const url = "https://mern-todo-rocnogu.herokuapp.com/todos";
//
export const readTodo = () => axios.get(url);
export const createTodo = (newTodo) => axios.post(url, newTodo);
export const updateTodo = (id, updateTodo) =>
  axios.patch(`${url}/${id}`, updateTodo);
export const deleteTodo = (id) => axios.delete(`${url}/${id}`);
