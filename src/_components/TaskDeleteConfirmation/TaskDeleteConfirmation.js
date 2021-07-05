import React from 'react'
import Backdrop from "../UI/Backdrop/Backdrop";
import Button from "../UI/Button/Button";
import styles from "./TaskDeleteConfirmation.module.scss";

export default function TaskDeleteConfirmation({task_info, confirm, cancel}) {
    return (
        <>
            <Backdrop clicked={cancel} show={true} />
            <div className={styles.TaskDeleteConfirmation}>
                <h2>Are you sure you want to delete this task?</h2>
                <p className={styles.TaskTitle}>"{task_info.title}"</p>
                <div className={`${styles.Actions} flex`}>
                    <Button clicked={cancel} btnType="Danger" >Cancel</Button>
                    <Button clicked={confirm} btnType="Success" >Confirm</Button>
                </div>
            </div>
        </>
    )
}
