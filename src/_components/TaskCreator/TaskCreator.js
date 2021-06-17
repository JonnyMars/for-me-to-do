import React, { useState } from 'react'
import FloatingInput from '../UI/FloatingInput/FloatingInput';
import styles from "./TaskCreator.module.scss";

export default function TaskCreator(props) {

    const charLimit = 60
    const [taskValue, setTaskValue] = useState("");

    function onTaskValueChange(e) {
        if(e.target.value.length > charLimit) return;
        setTaskValue(e.target.value);
    }

    function newTaskHandler(e) {
        e.preventDefault();

        if(taskValue !== "") {
            props.addTask(taskValue);
            setTaskValue("");
        }
    }

    let charCounter = null;

    if(taskValue.length > 0) {
        charCounter = <div className={styles.CharCounter}>{taskValue.length}/{charLimit}</div>
    }

    

    return (
        <section className={`${styles.TaskCreator} flex flex-center `}>
            <div className={styles.CreatorBox} >
                {charCounter}
                <form onSubmit={newTaskHandler} >
                    <FloatingInput 
                        placeholder="I need to..." 
                        value={taskValue} 
                        change={onTaskValueChange} 
                        inputname="new-task"
                        autoComplete="off"
                    />
                </form>
            </div>
        </section>
    )
}
