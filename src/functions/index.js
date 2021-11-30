import * as api from "../api";

export const readTodos = async () => {
  try {
    const { data } = await api.readTodo();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createTodos = async (todo) => {
  try {
    const { data } = await api.createTodo(todo);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
////////////////
export const updateTodo = async (id, todo) => {
  try {
    const { data } = await api.updateTodo(id, todo);
    return data;
  } catch (err) {
    console.log(err);
  }
};
////////////////
export const deleteTodo = async (id) => {
  try {
    await api.deleteTodo(id);
  } catch (err) {
    console.log(err);
  }
};
