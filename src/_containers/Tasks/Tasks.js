import React, { useEffect, useState } from 'react'
import TaskCreator from '../../_components/TaskCreator/TaskCreator';
import TaskList from '../../_components/TaskList/TaskList';
import styles from "./Tasks.module.scss";
import useAuth from "../../hooks/useAuth";
import { Redirect } from 'react-router-dom';
import useTasks from '../../hooks/useTasks';
import ErrorModal from "../../_components/UI/ErrorModal/ErrorModal";
import Spinner from "../../_components/UI/Spinner/Spinner";


export default function Tasks() {

    const {isAuthenticated, authDetails} = useAuth();
    const {userId, token} = authDetails();

    const [tasks, setTasks] = useState([]);
    const [tasksError, setTasksError] = useState(null);
    const [tasksLoading, setTasksLoading] = useState(true);
    
    const {getTasks, addTask, updateTaskStatus, deleteTask} = useTasks(setTasks, setTasksError, authDetails());
    

    useEffect(() => {
        getTasks(() => setTasksLoading(false));
    }, [])

    function taskAddHandler(taskTitle) {
        addTask({
            title: taskTitle,
            status: "active"
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

    
    let error = null;
    if(tasksError) {

        error = (
            <ErrorModal clicked={() => setTasksError(null)}>
                {tasksError.toString()}
            </ErrorModal>
        )

    }

    let loading = null;
    if(tasksLoading) {

        loading = <Spinner />;

    }
    
    console.log("TASKS", tasks);

    return (
        <div className={styles.Tasks}>
            <TaskCreator addTask={taskAddHandler}  />
            {loading}
            <TaskList tasks={tasks} delete={taskDeleteHandler} complete={taskCompleteHandler} uncomplete={taskUncompleteHandler} tasksLoading={loading}  />
            {error}
        </div>
    )
}
