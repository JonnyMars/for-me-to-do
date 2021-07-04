import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import {useAuth} from '../../_contexts/AuthContext'

export default function PrivateRoute({component: Component, ...rest}) {

    const {currentUser} = useAuth();
    console.log("PRIVATE ROUTE", currentUser)

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}
        >
        </Route>
    )
}
