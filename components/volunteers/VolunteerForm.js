import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getThisUser, updateUser } from '../../repositories/usersRepository'
import { getAllTasks } from '../../repositories/tasksRepository'
import { getAllOffers } from '../../repositories/volunteersRepository'
import { postVolunteerSelections } from '../../repositories/volunteersRepository'
import hero from '../img/volunteer-text.png'
import './VolunteerForm.css'

function VolunteerForm() {

    const [ thisUser, setThisUser ] = useState({})
    const [ allOffers, setAllOffers ] = useState([])
    const [ offersThisUser, setOffersThisUser ] = useState([])
    const [ tasks, updateTasks ] = useState([])
    const [ remainingTasks, setRemainingTasks ] = useState ([])

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
            getThisUser(parseInt(localStorage.getItem('communityCare_user')))
                .then((user) => {
                    setThisUser(user)
                })
        },
        []
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
            const filteredOffers = allOffers.filter(offer => offer.userId === parseInt(thisUser.id))
            setOffersThisUser(filteredOffers)
        },
        [allOffers, thisUser.id]
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

    useEffect(
        () => {
            const filteredTasks = tasks
                .filter(o1 => !offersThisUser
                .some(o2 => o1.id === o2.taskId))
                setRemainingTasks(filteredTasks)
        },
        [offersThisUser, tasks]
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

    const handleEditProfileClick = () => {
        history.push("/EditProfile")
    }
    
    return (

        <main id="container--volunteerForm" className="container--volunteerForm">

            <div className='header--volunteerForm'>
                <img src={hero} className="hero--volunteerForm" alt="hands reaching out toward each other" />            
            </div>

            <article className='form--volunteerForm__container'>
                <h1 className='center title--volunteerForm' >Thanks for volunteering to help!</h1>
                <section className='form--volunteerForm__wrapper'> 
                    <div className='form--volunteerForm__intro'>
                        <div className='form--volunteerForm__legend'>
                            Welcome, {thisUser?.first_name}!
                        </div>
                        <div className='form--volunteerForm__text'>
                            <p>
                                We are thrilled you want to join our Community Care team of volunteers!  We believe helping others is one way we can practice the way of Jesus. Whether you're a licensed craftsman or technician, or can simply push a broom or lawnmower, we are thrilled you're considering serving with us.
                            </p>
                            <p>
                                Let's begin by making sure the information you already shared with us is still up to date.  If you seem something that needs a quick update, you can do that below.
                            </p>
                        </div>
                        <div className='form--volunteerForm__userProfile' >
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
                                    {thisUser.address} {thisUser.apt}, {thisUser.city}, TN  {thisUser. zipcode}
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
                            <div className='form--volunteerForm__instructions'>
                                <p>
                                    If any of the information above is not correct,<br/> please click the button below<br/> to edit your profile.
                                </p>
                                <div className="button--volunteerForm">
                                    <button className='btn--volunteerForm'
                                        onClick={() => {
                                            handleEditProfileClick()
                                        }}><span>Edit Profile</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form--volunteerForm__offerHelp">
                        <div className='form--volunteerForm__legend'>
                            What are you interested in doing?
                        </div>
                        <form className="form--volunteerForm">
                            <fieldset className='form--volunteerForm__fieldset'>
                                <p>Select all types you are willing and able to perform.</p>
                                <ul className="types-list">
                                    {
                                        remainingTasks.map(({task, id}) => {
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
                                                    <label classname='form--volunteerForm__label--checkbox' htmlFor={`task--${task}`}>&nbsp;{task}</label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </fieldset>
                            <div className='button--volunteerForm'>
                                <button
                                    type="submit"
                                    className="btn--volunteerForm"
                                    onClick={submitVolunteer} 
                                    ><span> Submit </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </article>
        </main>
    );
}

export default VolunteerForm