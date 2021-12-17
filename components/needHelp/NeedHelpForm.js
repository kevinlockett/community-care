import React, { useState, useEffect } from 'react'
import { getThisUser, updateUser } from '../../repositories/usersRepository'
import { getAllTasks } from '../../repositories/tasksRepsitory'
import { postRequest } from '../../repositories/requestsRepository'
import { useHistory } from 'react-router-dom'

import hero from '../img/help.png'
import './NeedHelpForm.css'

function NeedHelpForm() {

    const [ thisUser, updateThisUser ] = useState({})
    const [ tasks, updateTasks ] = useState([])
    const [ request, updateRequest ] = useState({})
    const history = useHistory()

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
                    updateTasks(tasks)
                })
        },
        []
    )
    
    const submitRequest = (e) => {
        e.preventDefault()
        const copy = {...thisUser}
        copy.needsHelp = true
        updateUser(copy)
            .then (
                () => {
                    const newRequest = {
                        userId: +localStorage.getItem("communityCare_user"),
                        approverId: 0,
                        taskId: parseInt(request.taskId),
                        details: request.details,
                        dateNeeded: request.dateNeeded
                    }

                    return postRequest(newRequest)
                        .then(() => {
                        history.push("/CheckRequestStatus")
                        })
                }
            )        
    }

    return (
        <main id="container--needHelp" className="container--needHelp">
            <img src={hero} className="hero--heedHelp" alt="hands reaching out toward each other" />
            <section className='form--needHelp' id='form--needHelp'>
                
            
                <h1 className='center title--needHelp' >Thanks for reaching out!</h1>
                <section className='intro--needHelp'>
                    <p>
                        {thisUser?.first_name}, we believe helping others is one way we can practice the way of Jesus. If you’re walking through a difficult season or facing significant life challenges &#8212; perhaps an illness or physical limitation, or maybe doing the hard work of parenting as a single person, or serving as a foster-parent, you shouldn't have to do it all alone. We want to help as we are able.  Let's get started!
                    </p>
                </section>
                <section className='userProfile--needHelp' >
                    <div>
                        Name: {thisUser.first_name} {thisUser.last_name}
                    </div>
                    <div>
                        Address: {thisUser.address} {thisUser.apt}, {thisUser.city}, TN  {thisUser.zipcode}
                    </div>
                    <div>
                        Phone: {thisUser.phone}
                    </div>
                    <div>
                        Email: {thisUser.email}
                    </div>
                    <div>
                        <p>If any of this information is not correct, please click the button below to edit your profile.</p>
                        <button className='btn btn--edit-profile'
                        onClick={() => {

                        }}><span>Edit Profile</span></button>
                    </div>
                </section>
                <section className='requestHelp'>
                    <h2>Tell us more about how we can help you.</h2>
                    <form id="form--requestHelp" className="form--requestHelp">
                        <fieldset>
                            Select what kind of assistance your are currently seeking from the list below.
                            <select
                                id="form--requestHelp__input--type"
                                className="form--requestHelp__input--type"
                                onChange={
                                    (e) => {
                                        const copy = {...request}
                                        copy.taskId = e.target.value
                                        updateRequest(copy)
                                    }
                                } 
                            >
                                <option value="0" label="Please select the type of assistance you are seeking"></option>
                                    {
                                        tasks.map(
                                            (task) => {
                                                return <option value={task.id} key={`task--${task.id}`}>
                                                    { task.task }
                                                </option>
                                            }
                                        )
                                    }
                            </select>
                        </fieldset>
                        <fieldset>
                            <label htmlFor='requestHelp__details'> Please give us more details about the kind of assistance you need. </label>
                            <textarea
                                onChange={
                                    (e) => {
                                        const copy = {...request}
                                        copy.details = e.target.value
                                        updateRequest(copy)
                                    }
                                } 
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='requestHelp__deadline'> When do you need this assistance? </label>
                            <input
                                type='date'
                                id='requestHelp__deadline'
                                onChange={
                                    (e) => {
                                        const copy = {...request}
                                        copy.dateNeeded = e.target.value
                                        updateRequest(copy)
                                    }
                                } 
                            />
                        </fieldset>
                        <fieldset>
                            <button type="submit" className="btn btn--requestHelp" onClick={submitRequest} > Submit Request </button>
                        </fieldset>
                    </form>
                </section>
            </section>
        </main>
    );

}

export default NeedHelpForm