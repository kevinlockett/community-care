import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { getRequestDetails } from "../../repositories/requestsRepository"

function RequestDetails() {

    const [ request, assignRequest ] = useState({})
    
    const { requestId } = useParams()

    useEffect(
        () => {
            getRequestDetails(requestId)
            .then((request) => {
                assignRequest(request)
            })
        },
        [requestId]
    )


    return (
        <>
            <main id="container--RequestDetails" className="container--RequestDetails">
                <h2>Request Details</h2>
                <section className="RequestDetails" >
                    <div>
                        <p>{request.user?.first_name} {request.user?.last_name} needs help with {request.task?.task}</p>
                        <p>Details: {request?.details}</p>
                        <p>Requested date of completion: {request?.dateNeeded}</p>
                    </div>
                    <div>
                        <h3>Contact Information:</h3>
                        <p className="requestAddress">{request.user?.first_name} {request.user?.last_name}</p>
                        <p className="requestAddress">{request.user?.address}</p>
                        {
                            request.user?.apt ? request.user?.apt : ""
                        }
                        <p className="requestAddress">{request.user?.city}, TN &nbsp; {request.user?.zipcode}</p>                   
                        <p className="requestPhone">Phone: {request.user?.phone}</p>
                        <p className="requestEmail">Email: {request.user?.email}</p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default RequestDetails