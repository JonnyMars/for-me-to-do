import React, { useState } from 'react'
import TaskCreator from '../../_components/TaskCreator/TaskCreator';
import styles from "./Tasks.module.scss";

export default function Tasks() {

    const [tasks, setTasks] = useState([]);

    function addTaskHandler(task) {
        setTasks((prevState) => (
            [...prevState, {
                title: task,
                id: new Date()
            }]
        ))
    }

    console.log(tasks)


    return (
        <div className={styles.Tasks}>
            <TaskCreator addTask={addTaskHandler}  />
        </div>
    )
}
