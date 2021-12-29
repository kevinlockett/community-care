import React from 'react'
import { Route } from "react-router-dom"
import Home from './landingPage/LandingPage'
import Register from './auth/Register'
import Login from './auth/Login'
import AfterRegistration from './afterRegistration/AfterRegistration'
import RequestForm from './requests/RequestForm'
import RequestStatus from './requests/RequestStatus'
import VolunteerForm from './volunteers/VolunteerForm'
import VolunteerStatus from './volunteers/VolunteerStatus'
import RequestDetails from './requests/RequestDetails'
import StaffReviewList from './staff/StaffReviewList'
import EditProfile from './editProfile/EditProfile'
import CompletionReport from './completions/CompletionForm'
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
                <RequestForm />
            </Route>
            <Route exact path="/CheckRequestStatus">
                <RequestStatus />
            </Route>
            <Route exact path="/Volunteer">
                <VolunteerForm />
            </Route>
            <Route exact path="/VolunteerStatus">
                <VolunteerStatus />
            </Route>
            <Route exact path="/RequestDetails/:requestId(\d+)">
                <RequestDetails />
            </Route>
            <Route exact path="/LoginStaff">
                <StaffReviewList />
            </Route>
            <Route exact path="/EditProfile">
                <EditProfile />
            </Route>
            <Route exact path="/CompletionReport">
                <CompletionReport />
            </Route>
            <Route exact path="/Users">
                <UserList />
            </Route>
        </>
    )
}
