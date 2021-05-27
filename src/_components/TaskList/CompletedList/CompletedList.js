import React, { useState } from 'react'
import TaskItem from '../TaskItem/TaskItem';
import styles from "./CompletedList.module.scss";

export default function CompletedList(props) {

    const [accordionOpen, setAccordionOpen] = useState(false)

    function accordionClickHandler(e) {
        e.preventDefault();
        setAccordionOpen(!accordionOpen)
        console.log("click");
    }

    if(props.tasks.length === 0) return null;

    let taskList = null

    if(accordionOpen) taskList = props.tasks.map(task => <TaskItem key={task.id} task={task} />)

    return (
        <div className={styles.CompletedList}>
            <button className={styles.Accordion} onClick={accordionClickHandler}>
                Completed Tasks <span>({props.tasks.length})</span>
            </button>
            <div className={styles.List}>
                {taskList}
            </div>

        </div>
    )
}
