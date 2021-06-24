import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { checkValidity, authFormInitialState } from '../../common/utility';
import useAuth from '../../hooks/useAuth';
import AuthForm from '../../_components/AuthForm/AuthForm';
import styles from "./Auth.module.scss";
import ErrorModal from "../../_components/UI/ErrorModal/ErrorModal";
import { Redirect } from 'react-router-dom';


export default function Login() {


    const [loginFormConfig, setLoginFormConfig] = useState(JSON.parse(JSON.stringify(authFormInitialState)));
    const [loginFormLoading, setLoginFormLoading] = useState(false);

    const [signupFormConfig, setSignupFormConfig] = useState(JSON.parse(JSON.stringify(authFormInitialState)));
    const [signupFormLoading, setSignupFormLoading] = useState(false);

    const [formError, setFormError] = useState(null);


    const history = useHistory();
    const {signUp, logIn, isAuthenticated} = useAuth();
    

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
        setLoginFormLoading(true);
        logIn({
            email: loginFormConfig.email.value,
            password: loginFormConfig.password.value,
            onSuccess: data => {
                console.log(data);

                setLoginFormLoading(false);

                if(data.error) setFormError(data.error.message)
                if(!data.error) history.push("/tasks");
            },
            onFail: error => {
                setLoginFormLoading(false);

                setFormError(error)
            }
        })

    }
    function signupSubmitHandler(e) {
        e.preventDefault();
        setSignupFormLoading(true)
        signUp({
            email: signupFormConfig.email.value,
            password: signupFormConfig.password.value,
            onSuccess: data => {
                console.log(data);

                setSignupFormLoading(false);

                if(data.error) setFormError(data.error.message);
                if(!data.error) history.push("/tasks");
            },
            onFail: error => {
                setSignupFormLoading(false);

                setFormError(error)
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
    
    
    let error = null;
    if(formError) {

        error = (
            <ErrorModal clicked={() => setFormError(null)}>
                {formError.toString()}
            </ErrorModal>
        )
    }

    if(isAuthenticated()) return <Redirect to="/tasks" />;

    return (
        <div className={`${styles.Auth} container flex flex-center`}>
            {error}
            <AuthForm
                type="login"
                formTitle="Log In"
                buttonText="Log In"
                submit={loginSubmitHandler}
                formElements={loginFormElementsArray}
                change={inputChangedHandler}
                blur={inputBlurHandler}
                loading={loginFormLoading}
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
                loading={signupFormLoading}
            />
        </div>
    )
}
