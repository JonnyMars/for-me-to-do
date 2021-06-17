import React, { useState } from 'react'
import TaskCreator from '../../_components/TaskCreator/TaskCreator';
import TaskList from '../../_components/TaskList/TaskList';
import styles from "./Tasks.module.scss";
import useAuth from "../../hooks/useAuth";
import { Redirect } from 'react-router-dom';

export default function Tasks() {

    const {isAuthenticated} = useAuth();
    const [tasks, setTasks] = useState([]);

    function addTaskHandler(task) {
        let taskObj = {
            title: task,
            status: "active"
        }

        fetch(`https://react-to-do-ff092-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`, {
            method: "POST",
            body: JSON.stringify(taskObj)
        })
        .then(response => response.json())
        .then(data => {
            setTasks((prevState) => (
                [...prevState, {
                    ...taskObj,
                    id: data.name
                }]
            ))
        })
    }

    function onComplete(id) {
        fetch(`https://react-to-do-ff092-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}/.json`, {
            method: "PATCH",
            body: JSON.stringify({status: "completed"})
        })
        .then(response => response.json())
        .then(data => {
            const tasksCopy = [...tasks];
            const active_task_index = tasksCopy.findIndex(task => task.id === id);
            tasksCopy[active_task_index].status = "completed";
            setTasks(tasksCopy);
        })
    }

    function onDelete(id) {
        fetch(`https://react-to-do-ff092-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            const tasksCopy = [...tasks];
            const new_tasks = tasksCopy.filter(task => task.id !== id);
            setTasks(new_tasks);
        })
    }

    function onUncomplete(id) {
        fetch(`https://react-to-do-ff092-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}/.json`, {
            method: "PATCH",
            body: JSON.stringify({status: "active"})
        })
        .then(response => response.json())
        .then(data => {
            const tasksCopy = [...tasks];
            const active_task_index = tasksCopy.findIndex(task => task.id === id);
            tasksCopy[active_task_index].status = "active";
            setTasks(tasksCopy);
        })
    }


    if(!isAuthenticated()) {
        return <Redirect to="/" />
    }


    return (
        <div className={styles.Tasks}>
            <TaskCreator addTask={addTaskHandler}  />
            <TaskList tasks={tasks} delete={onDelete} complete={onComplete} uncomplete={onUncomplete}  />
        </div>
    )
}
