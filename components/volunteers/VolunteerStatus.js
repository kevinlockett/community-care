import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getAllTasks } from '../../repositories/tasksRepository'
import { getAllOffersWithUsers, deleteOffer } from '../../repositories/volunteersRepository'
import { getAllRequestsWithUsers } from '../../repositories/requestsRepository'
import { getAllAssignments, addAssignment, cancelAssignment } from '../../repositories/assignmentsRepository'
import hero from '../img/volunteerSign.png'
import approved from '../img/approved-sm.png'
import './VolunteerStatus.css'

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
                .filter(assignment => assignment.offer?.userId === parseInt(localStorage.getItem('communityCare_user')))
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
            : matches.length > 1 ? setMatchesMessage("You may be able to help with these requests:")
            : setMatchesMessage("")
        },
        [matches]
    )

    useEffect(
        () => {
            allAssignments.length === 1 ? setAssignmentsMessage("You have accepted this assignment:")
            : allAssignments.length > 1 ? setAssignmentsMessage("You have accepted these assignments:")
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

        <main className='container--volunteerStatus'>

            <div className='volunteerStatus--header'>
                <img src={hero} className="hero--volunteerStatus" alt="" />
            </div>

            <article className='volunteerStatus--article'>
                <h1 className='center volunteerStatus--title' >Thank you for volunteering!</h1>

                <section className='volunteerStatus--wrapper' >
                
                    <div className='volunteerStatus--approved'>
                        <div className='volunteerStatus--approved__title'>
                            {approvedMessage}
                        </div>
                        <div className='volunteerStatus--approved__list' >
                            {
                                approvedOffersByThisUser
                                    .map(
                                        (offer) => {
                                            return <div key={`offer--${offer.id}`} className='volunteerStatus--approved__list--item' >
                                                <img src={approved} alt="approved" />
                                                {` ${approvedOffersByThisUser.indexOf(offer) + 1} `}
                                                {`${findTask(offer.taskId)} `}
                                                <button
                                                    className="btn--volunteerStatus"
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
                    </div>

                    <div className='volunteerStatus--matched' >
                        <div className='volunteerStatus--matched__title' >
                            {matchesMessage}
                        </div>
                        <div className='volunteerStatus--matched__comments' >
                            {
                                matches.length >= 1 ? 'Please click on a name for more details and contact information. Click "Accept" to accept an assignment.'
                                : ""
                            }
                        </div>
                        <div className='volunteerStatus--matched__list' >
                            {
                                matches.map(
                                    (match) => {
                                        return <div key={`request--${match.id}`} className='volunteerStatus--matched__list--item'>
                                            <Link to={`/RequestDetails/${match.id}`} >
                                                {` ${findName(match.userId)} `}
                                            </Link>
                                            &nbsp; is looking for assistance with
                                            {`${findTask(match.taskId)}. `}
                                            <button
                                                className="btn--volunteerStatus"
                                                onClick={
                                                    (e) => {
                                                        const newAssignment = {}
                                                        newAssignment.requestId = match.id
                                                        newAssignment.taskId = match.taskId
                                                        newAssignment.completed = false
                                                        newAssignment.lengthInHours = 0
                                                        acceptAssignment(newAssignment)
                                                    }   
                                                }
                                            ><span>Accept</span></button>
                                        </div>
                                    }
                                )
                            }
                        </div>
                    </div>


                    <div className='volunteerStatus--assigned'>
                        <div className='volunteerStatus--assigned__title'>
                            {assignmentsMessage}
                        </div>
                        <div className='volunteerStatus--assigned__comments'>
                            {
                                acceptedAssignments.length >= 1 ? 'Please contact the requestor and schedule a work appointment as soon as possible. If you are unable to complete the assignment, please click "Cancel."'
                                : ""
                            }
                        </div>
                        <div className='volunteerStatus--assigned__list'>
                            {
                                acceptedAssignments.map(
                                    (assignment) => {
                                        return <div key={`assignment--${assignment.requestId}`} className="volunteerStatus--assigned__list--item">
                                            You have aggreed to assist &nbsp;
                                            <Link to={`/RequestDetails/${assignment.requestId}`}>
                                                {`${findName(assignment.request?.userId)}`}
                                            </Link>
                                            &nbsp; with {`${findTask(assignment?.taskId)} `} by {`${assignment.request?.dateNeeded}`}.&nbsp;
                                            <button className="btn--volunteerStatus"
                                                onClick={() => {
                                                    if (assignment.hasOwnProperty('id')) {
                                                        localStorage.setItem('completedAssignment', assignment.id)
                                                        history.push('/CompletionReport')
                                                    }
                                                }}><span>Complete</span>
                                            </button>
                                            <button className="btn--volunteerStatus"
                                                onClick={() => {
                                                    cancelAssignment(assignment.id)
                                                        .then(()=>{getAllAssignments()
                                                            .then((allAssignments) => {
                                                                updateAllAssignments(allAssignments)
                                                            })
                                                        })
                                                    }}><span>Cancel</span></button>
                                        </div>
                                    }
                                )
                            }
                        </div>
                    </div>

                    <div className='volunteerStatus--underReview'>
                        <div className='volunteerStatus--underReview__title'>
                            {nonApprovedMessage}
                        </div>
                        <div className='volunteerStatus--underReview__list'>
                            {
                                offers
                                    .filter(offer => offer.userId === parseInt(localStorage.getItem('communityCare_user')))
                                    .filter(offer => offer.approverId === 0)
                                    .map(
                                        (offer) => {
                                            return <div key={`offer--${offer.id}`} className="volunteerStatus--underReview__list--item">
                                                {` ${nonApprovedOffersByThisUser.indexOf(offer) + 1} `}
                                                {`${findTask(offer.taskId)} `}
                                                <button className="btn--volunteerStatus"
                                                    onClick={() => {
                                                        deleteOffer(offer.id)
                                                        .then(()=>{getAllOffersWithUsers()
                                                            .then((requests) => {
                                                                updateOffers(requests)
                                                            })
                                                        })
                                                    }
                                                }><span>Delete</span></button>
                                            </div>
                                        }
                                    )
                            }
                        </div>
                        <div className='volunteerStatus--underReview__comments'>
                            {
                                nonApprovedOffersByThisUser.length >= 1 ? "We may need to review your training, safety, or certification records before you can be approved for these areas. A staff member will be reaching out to you soon."
                                : ""
                            }
                        </div>
                    </div>

                    <div className='volunteerStatus--footer center'>
                        Thank you again for volunteering to serve with us! <br/> Please reach out if you have any questions.
                    </div>

                </section>
            </article>
        </main>
    )

}

export default VolunteerStatus