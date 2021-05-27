import React from 'react'
import TaskItem from './TaskItem/TaskItem';
import styles from "./TaskList.module.scss";

export default function TaskList(props) {
    return (
        <section className={`${styles.TaskList} flex flex-center`}>
            <div className={styles.List}>
                {
                    props.tasks.map(task => (
                        <TaskItem task={task} />
                    ))
                } 
            </div>
        </section>
    )
}
