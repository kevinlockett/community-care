import React from 'react'
import { Route } from 'react-router-dom'
import NavBar from '../nav/NavBar'
import { ApplicationViews } from '../ApplicationViews'
import Footer from '../footer/Footer'
import './CommunityCare.css'

export const CommunityCare = () => (
    <>
        <Route
            render={() => {
                return (
                    <>
                        <NavBar />
                        <ApplicationViews />
                        <Footer />
                    </>
                )
            }}
        />
    </>
)