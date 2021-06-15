import React, { useState } from 'react'
import TaskCreator from '../../_components/TaskCreator/TaskCreator';
import TaskList from '../../_components/TaskList/TaskList';
import styles from "./Tasks.module.scss";
import useAuth from "../../hooks/useAuth";
import { Redirect } from 'react-router-dom';

export default function Tasks() {

    const {isAuthenticated} = useAuth();
    const [tasks, setTasks] = useState([
        {
            title: "task",
            status: "completed",
            id: new Date()
        }
    ]);

    function addTaskHandler(task) {
        setTasks((prevState) => (
            [...prevState, {
                title: task,
                status: "active",
                id: new Date()
            }]
        ))
    }


    if(!isAuthenticated()) {
        return <Redirect to="/" />
    }


    return (
        <div className={styles.Tasks}>
            <TaskCreator addTask={addTaskHandler}  />
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    )
}
