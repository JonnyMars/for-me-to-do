import React, { useState } from 'react'
import { checkValidity, authFormInitialState } from '../../common/utility';
import AuthForm from '../../_components/AuthForm/AuthForm';
import styles from "./SignUp.module.scss";



export default function SignUp() {
    
    const [signupFormConfig, setSignupFormConfig] = useState({...authFormInitialState})


    function inputChangedHandler(e, controlName) {
        const updatedConfig = {...signupFormConfig};
        updatedConfig[controlName].value = e.target.value;
        updatedConfig[controlName].valid = checkValidity(e.target.value, updatedConfig[controlName].validation);
        setSignupFormConfig(updatedConfig);
    }

    function inputBlurHandler(e, controlName) {
        const updatedConfig = {...signupFormConfig};
        updatedConfig[controlName].touched = e.target.value.length > 0;
        setSignupFormConfig(updatedConfig);
    }


    function submitHandler(e) {
        e.preventDefault();
        console.log("Login Submit")
    }



    const signupFormElementsArray = [];

    for(let key in signupFormConfig) {
        signupFormElementsArray.push({
            id: key,
            config: signupFormConfig[key]
        })
    }



    return (
        <div className={`container flex flex-center`}>
            <AuthForm
                formTitle="Sign Up"
                buttonText="Sign Up"
                submit={submitHandler}
                formElements={signupFormElementsArray}
                change={inputChangedHandler}
                blur={inputBlurHandler}
            />
        </div>
    )
}
