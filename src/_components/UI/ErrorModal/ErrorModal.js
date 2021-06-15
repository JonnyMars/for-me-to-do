import React from 'react';
import styles from "./ErrorModal.module.scss";
import Button from "../Button/Button";
import Backdrop from "../Backdrop/Backdrop";

export default function ErrorModal(props) {

    return (
        <>
            <Backdrop show={true} clicked={props.clicked}/>
            <div className={styles.ErrorModal}>
                <h2>Oops... An Error Occured!</h2>
                <p>{props.children}</p>
                <div className={styles.ActionsContainer}>
                    <Button btnType="Success" clicked={props.clicked}>
                        Okay
                    </Button>
                </div>
            </div>
        </>
    )
}
