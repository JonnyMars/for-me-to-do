import React from 'react'
import styles from "./TaskItem.module.scss";

export default function TaskItem(props) {
    return (
        <div className={styles.TaskItem}>
            {props.task.title}
        </div>
    )
}
