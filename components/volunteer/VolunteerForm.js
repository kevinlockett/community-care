import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getThisUser, updateUser } from '../../repositories/usersRepository'
import { getAllTasks } from '../../repositories/tasksRepsitory'
import { postVolunteerSelections } from '../../repositories/volunteerRepository'

import hero from '../img/volunteer-text.png'
import './VolunteerForm.css'

function VolunteerForm() {

    const [ thisUser, updateThisUser ] = useState({})
    const [ tasks, updateTasks ] = useState([])

    // State for checkboxes to determine if boxes are checked, and create a new Array equal to the length of the number of checkboxes
    // The array will contain booleans for each checkbox, initially set to false (unchecked)
    const [ checkedState, setCheckedState ] = useState(
        new Array(tasks.length).fill(false)
    )

    const [ volunteerSelections, updateVolunteerSelections ] = useState({
        userId: 0,
        approverId: null,
        selectedTasks: new Set()
    })

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

    const submitVolunteer = (e) => {
        e.preventDefault()
        const copy = {...thisUser}
        copy.volunteer = true
        updateUser(copy)
            .then (
                () => {
            
            const fetchArray = []

            volunteerSelections.selectedTasks.forEach(
                (selectedTaskId) => {
                    fetchArray.push(
                        postVolunteerSelections(selectedTaskId)
                    )
                }
            )

            Promise.all(fetchArray)
            .then(
                () => {
                    history.push("/VolunteerStatus")
                }
            )
        })
    }

    const handleOnChange = (e, position) => {
        const taskId = e
        setTasks(taskId)
        // Loops over checkedState with map method; if value of the position parameter matches current index, value is reversed.
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        )
        // Sets chekedState to updatedCheckedState array to check/uncheck boxes
        setCheckedState(updatedCheckedState)
    }

    const setTasks = (taskId) => {
        const copy = {...volunteerSelections}
        copy.selectedTasks.has(taskId)
            ? copy.selectedTasks.delete(taskId)
            : copy.selectedTasks.add(taskId)
        updateVolunteerSelections(copy)
    }
    
    return (
        <main id="container--volunteer" className="container--volunteer">
            <img src={hero} className="hero--volunteer" alt="" />
            <section className='form--volunteer' id='form--volunteer'>
                
            
                <h1 className='center title--volunteer' >Thanks for offering to help!</h1>
                <section className='intro--volunteer'>
                    <p>
                        {thisUser?.first_name}, we are so glad you are considering joining our Community Care team of volunteers.  We believe helping others is one way we can practice the way of Jesus. Whether you're a skilled craftsman or technician, or can simply push a broom or lawnmower, we are thrilled you're considering serving with us. Check your profile information below, then fill out the volunteer form to get started.
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
                <section className='volunteer__type'>
                    <h2>What kind of help can you provide?</h2>
                    <form id="form--requestHelp" className="form--requestHelp">
                        <div className="requestHelp__instructions">
                            <fieldset>
                                Select all types you are willing and able to perform.
                                    <ul className="types-list">
                                        {
                                            tasks.map(({task, id}) => {
                                                return (
                                                    <li key={`task--${id}`}>
                                                        <input
                                                            type="checkbox"
                                                            id={`task--${id}`}
                                                            name={task}
                                                            value={id}
                                                            checked={checkedState[task]}
                                                            onChange={() => handleOnChange(id)}
                                                        />
                                                        <label htmlFor={`task--${task}`}>&nbsp;{task}</label>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                            </fieldset>
                            <fieldset>
                                <button type="submit" className="btn btn--volunteer" onClick={submitVolunteer} > Submit </button>
                            </fieldset>
                        </div>
                    </form>
                </section>
            </section>
        </main>
    );
}

export default VolunteerForm