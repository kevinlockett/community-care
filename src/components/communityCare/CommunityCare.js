import React from 'react'
import { Route } from 'react-router-dom'
import NavBar from '../nav/NavBar'
import { ApplicationViews } from '../ApplicationViews'
import Footer from '../footer/Footer'
import './CommunityCare.css'

function CommunityCare() {

    return (
        <>
            <Route
                render={() => {
                    return (
                        <>
                            <main id="container--main">
                                <NavBar />
                                <ApplicationViews />
                                <Footer />
                            </main>
                        </>
                    )
                }}
            />
        </>
    )
}

export default CommunityCare