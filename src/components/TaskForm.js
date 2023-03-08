import React from 'react'


const TaskForm = ({ createTask, name, hanđleInputChange, isEditing, updateTask }) => {
    return (
        <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
            <input type="text" placeholder="Add a task" name="name" value={name} onChange={hanđleInputChange} />
            <button type="submit" className="">{isEditing ? "Edit" : "Add"}</button>
        </form>
    )
}

export default TaskForm

