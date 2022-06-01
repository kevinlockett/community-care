import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"
import { getRequestDetails } from "../../repositories/requestsRepository"
import './RequestDetails.css'

function RequestDetails() {

    const [ request, assignRequest ] = useState({})
    const { requestId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            getRequestDetails(requestId)
            .then((request) => {
                assignRequest(request)
            })
        },
        [requestId]
    )

    const handleClick = () => {
        history.push("/VolunteerStatus")
    }


    return (
        <>
            <main className="container--requestDetails">

                <article className='requestDetails--article'>
                    <h1 className='center requestDetails--title'>
                        Here's more information ...
                    </h1>

                    <section className='requestDetails--wrapper' >

                        <div className='requestDetails--requestInfo'>
                            <div className='requestDetails--requestInfo__title'>
                                Request Information:
                            </div>
                            <div>
                                <strong>{request.user?.first_name} {request.user?.last_name}</strong> needs help with {request.task?.task}
                            </div>
                            <div>
                                <strong>Details:</strong> {request.user?.first_name} wrote, "{request?.details}"
                            </div>
                            <div>
                                <strong>Requested date of completion:</strong> {request?.dateNeeded}
                            </div>
                        </div>
                        <div className='requestDetails--contactInfo'>
                            <div className='requestDetails--contactInfo__title'>
                                Contact Information:
                            </div>
                            <div className='requestDetails--contactInfo__name'>
                                {request.user?.first_name} {request.user?.last_name}                        
                            </div>
                            <div className='requestDetails--contactInfo__address'>
                                {request.user?.address} &nbsp;
                                {
                                    request.user?.apt ? request.user?.apt : ""
                                }
                            </div>
                            <div className='requestDetails--contactInfo__cityStzteZip'>
                                {request.user?.city}, TN &nbsp; {request.user?.zipcode}
                            </div>
                            <div className='requestDetails--contactInfo__phone'>
                                Phone: {request.user?.phone}
                            </div>
                            <div className='requestDetails--contactInfo__email'>
                                Email: {request.user?.email}
                            </div>
                        </div>
                        <div className='button--requestDetails'>
                            <button className='btn--requestDetails'
                                onClick={() => {
                                    handleClick()
                                }}>
                                    <span>Go Back</span>
                            </button>
                        </div>
                    </section>
                </article>
            </main>
        </>
    )
}

export default RequestDetails