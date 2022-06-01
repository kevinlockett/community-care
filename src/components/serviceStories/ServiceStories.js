import React, { useState, useEffect } from 'react'
import { getAllRequests } from '../../repositories/requestsRepository'
import { getAllAssignments } from '../../repositories/assignmentsRepository'
import { getAllOffers } from '../../repositories/volunteersRepository'
import hero from '../img/successStories.png'
import './ServiceStories.css'

function ServiceStories() {

    const [ allRequests, setAllRequests ] = useState([])
    const [ uniqueRequestors, setUniqueRequestors ] = useState([])
    const [ allAssignments, setAllAssignments ] = useState([])
    const [ completions, setCompletions ] = useState([])
    const [ allOffers, setAllOffers ] = useState([])
    const [ uniqueVolunteers, setUniqueVolunteers ] = useState([])
    const [ hoursDonated, setHoursDonated ] = useState([])

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
            const filteredRequestors = allRequests
                .map(request => request.userId)
                .filter((value, index, self) => self.indexOf(value) === index)
            setUniqueRequestors(filteredRequestors)
        },
        [allRequests]
    )

    useEffect(
        () => {
            getAllAssignments()
            .then((assignments) => {
                setAllAssignments(assignments)
            })
        },
        []
    )

    useEffect(
        () => {
            const filteredAssignments = allAssignments
                .filter(assignment => assignment.completed === true)
                setCompletions(filteredAssignments)
        },
        [allAssignments]
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
            const filteredVolunteers = allOffers
                .map(offer => offer.userId)
                .filter((value, index, self) => self.indexOf(value) === index)
            setUniqueVolunteers(filteredVolunteers)
        },
        [allOffers]
    )

    useEffect(
        () => {
            const totalHours = allAssignments
                .map(assignment => assignment.lengthInHours)
                .reduce((prev, curr) => prev + curr, 0)
                setHoursDonated(totalHours)
        },
        [allAssignments]
    )

    return (

        <main className="container--serviceStories">
            <div className='serviceStories--header'>
                <img src={hero} className="hero--serviceStories" alt="" />
            </div>

            <article className='serviceStories--article'>

                <div className='center serviceStories--title'>
                    By the numbers ...            
                </div>

                <section className='serviceStories--wrapper'>

                    <div className='serviceStories--list'>

                        <div className='center serviceStories--list__title'>Statistics Since Community Care Inception:</div>
                        
                        <div className='center serviceStories--list__item'>
                            {allRequests.length} requests for assistance have been received
                        </div>
                        <div className='center serviceStories--list__item'>
                            {uniqueRequestors.length} neighbors have asked for help.
                        </div>
                        <div className='center serviceStories--list__item'>
                            {uniqueVolunteers.length} volunteers have stepped up to help.
                        </div>
                        <div className='center serviceStories--list__item'>
                            {allAssignments.length} projects have been undertaken.
                        </div>
                        <div className='center serviceStories--list__item'>
                            {completions.length} projects have been completed.
                        </div>
                        <div className='center serviceStories--list__item'>
                            {hoursDonated} hours of service have been donated.
                        </div>
                    </div>
                </section>
            </article>
        </main>
    )
}

export default ServiceStories