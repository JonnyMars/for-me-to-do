export const FIREBASE_WEB_KEY = `AIzaSyBqma4UGNbC2yo_KkJN9yklhALa_X8CEWQ`;

export const authFormInitialState = {
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


export function checkValidity(value, rules) {

    let isValid = true;

    if(rules.required) {
        isValid = value.trim() !== "" && isValid;
    }

    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.isEmail) {
        const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
        isValid = pattern.test(value) && isValid;
    }

    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;


}

export const authAttemptErrorMap = {
    EMAIL_EXISTS: "This email address is already in use by another account.",
    OPERATION_NOT_ALLOWED: "Password sign-in is disabled for this project.",
    TOO_MANY_ATTEMPTS_TRY_LATER: "We have blocked all requests from this device due to unusual activity. Try again later.",
    EMAIL_NOT_FOUND: "There is no user record corresponding to this email address.",
    INVALID_PASSWORD: "The password you have provided is invalid.",
    USER_DISABLED: "The user account has been disabled by an administrator."
}