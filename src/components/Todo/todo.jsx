import React from "react";
import { useState, useEffect } from "react";
import tick from "./tick.png";
import "./todo.css";

const Todo = () => {

    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");

    useEffect(() => {
        const getData = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=50");
            const data = await response.json();
            setTodos(data);

        }
        getData();
    }, []);

    const updateTodo = (id) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(newTodos);
    }

    const handleDelete = (id) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    }

    return (
        <div className="todo">
            <h2 className="text-center">To-Do List</h2>
            <div className="todo-continer m-5">
                <h5>Add a new task in the list</h5>
                <div className="todo-form d-flex my-5">
                    <input
                        placeholder="Enter the task here"
                        name="label"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                    <button
                        className="btn"
                        type="submit"
                        onClick={() => {
                            setTodos([...todos, { label: todo, completed: false }]);
                            setTodo("");
                        }}
                    >
                        Submit
                    </button>
                </div>
                <div className="todo-list">
                    <h5 className="mb-2">Added task in to-do list</h5>
                    <ol >
                        <div className="row">
                            {todos.map(todo => (
                                todo.completed === true ? (
                                    <div className="col-lg-3 m-5">
                                        <div className="card complete h-100 col-sm">
                                            <li key={todo.id}>
                                                <div className="todo-item d-flex  align-items-center justify-content-between">
                                                    <p className=" m-3" >{todo.title}</p>
                                                    <img class="tick" src={tick} alt="tick" onClick={() => updateTodo(todo.id)} height={25} />
                                                </div>
                                                <p className={` m-2 ${todo.completed ? "completed" : ""}`} onClick={() => updateTodo(todo.id)}>{todo.label}</p>
                                                <hr />
                                                <div className="d-flex justify-content-between align-items-center m-4">
                                                    <p className="incomplete" onClick={() => updateTodo(todo.id)}>Mark as incomplete</p>
                                                    <p className="delete" onClick={() => handleDelete(todo.id)}>Delete</p>
                                                </div>
                                            </li>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-lg-3 m-5">
                                        <div className="card h-100 col-sm">
                                            <li key={todo.id}>
                                                <p className=" m-3" >{todo.title}</p>
                                                <p className={`m-3 ${todo.completed ? "completed" : ""}`} onClick={() => updateTodo(todo.id)}>{todo.label}</p>
                                                <hr />
                                                <div className="d-flex justify-content-between align-items-center m-4">
                                                    <button
                                                        className="btn2"
                                                        type="submit"
                                                        onClick={() => updateTodo(todo.id)}
                                                    >
                                                        Mark as complete
                                                    </button>
                                                    <p className="delete" onClick={() => handleDelete(todo.id)}>Delete</p>
                                                </div>
                                            </li>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default Todo;