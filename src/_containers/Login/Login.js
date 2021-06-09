import React, { useState } from 'react'
import { checkValidity, authFormInitialState } from '../../common/utility';
import AuthForm from '../../_components/AuthForm/AuthForm';
import styles from "./Login.module.scss";



export default function Login() {


    const [loginFormConfig, setLoginFormConfig] = useState({...authFormInitialState})


    function inputChangedHandler(e, controlName) {
        const updatedConfig = {...loginFormConfig};
        updatedConfig[controlName].value = e.target.value;
        updatedConfig[controlName].valid = checkValidity(e.target.value, updatedConfig[controlName].validation);
        setLoginFormConfig(updatedConfig);
    }

    function inputBlurHandler(e, controlName) {
        const updatedConfig = {...loginFormConfig};
        updatedConfig[controlName].touched = e.target.value.length > 0;
        setLoginFormConfig(updatedConfig);
    }


    function submitHandler(e) {
        e.preventDefault();
        console.log("Login Submit")
    }



    const loginFormElementsArray = [];

    for(let key in loginFormConfig) {
        loginFormElementsArray.push({
            id: key,
            config: loginFormConfig[key]
        })
    }



    return (
        <div className={`container flex flex-center`}>
            <AuthForm
                formTitle="Log In"
                buttonText="Log In"
                submit={submitHandler}
                formElements={loginFormElementsArray}
                change={inputChangedHandler}
                blur={inputBlurHandler}
            />
        </div>
    )
}
