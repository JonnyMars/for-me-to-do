import React from 'react'
import ListActionButton from '../../UI/ListActionButton/ListActionButton';
import styles from "./TaskItem.module.scss";

export default function TaskItem(props) {

    let buttons = null;

    if(props.task.status === "completed") {

        buttons = (
            <>
                <ListActionButton 
                        type="CROSS" 
                        clicked={() => props.delete(props.task.id)} 
                        title="Delete this Task"
                />
                 <ListActionButton 
                        type="UP" 
                        clicked={() => props.uncomplete(props.task.id)}
                        title="Move completed task into active tasks"
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

    let taskClasses = [styles.TaskItem]

    if(props.task.thinking) {
        taskClasses.push(styles.TaskThinking);
    }

    return (
        <div className={`${taskClasses.join(" ")} flex`}>
            <p className={styles.Title}>{props.task.title}</p>
            <div className={`${styles.Actions} flex`}>
                {buttons}
            </div>
        </div>
    )
}
