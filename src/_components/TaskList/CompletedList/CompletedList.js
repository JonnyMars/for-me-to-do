import React, { useState } from 'react';
import ListActionButton from '../../UI/ListActionButton/ListActionButton';
import TaskItem from '../TaskItem/TaskItem';
import styles from "./CompletedList.module.scss";

export default function CompletedList(props) {

    const [accordionOpen, setAccordionOpen] = useState(false)

    function accordionClickHandler(e) {
        e.preventDefault();
        setAccordionOpen(!accordionOpen)
    }

    if(props.tasks.length === 0) return null;

    let taskList = null

    if(accordionOpen) taskList = props.tasks.map(task => <TaskItem key={task.id} task={task} delete={props.delete} uncomplete={props.uncomplete} />)

    return (
        <div className={styles.CompletedList}>
            <div className={`${styles.Accordion} flex`}>
                <span>
                    Completed Tasks <span>({props.tasks.length})</span>
                </span>
                <ListActionButton type="CHEVRON" clicked={accordionClickHandler} extraClasses={accordionOpen ? "" : styles.ChevronRotate} />
            </div>
            <div className={styles.List}>
                {taskList}
            </div>

        </div>
    )
}
