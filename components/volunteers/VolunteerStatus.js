import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getAllTasks } from '../../repositories/tasksRepository'
import { getAllOffersWithUsers, deleteOffer } from '../../repositories/volunteersRepository'
import { getAllRequestsWithUsers } from '../../repositories/requestsRepository'
import { getAllAssignments, addAssignment, cancelAssignment } from '../../repositories/assignmentsRepository'
import hero from '../img/volunteer-text.png'
import approved from '../img/approved-sm.png'
import './volunteers.css'

function VolunteerStatus() {

    const [ offers, updateOffers ] = useState([])
    const [ approvedOffersByThisUser, setApprovedOffers ] = useState([])
    const [ tasks, setTasks ] = useState([])
    const [ requests, updateRequests ] = useState([])
    const [ allAssignments, updateAllAssignments ] = useState([])
    const [ nonApprovedOffersByThisUser, setNonApprovedOffers ] = useState([])
    const [ acceptedAssignments, setAcceptedAssignments ] = useState([])
    const [ approvedMessage, setApprovedMessage ] = useState("")
    const [ nonApprovedMessage, setNonApprovedMessage ] = useState("")
    const [ matchesMessage, setMatchesMessage ] = useState("")
    const [ assignmentsMessage, setAssignmentsMessage ] = useState("")
    const [ matches, setMatches ] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            getAllOffersWithUsers()
            .then((offers) => {
                updateOffers(offers)
            })
        },
        []
    )

    useEffect(
        () => {
            const filteredOffers = offers
                .filter(offer => offer.userId === parseInt(localStorage.getItem('communityCare_user')))
                .filter(offer => offer.approverId > 0)
                setApprovedOffers(filteredOffers)
        },
        [offers]
    )

    useEffect(
        () => {
            approvedOffersByThisUser.length === 1 ? setApprovedMessage("You have been approved for this type of service:")
            : approvedOffersByThisUser.length > 1 ? setApprovedMessage("You have been approved for these types of service:")
            : setApprovedMessage("")
        },
        [approvedOffersByThisUser]
    )

    const findName = (userId) => {
        const foundUser = requests.find(request => request.userId === userId)
        const requestorName = `${foundUser?.user.first_name} ${foundUser?.user.last_name}`
        return requestorName
    }
    
    useEffect(
        () => {
            getAllTasks()
            .then((tasks) => {
                setTasks(tasks)
            })
        },
        []
    )
    
    const findTask = (taskId) => {
        const foundTask = tasks.find(t => t.id === taskId)
        const taskName = foundTask?.task
        return taskName
    }

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
            getAllAssignments()
            .then((assignments) => {
                updateAllAssignments(assignments)
            })
        },
        []
    )

    useEffect(
        () => {
            const filteredAssignments = allAssignments
                .filter(assignment => assignment.offer.userId === parseInt(localStorage.getItem('communityCare_user')))
                .filter(assignment => assignment.completed === false)
                setAcceptedAssignments(filteredAssignments)
        },
        [allAssignments]
    )

    useEffect(
        () => {
            const possibleMatches = requests
                .filter(o1 => !allAssignments
                    .some(o2 => o1.id === o2.requestId))
                .filter(request => request.approverId > 0)
                .filter(o1 => offers
                    .filter(offer => offer.userId === parseInt(localStorage.getItem('communityCare_user')))
                    .filter(offer => offer.approverId > 0)
                    .some(o2 => o1.taskId === o2.taskId))
                    setMatches(possibleMatches)
        },
        [requests, offers, allAssignments, acceptedAssignments]
    )

    useEffect(
        () => {
            matches.length === 1 ? setMatchesMessage("You may be able to help with this request:")
            : matches.length > 1 ? setMatchesMessage("You may be able to help with these requests")
            : setMatchesMessage("")
        },
        [matches]
    )

    useEffect(
        () => {
            allAssignments.length === 1 ? setAssignmentsMessage("You have accepted this assignment:")
            : allAssignments.length > 1 ? setAssignmentsMessage("You have accepted these assignments")
            : setAssignmentsMessage("")
        },
        [allAssignments]
    )

    useEffect(
        () => {
            const filteredOffers = offers
                .filter(offer => offer.userId === parseInt(localStorage.getItem('communityCare_user')))
                .filter(offer => offer.approverId === 0)
                setNonApprovedOffers(filteredOffers)
        },
        [offers]
    )
    
    useEffect(
        () => {
            nonApprovedOffersByThisUser.length === 1 ? setNonApprovedMessage("You have not yet been approved for this type of service:")
            : nonApprovedOffersByThisUser.length > 1 ? setNonApprovedMessage("You have been not yet been approved for these types of service:")
            : setNonApprovedMessage("")
        },
        [nonApprovedOffersByThisUser]
    )

    const acceptAssignment = (newAssignment) => {
        const findOfferId = approvedOffersByThisUser.find(offer => offer.taskId === newAssignment.taskId)
        newAssignment.offerId = findOfferId.id
        addAssignment(newAssignment)
        .then(() => {
            getAllAssignments()
            .then((assignments) => {
                updateAllAssignments(assignments)
            })
        })
    }

    return (
        <main id="container--VolunteerStatus" className="container--VolunteerStatus">
            <img src={hero} className="hero--VolunteerStatus" alt="hands reaching out toward each other" />
            <section className='list--VolunteerStatus' id='list--VolunteerStatus'>
                
                <h1 className='center title--VolunteerStatus' >Thank you for volunteering!</h1>
            </section>
            
            
            <section>
                <h3>
                    {approvedMessage}
                </h3>
                <div className = 'list--ApprovedOffers' >
                    {
                        approvedOffersByThisUser
                            .map(
                                (offer) => {
                                    return <div key={`offer--${offer.id}`}>
                                        
                                        <img src={approved} alt="approved" />
                                        {` ${approvedOffersByThisUser.indexOf(offer) + 1} `}
                                        {`${findTask(offer.taskId)} `}
                                        <button
                                            className="button__delete"
                                            onClick={() => {
                                                deleteOffer(offer.id)
                                                .then(
                                                    ()=>{
                                                        getAllOffersWithUsers()
                                                        .then((requests) => {
                                                            updateOffers(requests)
                                                        })
                                                    })
                                            }}><span>Delete</span></button>
                                </div>
                            }
                        )
                    }
                </div>
            </section>


            <section className='list--matchedOffersList' >
                <h3>
                    {matchesMessage}
                </h3>
                <p className='instruction--ApprovedOffers'>
                    {
                        matches.length >= 1 ? 'Please click on a name for more details and contact information. Click "Accept" to accept an assignment.'
                        : ""
                    }
                </p>

                <div>

                    {
                        matches.map(
                            (match) => {
                                return <div key={`request--${match.id}`}>
                                    <Link to={`/RequestDetails/${match.id}`} >
                                        {` ${findName(match.userId)} `}
                                    </Link>
                                    is looking for assistance with
                                    {`${findTask(match.taskId)}. `}
                                    <button
                                        className="button__accept"
                                        onClick={
                                            (e) => {
                                                const newAssignment = {}
                                                newAssignment.requestId = match.id
                                                newAssignment.taskId = match.taskId
                                                newAssignment.completed = false
                                                acceptAssignment(newAssignment)
                                                
                                            }   
                                        }
                                    >Accept</button>
                                </div>
                            }
                        )
                    }

                </div>

            </section>

            <section className='list--acceptedAssignmentsList' >
                <h3>
                    {assignmentsMessage}
                </h3>
                <p className='instruction--AcceptedAssignments'>
                    {
                        acceptedAssignments.length >= 1 ? 'Please contact the requestor and schedule a work appointment as soon as possible. If you are unable to complete the assignment, please click "Cancel."'
                        : ""
                    }
                </p>

                <div>

                    {
                        acceptedAssignments.map(
                            (assignment) => {
                                return <div key={`assignment--${assignment.requestId}`}>
                                    You have aggreed to assist &nbsp;
                                    <Link to={`/RequestDetails/${assignment.requestId}`}>
                                        {`${findName(assignment.request?.userId)}`}
                                    </Link>
                                    &nbsp; with {`${findTask(assignment?.taskId)} `} by {`${assignment.request?.dateNeeded}`}.&nbsp;
                                    <button className="button__complete" onClick={() => {
                                        if (assignment.hasOwnProperty('id')) {
                                            localStorage.setItem('completedAssignment', assignment.id)
                                            history.push('/CompletionReport')
                                        }
                                    }}>Complete</button>
                                    <button className="button__cancel" onClick={() => {
                                        cancelAssignment(assignment.id)
                                            .then(()=>{getAllAssignments()
                                                .then((allAssignments) => {
                                                    updateAllAssignments(allAssignments)
                                                })
                                            })
                                        }}>Cancel</button>
                                </div>
                            }
                        )
                    }
                    

                </div>

            </section>

            <section className='list--NonApprovedOffers' >
                <h3>
                    {nonApprovedMessage}
                </h3>

                {
                    offers
                        .filter(offer => offer.userId === parseInt(localStorage.getItem('communityCare_user')))
                        .filter(offer => offer.approverId === 0)
                        .map(
                            (offer) => {
                                return <div key={`offer--${offer.id}`}>
                                    {` ${nonApprovedOffersByThisUser.indexOf(offer) + 1} `}
                                    {`${findTask(offer.taskId)} `}
                                    <button className="button__delete" onClick={() => {
                                        deleteOffer(offer.id)
                                            .then(()=>{getAllOffersWithUsers()
                                                .then((requests) => {
                                                    updateOffers(requests)
                                                })
                                            })
                                        }
                                    }>Delete</button>
                                </div>
                            }
                        )
                }
                <p className='instruction--nonApprovedOffersByThisUser'>
                    {
                        nonApprovedOffersByThisUser.length >= 1 ? "We may need to review your training, safety, or certification records before you can be approved for these areas. A staff member will be reaching out to you soon."
                        : ""
                    }
                </p>
                <div>
                    Thanks again for volunteering to serve with us! Please reach out if you have any questions.
                </div>
            </section>

        </main>
    )

}

export default VolunteerStatus