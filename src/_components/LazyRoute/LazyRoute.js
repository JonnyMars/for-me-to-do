import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'

export default function LazyRoute({...rest}) {

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Route
                {...rest}
            />
        </Suspense>
    )
}
