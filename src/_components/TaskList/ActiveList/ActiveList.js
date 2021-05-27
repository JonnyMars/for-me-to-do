import React from 'react'
import TaskItem from '../TaskItem/TaskItem';
import styles from "./ActiveList.module.scss";

export default function ActiveList(props) {

    let no_tasks_message = null;

    if(props.tasks.length === 0) no_tasks_message = <p className={styles.NoTasksMessage}>...that's awkward.  There's nothing here.  Add a new task above!</p>;

    return (
        <div className={styles.ActiveList}>
            {no_tasks_message}
            {
                props.tasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))
            }
        </div>
    )
}
