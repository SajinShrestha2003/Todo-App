import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";

export default function TodoWrapper() {
    // function to get random id//
    const uid = function () {
        let timestampID = Date.now().toString(36);
        let randomID = Math.floor(Math.random() * 9e11).toString(36);
        return timestampID + randomID;
    };

    //function to store todos in local storage//
    const getLocalStorage = () => {
        let storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            return (storedTodos = JSON.parse(localStorage.getItem("todos")));
        } else {
            return [];
        }
    };

    const [todos, setTodos] = useState(getLocalStorage());

    // Save todos to localStorage whenever todos change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo) => {
        const newTodo = { id: uid(), task: todo, completed: false, isEditing: false };
        setTodos([...todos, newTodo]);
        console.log(`task id: ${newTodo.id}, task name: ${newTodo.task}`);
    };

    const toggleComplete = (id) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const editTodo = (id) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
    };

    const editTask = (task, id) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo)));
    };

    return (
        <div className="TodoWrapper">
            <h1>To-DO List</h1>
            <TodoForm addTodo={addTodo} />

            {todos.map((todo, index) =>
                todo.isEditing ? (
                    <EditTodoForm key={index} editTodo={editTask} task={todo} />
                ) : (
                    <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                )
            )}
        </div>
    );
}
