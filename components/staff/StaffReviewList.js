import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../../repositories/usersRepository'
import { getAllRequests, getAllRequestsWithUsers, deleteRequest, updateRequest } from '../../repositories/requestsRepository'
import { getAllOffers, getAllOffersWithUsers, deleteOffer, updateOffer } from '../../repositories/volunteersRepository'
import { getAllTasks } from '../../repositories/tasksRepository'
import hero from '../img/networking.png'
import approved from '../img/approved-sm.png'

function Staff() {

    const [ users, setUsers ] = useState([])
    const [ allRequests, setAllRequests ] = useState([])
    const [ requestsWithUsers, setRequestsWithUsers ] = useState([])
    const [ allOffers, setAllOffers ] = useState([])
    const [ offersWithUsers, setOffersWithUsers ] = useState([])
    const [ requestors, setRequestors ] = useState([])
    const [ volunteers, setVolunteers ] = useState([])
    const [ tasks, setTasks ] = useState([])
        
    useEffect(
        () => {
            getAllUsers()
            .then((users) => {
                setUsers(users)
            })
        },
        []
    )

    useEffect(
        () => {
            getAllRequests()
            .then((requests) => {
                setAllRequests(requests)
            })
        },
        []
    )

    useEffect(
        () => {
            getAllRequestsWithUsers()
            .then((requests) => {
                setRequestsWithUsers(requests)
            })
        },
        []
    )

    useEffect(
        () => {
            getAllOffers()
            .then((offers) => {
                setAllOffers(offers)
            })
        },
        []
    )

    useEffect(
        () => {
            getAllOffersWithUsers()
            .then((offers) => {
                setOffersWithUsers(offers)
            })
        },
        []
    )

    useEffect(
        () => {
            getAllTasks()
            .then((tasks) => {
                setTasks(tasks)
            })
        },
        []
    )

    useEffect(
        () => {
            const filteredUsers = users.filter(u => u.needsHelp === true)
            setRequestors(filteredUsers)
        },
        [users]
    )

    useEffect(
        () => {
            const filteredUsers = users.filter(u => u.volunteer === true)
            setVolunteers(filteredUsers)
        },
        [users]
    )

        const filterRequests = (id) => {
            const filteredRequests = requestsWithUsers.filter(r => r.userId === id)
            return filteredRequests
        }

        const filterOffers = (id) => {
            const filteredOffers = offersWithUsers.filter(o => o.userId === id)
            return filteredOffers
        }

        const findTask = (taskId) => {
            const foundTask = tasks.find(t => t.id === taskId)
            const taskName = foundTask?.task
            return taskName
        }

        const approveRequest = (id) => {
            const foundRequest = allRequests.find(r => r.id === id)
            foundRequest.approverId = parseInt(localStorage.getItem("communityCare_user"))
            updateRequest(foundRequest)
            .then(()=>{getAllRequestsWithUsers()
                .then((requests) => {
                    setRequestsWithUsers (requests)
                })
            })
        }

        const approveOffer = (id) => {
            const foundOffer = allOffers.find(o => o.id === id)
            foundOffer.approverId = parseInt(localStorage.getItem("communityCare_user"))
            updateOffer(foundOffer)
            .then(()=>{getAllOffersWithUsers()
                .then((requests) => {
                    setOffersWithUsers (requests)
                })
            })
        }

        




    return (

        <main id="container--Staff" className="container--Staff">
            <img src={hero} className="hero--Staff" alt="Networking word art" />

            <div>
                <h1>The following individuals are seeking assistance:</h1>
                {
                    requestors.map(
                        (requestor) => {
                            return <dl key={`user--${requestor.id}`}>
                                <dt>User seeking assistance:</dt>                               
                                <dd>{requestor.first_name} {requestor.last_name}</dd>
                                <dd>{requestor.address}</dd>
                                {
                                    requestor.apt ? <dd>{requestor.apt}</dd>
                                    : ""
                                }
                                <dd>{requestor.city}, TN &nbsp; {requestor.zipcode}</dd>
                                <dd>Phone: {requestor.phone}</dd>
                                <dd>Email: {requestor.email}</dd>
                                <dd> Needs assistance with:
                                    {
                                        filterRequests(requestor.id).map(
                                            (request) => {
                                                return <dl key={`user--${request.id}`}>
                                                    <dd>
                                                        {
                                                            request.approverId > 0 ? <img src={approved} alt="approved" /> : ""
                                                        }
                                                        {` ${findTask(request.taskId)} `}
                                                        {
                                                            request.approverId === 0
                                                            ? <button
                                                                className="button__approve"
                                                                onClick={() => {
                                                                    approveRequest(request.id)                                                            
                                                                }}>Approve</button>
                                                            : ""
                                                        }
                                                        
                                                        <button className="button__delete" onClick={() => {
                                                            deleteRequest(request.id)
                                                                .then(()=>{getAllRequestsWithUsers()
                                                                    .then((requests) => {
                                                                        setRequestsWithUsers(requests)
                                                                    })
                                                                })
                                                            }}>Delete</button>
                                                        
                                                    </dd>

                                                </dl>
                                            }
                                        )
                                    } 
                                </dd>
                            </dl>
                        }
                    )
                }
            </div>


            <div>
                <h1>Community Care volunteers:</h1>
                {
                    volunteers.map(
                        (volunteer) => {
                            return <dl key={`user--${volunteer.id}`}>
                                <dt>User seeking assistance:</dt>                               
                                <dd>{volunteer.first_name} {volunteer.last_name}</dd>
                                <dd>{volunteer.address}</dd>
                                {
                                    volunteer.apt ? <dd>{volunteer.apt}</dd>
                                    : ""
                                }
                                <dd>{volunteer.city}, TN &nbsp; {volunteer.zipcode}</dd>
                                <dd>Phone: {volunteer.phone}</dd>
                                <dd>Email: {volunteer.email}</dd>
                                <dd> Volunteering to assist with:
                                    {
                                        filterOffers(volunteer.id).map(
                                            (offer) => {
                                                return <dl key={`user--${offer.id}`}>
                                                    {
                                                        offer.approverId > 0 ? <img src={approved} alt="approved" /> : ""
                                                    }
                                                    <dd>{`${findTask(offer.taskId)}`}</dd>
                                                    {
                                                        offer.approverId === 0
                                                        ? <button
                                                            className="button__approve"
                                                            onClick={() => {
                                                                approveOffer(offer.id)
                                                            }}>Approve</button>
                                                        : ""
                                                    }
                                                    
                                                    <button className="button__delete" onClick={() => {
                                                        deleteOffer(offer.id)
                                                            .then(()=>{getAllOffersWithUsers()
                                                                .then((offers) => {
                                                                    setOffersWithUsers(offers)
                                                                })
                                                            })
                                                    }}>Delete</button>
                                                </dl>
                                            }
                                        )
                                    } 
                                </dd>
                            </dl>
                        }
                    )
                }
            </div>


        </main>
    )
}

export default Staff