import "./App.css";
import Preloader from "./components/Preloader";
import { useEffect, useState } from "react";
import {
  readTodos,
  createTodos,
  updateTodo,
  deleteTodo,
} from "./functions/index.js";
////////////////
export default function App() {
  ////
  const [todo, setTodo] = useState({ title: "title", content: "content" });
  const [todos, setTodos] = useState(null);
  const [currentId, setCurrentId] = useState(0);
  //// display data in fields
  useEffect(() => {
    let currentTodo =
      currentId !== 0
        ? todos.find((abc) => abc._id === currentId)
        : { title: "", content: "" };
    setTodo(currentTodo);
  }, [currentId, todos]);

  /////  fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      setTodos(result);
    };
    fetchData();
  }, []);
  //// clear the inputs on esc
  const clear = () => {
    setCurrentId(0);
    setTodo({ title: "", content: "" });
  };
  //
  useEffect(() => {
    const clearFields = (e) => {
      if (e.keyCode === 27) {
        clear();
      }
    };
    window.addEventListener("keydown", clearFields);
    return () => window.removeEventListener("keydown", clearFields);
  }, []);
  //// handle Submit of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      const result = await createTodos(todo);
      setTodos([...todos, result]);
      clear();
    } else {
      await updateTodo(currentId, todo);
      clear();
    }
  };
  ////////////////
  const removeTodo = async (id) => {
    await deleteTodo(id);
    const todosCopy = [...todos];
    todosCopy.filter((todo) => todo._id !== id);
    setTodos(todosCopy);
    clear();
  };
  ////////////////

  return (
    <div className="App">
      <h1>React ToDo App</h1>
      <p>removeTodo dosnt re render the list</p>
      <div className="container">
        <div className="row">
          <form className="col s12" onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">T</i>

                <input
                  required
                  placeholder="title"
                  id="icon_prefix"
                  type="text"
                  className="validate"
                  onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                  value={todo.title}
                />
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">assignment</i>

                <input
                  required
                  placeholder="content"
                  id="description"
                  type="text"
                  className="validate"
                  onChange={(e) =>
                    setTodo({ ...todo, content: e.target.value })
                  }
                  value={todo.content}
                />
              </div>
            </div>

            <div className="row center-align">
              <button className="waves-effect wave-light btn">
                Add new Task
              </button>
            </div>
          </form>

          {!todos ? (
            <Preloader />
          ) : todos.length > 0 ? (
            <ul className="collection">
              {todos.map((task) => (
                <li
                  className="collection-item "
                  key={task._id}
                  onClick={() => setCurrentId(task._id)}
                >
                  <div>
                    <h5>{task.title}</h5>
                    <p>
                      {task.content}
                      <a
                        href="#!"
                        className="secondary-content"
                        onClick={() => removeTodo(task._id)}
                      >
                        <i
                          className="material-icons"
                          onClick={() => removeTodo(task._id)}
                        >
                          delete
                        </i>
                      </a>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <h3>Here are no tasks</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
