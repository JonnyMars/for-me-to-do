import React from 'react'
import TaskCreator from '../../_components/TaskCreator/TaskCreator';
import styles from "./Tasks.module.scss";

export default function Tasks() {

    return (
        <div className={styles.Tasks}>
            <TaskCreator />
        </div>
    )
}
