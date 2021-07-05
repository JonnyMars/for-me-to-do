import React, { useEffect, useState } from 'react'

import styles from "./Tasks.module.scss";

import TaskCreator from '../../_components/TaskCreator/TaskCreator';
import TaskList from '../../_components/TaskList/TaskList';
import TaskDeleteConfirmation from '../../_components/TaskDeleteConfirmation/TaskDeleteConfirmation';
import ErrorModal from "../../_components/UI/ErrorModal/ErrorModal";
import Spinner from "../../_components/UI/Spinner/Spinner";

import {useAuth} from "../../_contexts/AuthContext";
import useTasks from '../../hooks/useTasks';


export default function Tasks() {

    const {currentUser} = useAuth();

    const [tasks, setTasks] = useState([]);
    const [tasksError, setTasksError] = useState(null);
    const [tasksLoading, setTasksLoading] = useState(true);
    const [taskToDelete, setTaskToDelete] = useState(null);
    
    const {getTasks, addTask, updateTaskStatus, deleteTask} = useTasks(setTasks, setTasksError, currentUser);
    

    useEffect(() => {
        getTasks(() => setTasksLoading(false));
    }, [getTasks])

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
        const taskArr = tasks.filter(task => task.id === id);
        if(taskArr.length > 0) setTaskToDelete(taskArr[0]);
    }

    function taskDeleteConfirmationHandler(id) {
        setTaskToDelete(null);
        deleteTask(
            tasks, 
            id
        );
    }

    function taskUncompleteHandler(id) {
        updateTaskStatus(
            tasks, 
            id,
            "active"
        )
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

    let taskDeleteConfirmationPopup = null;
    if(taskToDelete) {

        taskDeleteConfirmationPopup = (
            <TaskDeleteConfirmation
                task_info={taskToDelete}
                cancel={() => setTaskToDelete(null)}
                confirm={() => taskDeleteConfirmationHandler(taskToDelete.id)}
            />
        )

    }

    return (
        <div className={styles.Tasks}>
            <TaskCreator addTask={taskAddHandler}  />
            <div className={styles.TaskContentContainer}>
                {loading}
                <TaskList tasks={tasks} delete={taskDeleteHandler} complete={taskCompleteHandler} uncomplete={taskUncompleteHandler} tasksLoading={loading}  />
            </div>
            {taskDeleteConfirmationPopup}
            {error}
        </div>
    )
}
