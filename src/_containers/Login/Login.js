import React, { useState } from 'react'
import { checkValidity } from '../../common/utility';
import AuthForm from '../../_components/AuthForm/AuthForm';
import styles from "./Login.module.scss";


export default function Login() {

    const initialState = {
        email: {
            elementType: "input",
            label: "Your Email Address",
            elementConfig: {
                type: "email",
                placeholder: "Email"
            },
            value: "",
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: "input",
            label: "Your Password",
            elementConfig: {
                type: "password",
                placeholder: "Password"
            },
            value: "",
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    }

    const [loginFormConfig, setLoginFormConfig] = useState(initialState)
    const [signupFormConfig, setSignupFormConfig] = useState(initialState)


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


    function loginSubmitHandler(e) {
        e.preventDefault();
        console.log("Login Submit")
    }

    function signupSubmitHandler(e) {
        e.preventDefault();
        console.log("Login Submit")
    }



    const loginFormElementsArray = [];
    const signupFormElementsArray = [];

    for(let key in loginFormConfig) {
        loginFormElementsArray.push({
            id: key,
            config: loginFormConfig[key]
        })
    }

    for(let key in signupFormConfig) {
        signupFormElementsArray.push({
            id: key,
            config: signupFormConfig[key]
        })
    }


    return (
        <div className={`container flex flex-center`}>
            <AuthForm
                formTitle="Log In"
                submit={loginSubmitHandler}
                buttonText="Log In"
                formElements={loginFormElementsArray}
                change={inputChangedHandler}
                blur={inputBlurHandler}
            />
        </div>
    )
}
