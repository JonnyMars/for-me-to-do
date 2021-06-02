import React, { useState } from 'react'
import TaskCreator from '../../_components/TaskCreator/TaskCreator';
import TaskList from '../../_components/TaskList/TaskList';
import styles from "./Tasks.module.scss";

export default function Tasks() {

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

    console.log(tasks)


    return (
        <div className={styles.Tasks}>
            <TaskCreator addTask={addTaskHandler}  />
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    )
}
