import React from 'react'
import ActiveList from './ActiveList/ActiveList';
import CompletedList from './CompletedList/CompletedList';
import styles from "./TaskList.module.scss";

export default function TaskList(props) {

    const active_tasks = props.tasks.filter(task => task.status === "active");
    const completed_tasks = props.tasks.filter(task => task.status === "completed");

    let lists = null;

    if(!props.tasksLoading) {
        lists = (
            <>
                <ActiveList tasks={active_tasks} delete={props.delete} complete={props.complete} />
                <CompletedList tasks={completed_tasks} delete={props.delete} uncomplete={props.uncomplete} />
            </>
        )
    }

    return (
        <section className={`${styles.TaskList} flex`}>
            {lists}
        </section>
    )
}
