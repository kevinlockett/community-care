import React from 'react'
import { Route } from "react-router-dom"
import Home from './landingPage/LandingPage'
import Register from './auth/Register'
import Login from './auth/Login'
import AfterRegistration from './afterRegistration/AfterRegistration'
import NeedHelpForm from './needHelp/NeedHelpForm'
import NeedHelpStatus from './needHelp/NeedHelpStatus'
import VolunteerForm from './volunteer/VolunteerForm'
import VolunteerStatus from './volunteer/VolunteerStatus'
import StaffReviewList from './staff/StaffReviewList'
import UserList from './users/UserList'

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/Register">
                <Register />
            </Route>
            <Route exact path="/Login">
                <Login />
            </Route>
            <Route exact path="/AfterRegistration">
                <AfterRegistration />
            </Route>
            <Route exact path="/GetHelp">
                <NeedHelpForm />
            </Route>
            <Route exact path="/CheckRequestStatus">
                <NeedHelpStatus />
            </Route>
            <Route exact path="/Volunteer">
                <VolunteerForm />
            </Route>
            <Route exact path="/VolunteerStatus">
                <VolunteerStatus />
            </Route>
            <Route exact path="/users">
                <UserList />
            </Route>
            <Route path="/users/:userId">
                <UserList />
            </Route>
            <Route exact path="/loginStaff">
                <StaffReviewList />
            </Route>
        </>
    )
}
