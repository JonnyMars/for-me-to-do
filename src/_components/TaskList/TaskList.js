import React from 'react'
import ActiveList from './ActiveList/ActiveList';
import CompletedList from './CompletedList/CompletedList';
import styles from "./TaskList.module.scss";

export default function TaskList(props) {

    const active_tasks = props.tasks.filter(task => task.status === "active");
    const completed_tasks = props.tasks.filter(task => task.status === "completed");

    return (
        <section className={`${styles.TaskList} flex`}>
            <ActiveList tasks={active_tasks} />
            <CompletedList tasks={completed_tasks} />
        </section>
    )
}
