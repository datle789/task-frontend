import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import Task from './Task'
import { toast } from 'react-toastify';
import axios from 'axios';
import { URL } from '../App'

const TaskList = () => {

    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [taskID, setTaskID] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        completed: false,
    })



    const { name } = formData

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        //console.log(setFormData({ ...formData, [name]: value }))
    }

    const getTasks = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.get(`${URL}/api/tasks`)
            setTasks(data)
            setIsLoading(false)
        } catch (error) {
            toast.error(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    const createTask = async (e) => {
        e.preventDefault()
        if (name === "") {
            return toast.error("Please fill in the form")
        }
        try {
            await axios.post(`${URL}/api/tasks`, formData)
            toast.success('Task added')
            setFormData({ ...formData, name: "" })
            getTasks()
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${URL}/api/tasks/${id}`)
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const taskC = tasks.filter((task) => {
            return task.completed === true
        })
        setCompletedTasks(taskC)
    }, [tasks])

    const getSingleTask = async (task) => {
        setFormData({ name: task.name, completed: false })
        setTaskID(task._id)
        setIsEditing(true)
    }

    const updateTask = async (e) => {
        e.preventDefault()
        if (name === "") {
            return toast.error("please fill in the form")
        }
        try {
            await axios.put(`${URL}/api/tasks/${taskID}`, formData)
            setFormData({ ...formData, name: "" })
            setIsEditing(false)
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const setCompleted = async (task) => {
        const newFormData = {
            name: task.name,
            completed: true
        }
        try {
            await axios.put(`${URL}/api/tasks/${task._id}`, newFormData)
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div>
            <h2>Task Managert</h2>
            <TaskForm name={name} hanđleInputChange={handleInputChange} createTask={createTask} isEditing={isEditing} updateTask={updateTask} />
            {tasks.length > 0 && (
                <div className="">
                    <p>
                        <b>Total tasks</b> {tasks.length}
                    </p>

                    <p>
                        <b>completed tasks</b> {completedTasks.length}
                    </p>
                </div>)}
            <hr />
            {
                !isLoading && tasks.length === 0 ? (
                    <p className=""> no tasks added</p>
                ) : (
                    <>
                        {
                            tasks.map((task, index) => {
                                return (
                                    <Task key={task._id} task={task} index={index} deleteTask={deleteTask} getSingleTask={getSingleTask} setCompleted={setCompleted} />
                                )
                            })
                        }
                    </>
                )
            }

        </div>
    )
}

export default TaskList
