import React, { useState, useEffect } from 'react'
import { getAllRequests } from '../../repositories/requestsRepository'
import { getAllAssignments } from '../../repositories/assignmentsRepository'
import { getAllOffers } from '../../repositories/volunteersRepository'

import hero from '../img/networking.png'

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
                .filter((assignment => assignment.completed === true))
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
        <main id="serviceStories" className="serviceStories">
            <img src={hero} className="hero--serviceStories" alt="hands reaching out toward each other" />
            <section className='list--serviceStories' id='list--serviceStories'>
                <h1 className='center title--serviceStories' >By the numbers ...</h1>
            </section>
            <section className='list--serviceStories__total' id='list--serviceStories__total'>
                <h2 className='center'>Statistics Since Program Inception:</h2>
                <h3 className='center'>{allRequests.length} requests for assistance have been received</h3>
                <h3 className='center'>{uniqueRequestors.length} neighbors have asked for help.</h3>
                <h3 className='center'>{uniqueVolunteers.length} volunteers have stepped up to help.</h3>
                <h3 className='center'>{allAssignments.length} projects have been undertaken.</h3>
                <h3 className='center'>{completions.length} projects have been completed.</h3>
                <h3 className='center'>{hoursDonated} hours of service have been donated.</h3>
            </section>
        </main>
    )
}

export default ServiceStories