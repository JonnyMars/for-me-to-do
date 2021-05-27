import React, { useState } from 'react'
import FloatingInput from '../UI/FloatingInput/FloatingInput';
import styles from "./TaskCreator.module.scss";

export default function TaskCreator(props) {

    const [taskValue, setTaskValue] = useState("");


    function newTaskHandler(e) {
        e.preventDefault();
        props.addTask(taskValue);
        setTaskValue("");
    }


    return (
        <section className={`${styles.TaskCreator} flex flex-center `}>
            <div className={styles.CreatorBox} >
                <form onSubmit={newTaskHandler} >
                    <FloatingInput placeholder="I need to..." value={taskValue} change={(e) => setTaskValue(e.target.value)}  />
                </form>
            </div>
        </section>
    )
}
