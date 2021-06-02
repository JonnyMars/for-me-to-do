import React from 'react'
import ActiveList from './ActiveList/ActiveList';
import CompletedList from './CompletedList/CompletedList';
import styles from "./TaskList.module.scss";

export default function TaskList(props) {

    const active_tasks = props.tasks.filter(task => task.status === "active");
    const completed_tasks = props.tasks.filter(task => task.status === "completed");

    function onComplete(id) {
        const tasks = [...props.tasks];
        const active_task_index = tasks.findIndex(task => task.id === id);
        tasks[active_task_index].status = "completed";
        props.setTasks(tasks);
    }

    function onDelete(id) {
        const tasks = [...props.tasks];
        const new_tasks = tasks.filter(task => task.id !== id);
        props.setTasks(new_tasks);
    }

    function onUncomplete(id) {
        const tasks = [...props.tasks];
        const active_task_index = tasks.findIndex(task => task.id === id);
        tasks[active_task_index].status = "active";
        props.setTasks(tasks);
    }

    return (
        <section className={`${styles.TaskList} flex`}>
            <ActiveList tasks={active_tasks} delete={onDelete} complete={onComplete} />
            <CompletedList tasks={completed_tasks} delete={onDelete} uncomplete={onUncomplete} />
        </section>
    )
}
