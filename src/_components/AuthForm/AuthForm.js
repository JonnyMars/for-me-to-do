import React from 'react'
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import styles from "./AuthForm.module.scss";

export default function AuthForm(props) {

    let allValid = false;
    
    const validFormElements = props.formElements.filter(formElement => formElement.config.valid === true);

    if(validFormElements.length === props.formElements.length) allValid = true;
    
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
                        change={(e) => props.change(e, formElement.id, props.type)}
                        shouldValidate={formElement.config.validation}
                        valid={formElement.config.valid}
                        touched={formElement.config.touched}
                        blur={(e) => props.blur(e, formElement.id)}
                    />
                ))}
                <Button btnType="Success" type="submit" disabled={!allValid}>{props.buttonText}</Button>
            </form>
        </div>
    )
}
