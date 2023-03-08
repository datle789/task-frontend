import React from 'react'
import { FaCheckDouble, FaEdit, FaTrashAlt } from 'react-icons/fa'

const Task = ({ task, index, deleteTask, getSingleTask, setCompleted }) => {
    return (
        <div className={task.completed ? "task-completed" : "task"}>
            <p>
                <b>{index + 1}. </b> {task.name}
            </p>
            <div className="task-icons">
                <p className="task-icon"><FaCheckDouble color="green" onClick={() => setCompleted(task)} /></p>
                <p className="task-icon"><FaEdit color="purple" onClick={() => getSingleTask(task)} /></p>
                <p className="task-icon"><FaTrashAlt color="red" onClick={() => deleteTask(task._id)} /></p>
            </div>
        </div>
    )
}

export default Task
