import React, { useEffect, useState } from 'react'
import TaskCreator from '../../_components/TaskCreator/TaskCreator';
import TaskList from '../../_components/TaskList/TaskList';
import styles from "./Tasks.module.scss";
import useAuth from "../../hooks/useAuth";
import { Redirect } from 'react-router-dom';
import useTasks from '../../hooks/useTasks';

export default function Tasks() {

    const {isAuthenticated, authDetails} = useAuth();
    const {userId, token} = authDetails();
    const [tasks, setTasks] = useState([]);
    const {getTasks, addTask, updateTaskStatus, deleteTask} = useTasks(setTasks, () => {console.log(123)}, authDetails());



    useEffect(getTasks, [])

    function taskAddHandler(taskTitle) {
        addTask({
            title: taskTitle,
            status: "active",
            userId
        });
    }

    function taskCompleteHandler(id) {
        updateTaskStatus(
            tasks, 
            id,
            "completed"
        )
    }

    function taskDeleteHandler(id) {
        deleteTask(
            tasks, 
            id
        )
    }

    function taskUncompleteHandler(id) {
        updateTaskStatus(
            tasks, 
            id,
            "active"
        )
    } 


    if(!isAuthenticated()) {
        return <Redirect to="/" />
    }


    return (
        <div className={styles.Tasks}>
            <TaskCreator addTask={taskAddHandler}  />
            <TaskList tasks={tasks} delete={taskDeleteHandler} complete={taskCompleteHandler} uncomplete={taskUncompleteHandler}  />
        </div>
    )
}
