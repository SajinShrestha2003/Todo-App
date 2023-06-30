import { useState } from "react";
import PropTypes from 'prop-types'


export default function EditTodoForm({editTodo, task}) {
    const [value, setValue] = useState(task.task);

    const handleSubmit = (e) => {
        e.preventDefault();  
        editTodo(value, task.id)
        setValue("")
    };

    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input"
                value={value}
                placeholder="Update task"
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
            <button type="submit" className="todo-btn">
                Update Task
            </button>
        </form>
    );
}

EditTodoForm.propTypes = {
    editTodo: PropTypes.func,
    task: PropTypes.object
}