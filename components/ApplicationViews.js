import React from 'react'
import { Route } from "react-router-dom"
import Home from './landingPage/LandingPage'
import Register from './register/Register'

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/Register">
                <Register />
            </Route>
        </>
    )
}
