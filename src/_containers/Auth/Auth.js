import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { checkValidity, authFormInitialState } from '../../common/utility';
import useAuth from '../../hooks/useAuth';
import AuthForm from '../../_components/AuthForm/AuthForm';
import styles from "./Auth.module.scss";


export default function Login() {


    const [loginFormConfig, setLoginFormConfig] = useState(JSON.parse(JSON.stringify(authFormInitialState)))
    const [signupFormConfig, setSignupFormConfig] = useState(JSON.parse(JSON.stringify(authFormInitialState)))
    // const history = useHistory();
    const {signUp, logIn} = useAuth();

    function inputChangedHandler(e, controlName, type) {

        const existing_config = type === "login" ? loginFormConfig : signupFormConfig;

        const updatedConfig = {...existing_config};
        updatedConfig[controlName].value = e.target.value;
        updatedConfig[controlName].valid = checkValidity(e.target.value, updatedConfig[controlName].validation);
        
        if(type === "login") { 
            setLoginFormConfig(updatedConfig);
        } else {
            setSignupFormConfig(updatedConfig);
        }

    }

    function inputBlurHandler(e, controlName, type) {

        const existing_config = type === "login" ? loginFormConfig : signupFormConfig;
        const updatedConfig = {...existing_config};

        updatedConfig[controlName].touched = e.target.value.length > 0;
        
        if(type === "login") { 
            setLoginFormConfig(updatedConfig);
        } else {
            setSignupFormConfig(updatedConfig);
        }

    }


    function loginSubmitHandler(e) {
        e.preventDefault();

        logIn({
            email: loginFormConfig.email.value,
            password: loginFormConfig.password.value,
            onSuccess: data => {
                console.log(data);
            },
            onFail: error => {
                console.log(error);
            }
        })

    }
    function signupSubmitHandler(e) {
        e.preventDefault();

        signUp({
            email: signupFormConfig.email.value,
            password: signupFormConfig.password.value,
            onSuccess: data => {
                console.log(data);
            },
            onFail: error => {
                console.log(error)
            }
        })

    }



    const loginFormElementsArray = [];
    for(let key in loginFormConfig) {
        loginFormElementsArray.push({
            id: key,
            config: loginFormConfig[key]
        })
    }

    const signupFormElementsArray = [];
    for(let key in signupFormConfig) {
        signupFormElementsArray.push({
            id: key,
            config: signupFormConfig[key]
        })
    }



    return (
        <div className={`${styles.Auth} container flex flex-center`}>
            <AuthForm
                type="login"
                formTitle="Log In"
                buttonText="Log In"
                submit={loginSubmitHandler}
                formElements={loginFormElementsArray}
                change={inputChangedHandler}
                blur={inputBlurHandler}
            />
            <span className={styles.Divider}>or</span> 
            <AuthForm
                type="signup"
                formTitle="Sign Up"
                buttonText="Sign Up"
                submit={signupSubmitHandler}
                formElements={signupFormElementsArray }
                change={inputChangedHandler}
                blur={inputBlurHandler}
            />
        </div>
    )
}
