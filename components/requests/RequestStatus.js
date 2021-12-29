import React, { useState, useEffect } from 'react'
import { getThisUser, getAllUsers } from '../../repositories/usersRepository'
import { getAllRequestsWithUsers, deleteRequest } from '../../repositories/requestsRepository'
import { getAllTasks } from '../../repositories/tasksRepository'
import { getAllAssignments } from '../../repositories/assignmentsRepository'
import hero from '../img/volunteer-text.png'
import approved from '../img/approved-sm.png'
import './requests.css'

function RequestStatus() {

    const [ thisUser, updateThisUser ] = useState({})
    const [ allUsers, setAllUsers ] = useState([])
    const [ tasks, setTasks ] = useState([])
    const [ requests, updateRequests ] = useState([])
    const [ requestsByThisUser, setRequestsByThisUser ] = useState([])
    const [ approvedRequests, setApprovedRequests ] = useState([])
    const [ nonApprovedRequests, setNonApprovedRequests ] = useState([])
    const [ assignments, setAssignments ] = useState([])
    const [ assignmentsForThisUser, setAssignmentsForThisUser ] = useState([])
    const [ requestCount, setRequestCount ] = useState('')

    useEffect(
        () => {
            getThisUser(localStorage.getItem('communityCare_user'))
            .then((user) => {
                updateThisUser(user)
            })
        },
        []
    )

    useEffect(
        () => {
            getAllRequestsWithUsers()
            .then((requests) => {
                updateRequests(requests)
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
            getAllAssignments()
            .then((assignments) => {
                setAssignments(assignments)
            })
        },
        []
    )

    useEffect(
        () => {
            getAllUsers()
            .then((users) => {
                setAllUsers(users)
            })
        },
        []
    )

    useEffect(
        () => {
            const filteredRequests = requests.filter(r => r.userId === thisUser.id)
            setRequestsByThisUser(filteredRequests)
        },
        [requests, thisUser]
    )

    useEffect(
        () => {
            const filteredRequests = requestsByThisUser.filter(r => r.approverId >= 1)
            setApprovedRequests(filteredRequests)
        },
        [requestsByThisUser]
    )

    useEffect(
        () => {
            const filteredRequests = requestsByThisUser.filter(r => r.approverId === 0)
            setNonApprovedRequests(filteredRequests)
        },
        [requestsByThisUser]
    )

    useEffect(
        () => {
            const currentRequestCount = requestsByThisUser.length
            setRequestCount(`You have submitted ${currentRequestCount} requests for assistance.`)
        },
        [requestsByThisUser]
    )

    useEffect(
        () => {
            const foundHelp = assignments.filter(a => a.request.userId === thisUser.id)
            setAssignmentsForThisUser(foundHelp)
        },
        [assignments]
    )

    const findTask = (taskId) => {
        const foundTask = tasks.find(t => t.id === taskId)
        const taskName = foundTask?.task
        return taskName
    }

    const findName = (id) => {
        const foundUser = allUsers.find(u => u.id === id)
        const userName = `${foundUser.first_name}  ${foundUser.last_name}`
        return userName 
    }

    return (
        <main id="container--checkRequestStatus" className="container--checkRequestStatus">
            <img src={hero} className="hero--checkRequestStatus" alt="hands reaching out toward each other" />
            <section className='list--checkRequestStatus' id='list--checkRequestStatus'>
                <h1 className='center title--checkRequestStatus' >
                    {
                        requestsByThisUser.length === 1 ? " We have revieved your request"
                        : requestsByThisUser.length > 1 ? " We have revieved your requests"
                        : ""
                    }
                </h1>
                <h3>{ requestCount }</h3>
                <h3>
                    {
                        nonApprovedRequests.length === 1 ? "This request is under review:"
                        : nonApprovedRequests.length > 1 ? "These requests are "
                        : ""
                    }
                </h3>
                <div className = 'list--nonApprovedRequests' >
                    {
                        nonApprovedRequests.map(
                            (request) => {
                                return <div key={`request--${request.id}`}>
                                    <div>
                                        {`${nonApprovedRequests.indexOf(request) + 1} `}
                                        {`${findTask(request.taskId)} `}
                                        <button className="button__delete" onClick={() => {
                                            deleteRequest(request.id)
                                                .then(()=>{getAllRequestsWithUsers()
                                                    .then((requests) => {
                                                        updateRequests(requests)
                                                    })
                                                })
                                        }}>Delete</button>
                                    </div>
                                </div>
                            }
                        )
                    }
                    <p className='instruction--nonApprovedRequests'>
                        {
                            nonApprovedRequests.length === 1 ? "This request is "
                            : nonApprovedRequests.length > 1 ? "These requests are "
                            : ""
                        }
                        {
                            nonApprovedRequests.length >= 1 ? "being reviewed by our staff.  A staff member may be contacting you soon for more information. You can check back here in a day or two to see if your request has been approved or to edit your request."
                            : ""
                        }
                    </p>
                </div>
                <h3>
                    {
                        approvedRequests.length === 1 ? "This request has been approved:"
                        : approvedRequests.length > 1 ? "These requests have been approved:"
                        : ""
                    }
                </h3>
                <div className = 'list--approvedRequests' >
                    {
                        approvedRequests.map(
                            (request) => {
                                return <div key={`request--${request.id}`}>
                                    <div>
                                        <img src={approved} className="approved--checkRequestStatus" alt="approved check mark" />
                                        {` ${approvedRequests.indexOf(request) + 1} `}
                                        {`${findTask(request.taskId)}`}
                                    </div>
                                </div>
                            }
                        )
                    }
                    <p className='instruction--approvedRequests'>
                        {
                            approvedRequests.length === 1 ? "This request has been reviewed by our staff and is "
                            : approvedRequests.length > 1 ? "These requests have been reviewed by our staff and are "
                            : ""
                        }
                        {
                            approvedRequests.length >= 1 ? "approved. A volunteer will be contacting you soon to schedule your a convenient time to assist you with your need."
                            : ""
                        }
                    </p>
                </div>
                <div className = 'list--helpIsOnTheWay' >
                <h3>
                    {
                        assignmentsForThisUser ? "Help is on the way!" : ""
                    }
                </h3>



                {   
                    assignmentsForThisUser ?
                    assignments
                        .filter(assignment => assignment.request.userId === thisUser.id)
                        .map(
                            (assignment) => {
                                return <div key={`assignment--${assignment.id}`}>
                                    <div>
                                        {`${findName(assignment.offer.userId)} `} has volunteered to assist you with 
                                        {` ${findTask(assignment.request.taskId)}.`}
                                    </div>
                                </div>
                            }
                        )
                    : ""
                }
                <p className='instruction--nonApprovedRequests'>
                    {
                        assignmentsForThisUser.length === 1 ? "This volunteer "
                        : assignmentsForThisUser.length > 1 ? "These volunteers "
                        : ""
                    }
                    {
                        approvedRequests.length >= 1 ? "will be contacting you shortly to schedule a time to assist you."
                        : ""
                    }
                </p>
            </div>
            <div>
                <p>Please let us know if you have a further need or we can help you in the future.</p>
            </div>
            </section>
        </main>
    )


}

export default RequestStatus