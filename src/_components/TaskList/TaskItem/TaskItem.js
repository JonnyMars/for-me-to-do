import React from 'react'
import ListActionButton from '../../UI/ListActionButton/ListActionButton';
import styles from "./TaskItem.module.scss";

export default function TaskItem(props) {
    return (
        <div className={`${styles.TaskItem} flex`}>
            <p className={styles.Title}>{props.task.title}</p>
            <div className={`${styles.Actions} flex`}>
                <ListActionButton 
                    type="CROSS" 
                    clicked={() => {}} 
                    title="Delete this Task"
                />
                <ListActionButton 
                    type="TICK" 
                    clicked={() => {}}
                    title="Mark task as completed"
                />
                <ListActionButton 
                    type="UP" 
                    clicked={() => {}}
                    title="Mark task as completed"
                />
                <ListActionButton 
                    type="CHEVRON" 
                    clicked={() => {}}
                    title="Mark task as completed"
                />
            </div>
        </div>
    )
}
