import React from 'react'
import styles from "./Input.module.scss";


export default function Input(props) {

    let inputElement = null;
    let inputTypeClass = null;
    const inputClasses = [styles.InputElement]

    if(!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.Invalid);
    }

    switch(props.elementType) {

        case("input"):
            if(props.elementConfig.type) inputTypeClass = styles[props.elementConfig.type]
            inputElement = <input
                            className={inputClasses.join(" ")}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.change}
                            onBlur={props.blur}
                            />
            break;
        case("textarea"):
            inputElement = <textarea
                            className={inputClasses.join(" ")}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.change}
                            />
            break;
        default:
            inputElement = null;


    }

    const label = <label className={styles.Label}>{props.elementLabel}</label>;
    
    let content = (<>{label}{inputElement}</>)
    if(props.labelLast) {
        content = (<>{inputElement}{label}</>)
    } 


    return (
        <div className={`${styles.Input} ${inputTypeClass ? inputTypeClass : ""}`}>
            {content}
        </div>
    )
}
