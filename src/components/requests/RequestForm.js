import React, { useState, useEffect } from 'react'
import { getThisUser, updateUser } from '../../repositories/usersRepository'
import { getAllTasks } from '../../repositories/tasksRepository'
import { postRequest } from '../../repositories/requestsRepository'
import { useHistory } from 'react-router-dom'

import hero from '../img/help.png'
import './RequestForm.css'

function RequestForm() {

    const [ thisUser, updateThisUser ] = useState({})
    const [ tasks, updateTasks ] = useState([])
    const [ request, updateRequest ] = useState({})
    const history = useHistory()


    const handleEditProfileClick = () => {
        history.push("/EditProfile")
    }

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

        <main id="container--requestForm" className="container--requestForm">
            
            <div className='header--requestForm'>
                <img src={hero} className="hero--requestForm" alt="hands reaching out toward each other" />            
            </div>

            <article className='form--requestForm__container'>
                <h1 className='center title--requestForm' >Thanks for reaching out!</h1>
                <section className='form--requestForm__wrapper'>
                    <div className='form--requestForm__intro'>
                        <legend><span>Welcome, {thisUser?.first_name}!</span></legend>
                        <div className='form--requestForm__text'>
                            <p>
                                At COTC we believe helping others is one way we can practice the way of Jesus. If you’re walking through a difficult season or facing significant life challenges &#8212; perhaps an illness or physical limitation, or maybe doing the hard work of parenting as a single person, or serving as a foster-parent &#8212; we believe you shouldn’t have to do it all alone. We want to help as we are able.  Let’s get started!
                            </p>
                            <p>
                                First, please check out the information below.  This is information that you have already told us about yourself. We want to make sure everything here is correct.
                            </p>
                        </div>
                        <div className="form--requestForm__userProfile" >
                            <div className='userProfile--details'>
                                <div className="fieldTitle">
                                    Name: 
                                </div>
                                <div className="fieldDetails">
                                {thisUser.first_name} {thisUser.last_name}
                                </div>
                            </div>
                            <div className='userProfile--details'>
                                <div className="fieldTitle">
                                    Address: 
                                </div>
                                <div className="fieldDetails">
                                    {thisUser.address} {thisUser.apt}, {thisUser.city}, TN  {thisUser.zipcode}
                                </div>
                            </div>
                            <div className='userProfile--details'>
                                <div className="fieldTitle">
                                    Phone:  
                                </div>
                                <div className="fieldDetails">
                                    {thisUser.phone}
                                </div>
                            </div>
                            <div className='userProfile--details'>
                                <div className="fieldTitle">
                                    Email:   
                                </div>
                                <div className="fieldDetails">
                                    {thisUser.email}
                                </div>
                            </div>
                        </div>
                        <div className='form--requestForm__instructions'>
                            <p>
                                If any of the information above is not correct,<br/> please click the button below<br/> to edit your profile.
                            </p>
                            <div className="button--requestForm">
                                <button className='btn--requestForm'
                                    onClick={() => {
                                        handleEditProfileClick()
                                    }}><span>Edit Profile</span></button>
                            </div>
                        </div>
                    </div>
                    <div className="form--requestForm__requestHelp">
                        <legend><span>Tell us how we can help you.</span></legend>
                        <form className="form--requestForm">
                            <fieldset className='form--requestForm__fieldset'>
                                <div className='form--requestForm__field'>
                                    <label
                                        className="form--requestHelp__label-select"
                                        htmlFor='requestHelp__details'
                                        >Type of help needed:
                                    </label>
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
                                        required
                                    >
                                    <option value="0" label="Please select from this list."></option>
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
                                </div>
                                <div className='form--requestForm__field'>
                                    <label htmlFor='requestHelp__details'>Give some details</label>
                                    <textarea
                                        className="input-wide form--requestForm__input-textarea details"
                                        id="input-wide form--requestForm__input-textarea"
                                        name="input-wide form--requestForm__input-textarea"
                                        rows="5" cols="30"
                                        placeholder='Please give us some details of the kind of help you need, why you need asistance right now, and anything else you want us to know.'
                                        onChange={
                                            (e) => {
                                                const copy = {...request}
                                                copy.details = e.target.value
                                                updateRequest(copy)
                                            }
                                        }
                                        required
                                    />
                                </div>
                                <div className='form--requestForm__field'>
                                    <label
                                        className="form--requestHelp__label-select"
                                        htmlFor='requestHelp__deadline'
                                    >Date help needed:
                                    </label>
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
                                        required
                                    />
                                </div>
                            </fieldset>
                            <div className='button--requestForm'>
                                <button type="submit" className="btn--requestForm" onClick={submitRequest} ><span> Submit Request </span></button>
                            </div>
                        </form>
                    </div>
                </section>
            </article>
        </main>
    );

}

export default RequestForm