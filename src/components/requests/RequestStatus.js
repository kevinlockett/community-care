import React, { useState, useEffect } from 'react'
import { getThisUser, getAllUsers } from '../../repositories/usersRepository'
import { getAllRequestsWithUsers, deleteRequest } from '../../repositories/requestsRepository'
import { getAllTasks } from '../../repositories/tasksRepository'
import { getAllAssignments } from '../../repositories/assignmentsRepository'
import hero from '../img/volunteerGraphic.png'
import approved from '../img/approved-sm.png'
import './RequestStatus.css'

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
        [assignments, thisUser.id]
    )

    const findTask = (taskId) => {
        const foundTask = tasks.find(t => t.id === taskId)
        const taskName = foundTask?.task
        return taskName
    }

    const findName = (id) => {
        const foundUser = allUsers.find(u => u.id === id)
        const userName = `${foundUser?.first_name}  ${foundUser?.last_name}`
        return userName 
    }

    return (

        <main className="container--requestStatus">

            <div className='requestStatus--header'>
                <img src={hero} className="hero--requestStatus" alt="" />
            </div>

            <article className='requestStatus--article'>
                <div className='center requestStatus--title' >
                    {
                        requestsByThisUser.length === 1 ? " We have revieved your request"
                        : requestsByThisUser.length > 1 ? " We have revieved your requests"
                        : ""
                    }
                </div>
            
                <section className='requestStatus--wrapper'>
            
                    <div className='requestStatus--count'>
                        <div className='requestStatus--count__title'>
                            { requestCount }
                        </div>
                    </div>
                
                    <div className='requestStatus--underReview'>
                        <div className='requestStatus--underReview__title'>
                            {
                                nonApprovedRequests.length === 1 ? "This request is still under review:"
                                : nonApprovedRequests.length > 1 ? "These requests are still under review:"
                                : ""
                            }
                        </div>
                        <div className = 'requestStatus--underReview__list'>
                            {
                                nonApprovedRequests.map(
                                    (request) => {
                                        return <div key={`request--${request.id}`} className="requestStatus--underReview__list--item">
                                            <div>
                                                {`${nonApprovedRequests.indexOf(request) + 1} `}
                                                {`${findTask(request.taskId)} `}
                                                <button className="btn--requestStatus" onClick={() => {
                                                    deleteRequest(request.id)
                                                        .then(()=>{getAllRequestsWithUsers()
                                                            .then((requests) => {
                                                                updateRequests(requests)
                                                            })
                                                        })
                                                }}><span>Delete</span></button>
                                            </div>
                                        </div>
                                    }
                                )
                            }
                        </div>
                        <div className='requestStatus--underReview__comments'>
                            {
                                nonApprovedRequests.length === 1 ? "This request is "
                                : nonApprovedRequests.length > 1 ? "These requests are "
                                : ""
                            }
                            {
                                nonApprovedRequests.length >= 1 ? "being reviewed by our staff.  A staff member may be contacting you soon for more information. You can check back here in a day or two to see if your request has been approved or to edit your request."
                                : ""
                            }
                        </div>
                    </div>
            
            
                    <div className='requestStatus--approved'>
                        <div className = 'requestStatus--approved__title'>
                            {
                                approvedRequests.length === 1 ? "This request has been approved:"
                                : approvedRequests.length > 1 ? "These requests have been approved:"
                                : ""
                            }
                        </div>
                        <div className = 'requestStatus--approved__list'>
                            {
                                approvedRequests.map(
                                    (request) => {
                                        return <div key={`request--${request.id}`} className="requestStatus--approved__list--item">
                                            <div>
                                                <img src={approved} className="approved--checkRequestStatus" alt="approved check mark" />
                                                {` ${approvedRequests.indexOf(request) + 1} `}
                                                {`${findTask(request.taskId)}`}
                                            </div>
                                        </div>
                                    }
                                )
                            }
                        </div>
                        <div className='requestStatus--approved__comments'>
                            {
                                approvedRequests.length === 1 ? "This request has been reviewed by our staff and is "
                                : approvedRequests.length > 1 ? "These requests have been reviewed by our staff and are "
                                : ""
                            }
                            {
                                approvedRequests.length >= 1 ? "approved. A volunteer will be contacting you soon to schedule your a convenient time to assist you with your need."
                                : ""
                            }
                        </div>
                    </div>

                    <div className='requestStatus--assigned'>
                        <div className='requestStatus--assigned__title' >
                            {
                                assignmentsForThisUser ? "Help is on the way!" : ""
                            }
                        </div>
                        <div className='requestStatus--assigned__list' >
                            {   
                                assignmentsForThisUser ?
                                assignments
                                    .filter(assignment => assignment.request.userId === thisUser.id)
                                    .map(
                                        (assignment) => {
                                            return <div key={`assignment--${assignment.id}`} className="requestStatus--assigned__list--item">
                                                <div>
                                                    {`${findName(assignment.offer.userId)} `} has  volunteered to assist you with 
                                                    {` ${findTask(assignment.request.taskId)}.`}
                                                </div>
                                            </div>
                                        }
                                    )
                                : ""
                            }
                        </div>
                        <div className='requestStatus--assigned__comments'>
                            {
                                assignmentsForThisUser.length === 1 ? "This volunteer "
                                : assignmentsForThisUser.length > 1 ? "These volunteers "
                                : ""
                            }
                            {
                                approvedRequests.length >= 1 ? "will be contacting you shortly to schedule a time to assist you."
                                : ""
                            }
                        </div>
                    </div>
                
                    <div className='center requestStatus--footer'>
                        Please let us know if you have a further need <br/> or if we can help you in the future.
                    </div>
                </section>
            </article>
        </main>
    )


}

export default RequestStatus