import React, { useEffect, useState } from 'react'
import ListActionButton from '../../UI/ListActionButton/ListActionButton';
import styles from "./TaskItem.module.scss";

window.task_blur_timeout = null;

export default function TaskItem(props) {

    let blur_timeout;
    const [mobileActionsOpen, setMobileActionsOpen] = useState(false);

    useEffect(() => {

        return () => {
            clearTimeout(window.task_blur_timeout)
        }
    }, [])

    let buttons = null;

    if(props.task.status === "completed") {

        buttons = (
            <>
                <ListActionButton 
                        type="UP" 
                        clicked={() => props.uncomplete(props.task.id)}
                        title="Move completed task into active tasks"
                />
                <ListActionButton 
                        type="CROSS" 
                        clicked={() => props.delete(props.task.id)} 
                        title="Delete this Task"
                />
            </>
        )

    } else {

        buttons = (
            <>
                <ListActionButton 
                        type="TICK" 
                        clicked={() => props.complete(props.task.id)}
                        title="Mark task as completed"
                />
                <ListActionButton 
                        type="CROSS" 
                        clicked={() => props.delete(props.task.id)} 
                        title="Delete this Task"
                />
            </>
        )

    }

    function moreActionsClickHandler() {
        setMobileActionsOpen(true)
    }

    function moreActionsBlurHandler(e) {
        window.task_blur_timeout = setTimeout(() => {
            setMobileActionsOpen(false);
        }, 100)
    }

    let taskClasses = [styles.TaskItem]

    if(props.task.thinking) {
        taskClasses.push(styles.TaskThinking);
    }

    let taskActionClasses = [styles.Actions]

    if(mobileActionsOpen) taskActionClasses.push(styles.Show);

    return (
        <div className={`${taskClasses.join(" ")} flex`} >
            <p className={styles.Title}>{props.task.title}</p>
            <button className={`${styles.MoreActions} flex flex-center`} onClick={moreActionsClickHandler} onBlur={moreActionsBlurHandler}>
                <span></span>
            </button>
            <div className={`${taskActionClasses.join(" ")} flex`}>
                {buttons}
            </div>
        </div>
    )
}
