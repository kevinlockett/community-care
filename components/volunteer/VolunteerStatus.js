import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getThisUser, getAllUsers } from '../../repositories/usersRepository'
import { getAllTasks } from '../../repositories/tasksRepository'
import { getAllOffersWithUsers, deleteOffer } from '../../repositories/volunteerRepository'
import { getAllRequestsWithUsers } from '../../repositories/requestsRepository'
import hero from '../img/volunteer-text.png'
import approved from '../img/approved-sm.png'
import './VolunteerStatus.css'

function VolunteerStatus() {

    const [ thisUser, updateThisUser ] = useState({})
    const [ tasks, setTasks ] = useState([])
    const [ offers, updateOffers ] = useState([])
    const [ offersByThisUser, setOffersByThisUser ] = useState([])
    const [ approvedOffers, setApprovedOffers ] = useState([])
    const [ nonApprovedOffers, setNonApprovedOffers ] = useState([])
    const [ requests, updateRequests ] = useState([])
    const [ approvedRequests, setApprovedRequests ] = useState([])
    const [ matches, setMatches ] = useState([])
    const [ users, setUsers ] = useState([])

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
            getAllTasks()
            .then((tasks) => {
                setTasks(tasks)
            })
        },
        []
    )

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
            getAllUsers()
            .then((users) => {
                setUsers(users)
            })
        },
        []
    )

    useEffect(
        () => {
            const filteredOffers = offers.filter(o => o.userId === thisUser.id)
            setOffersByThisUser(filteredOffers)
        },
        [offers, thisUser]
    )

    useEffect(
        () => {
            const filteredOffers = offersByThisUser.filter(o => o.approverId >= 1)
            setApprovedOffers(filteredOffers)
        },
        [offersByThisUser]
    )

    useEffect(
        () => {
            const filteredOffers = offersByThisUser.filter(o => o.approverId === 0)
            setNonApprovedOffers(filteredOffers)
        },
        [offersByThisUser]
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
            const filteredRequests = requests.filter(r => r.approverId >= 1)
            setApprovedRequests(filteredRequests)
        },
        [requests]
    )

    useEffect(
        () => {
            const possibleMatches = approvedRequests.filter(o1 => approvedOffers.some(o2 => o1.taskId === o2.taskId))
            setMatches(possibleMatches)
        },
        [approvedOffers, approvedRequests]
    )

    const findTask = (taskId) => {
        const foundTask = tasks.find(t => t.id === taskId)
        const taskName = foundTask?.task
        return taskName
    }

    const findName = (userId) => {
        const foundName = users.find(u => u.id === userId)
        const requestorName = `${foundName?.first_name} ${foundName?.last_name}`
        return requestorName
    }

    return (
        <main id="container--VolunteerStatus" className="container--VolunteerStatus">
            <img src={hero} className="hero--VolunteerStatus" alt="hands reaching out toward each other" />
            <section className='list--VolunteerStatus' id='list--VolunteerStatus'>
                
                <h1 className='center title--VolunteerStatus' >Thank you for volunteering!</h1>
            </section>

            <h3>
                    {
                        approvedOffers.length === 1 ? "You have been approved for this type of service:"
                        : approvedOffers.length > 1 ? "You have been approved for these types of service:"
                        : ""
                    }
                </h3>
                <div className = 'list--ApprovedOffers' >
                    {
                        approvedOffers.map(
                            (offer) => {
                                return <div key={`offer--${offer.id}`}>
                                    <div>
                                        <img src={approved} alt="approved" />
                                        {` ${approvedOffers.indexOf(offer) + 1} `}
                                        {`${findTask(offer.taskId)} `}
                                        <button className="button__delete" onClick={() => {
                                            deleteOffer(offer.id)
                                                .then(()=>{getAllOffersWithUsers()
                                                    .then((requests) => {
                                                        updateOffers(requests)
                                                    })
                                                })
                                        }}>Delete</button>
                                    </div>
                                </div>
                            }
                        )
                    }
                    <p className='instruction--ApprovedOffers'>
                        {
                            approvedOffers.length >= 1 ? "You will now be able to see requests for assistance that match your skills.  Please click on an item for more details and contact information."
                            : ""
                        }
                    </p>
                </div>
                <div>
                    <h3>
                        {
                            approvedOffers.length === 1 ? "This person is looking for help you may be able to provide:"
                            : approvedOffers.length >= 1 ? "These people are looking for help you may be able to provide:"
                            : ""
                        }
                    </h3>
                    <div className = 'list--ApprovedOffers' >
                        {
                            matches.map(
                                (match) => {
                                    return <div key={`match--${match.id}`}>
                                        <div>
                                            <Link to={`/users/${match.user.id}`} >
                                                {` ${findName(match.userId)} `}
                                            </Link>
                                            is looking for assistance with
                                            {`${findTask(match.taskId)}. `}
                                        </div>
                                    </div>
                                }
                            )
                        }
                        <p className='instruction--ApprovedOffers'>
                            {
                                approvedOffers.length >= 1 ? "Please select any of the requests you are interested in for more information and to accept an assignment."
                                : ""
                            }
                        </p>
                    </div>
                </div>
                <div className = 'list--NonApprovedOffers' >
                    <h3>
                        {
                            nonApprovedOffers.length >= 1 ? "You have not yet been approved for these types of service:"
                            : ""
                        }
                    </h3>
                    {
                        nonApprovedOffers.map(
                            (offer) => {
                                return <div key={`offer--${offer.id}`}>
                                    <div>
                                        {` ${nonApprovedOffers.indexOf(offer) + 1} `}
                                        {`${findTask(offer.taskId)} `}
                                        <button className="button__delete" onClick={() => {
                                            deleteOffer(offer.id)
                                                .then(()=>{getAllOffersWithUsers()
                                                    .then((requests) => {
                                                        updateOffers(requests)
                                                    })
                                                })
                                        }}>Delete</button>
                                    </div>
                                </div>
                            }
                        )
                    }
                    <p className='instruction--NonApprovedOffers'>
                        {
                            nonApprovedOffers.length >= 1 ? "We may need to review your training, safety, or certification records before you can be approved for these areas. A staff member will be reaching out to you soon."
                            : ""
                        }
                    </p>
                </div>
                <div>
                        Thanks again for volunteering to serve with us! Please reach out if you have any questions.
                </div>
        </main>
    )

}

export default VolunteerStatus