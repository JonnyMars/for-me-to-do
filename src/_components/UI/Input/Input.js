import React from 'react'
import { Link } from 'react-router-dom';
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

    let label = <label className={styles.Label}>{props.elementLabel}</label>;

    if(props.elementLabel.indexOf("privacy policy") > -1) {
        label = (
            <label className={styles.Label}>by signing up you agree to our <Link to="/privacy-policy">privacy policy</Link>.</label>
        )
    }

    
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
