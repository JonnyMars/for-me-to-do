import React from 'react'
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import styles from "./AuthForm.module.scss";
import Spinner from "../UI/Spinner/Spinner";

export default function AuthForm(props) {

    let allValid = false;
    
    const validFormElements = props.formElements.filter(formElement => formElement.config.valid === true);
    console.log(validFormElements, props.formElements.length)

    if(validFormElements.length === props.formElements.length) allValid = true;

    let loading = null;
    if(props.loading) {
        loading = (
            <div className={styles.AuthSpinner}>
                <Spinner color="Orange" />
            </div>
        )
    }
    
    return (
        <div className={`${styles.AuthForm} container`}>
            <h4 className={styles.Title}>{props.formTitle}</h4>
            <form onSubmit={props.submit} className={`flex flex-wrap`}>
                {props.formElements.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        elementLabel={formElement.config.label}
                        value={formElement.config.value}
                        labelLast={formElement.config.labelLast}
                        change={(e) => props.change(e, formElement.id, props.type)}
                        shouldValidate={formElement.config.validation}
                        valid={formElement.config.valid}
                        touched={formElement.config.touched}
                        blur={(e) => props.blur(e, formElement.id, props.type)}
                    />
                ))}
                <div className={styles.SubmitButtonContainer} >
                    {loading}
                    <Button btnType="Success" type="submit" disabled={!allValid}>{props.buttonText}</Button>
                </div>
            </form>
        </div>
    )
}
