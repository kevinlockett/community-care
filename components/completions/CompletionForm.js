import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { updateAssignment, getThisAssignmentExpanded, getJustThisAssignment } from '../../repositories/assignmentsRepository'
import { getAllTasks } from '../../repositories/tasksRepository'
import { getAllUsers } from '../../repositories/usersRepository'
import hero from '../img/networking.png'

function CompletionReport() {

    const [ users, setUsers ] = useState([])
    const [ thisAssignmentExpanded, updateThisAssignmentExpanded ] = useState({})
    const [ justThisAssignment, updateJustThisAssignment ] = useState({})
    const [ requestor, setRequestor ] = useState({})
    const [ tasks, setTasks ] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            getAllUsers()
            .then((user) => {
                setUsers(user)
            })
        },
        []
    )
    
    useEffect(
        () => {
            getThisAssignmentExpanded(parseInt(localStorage.getItem('completedAssignment')))
            .then((assignment) => {
                updateThisAssignmentExpanded(assignment)
            })
        },
        []
    )

    useEffect(
        () => {
            getJustThisAssignment(parseInt(localStorage.getItem('completedAssignment')))
            .then((assignment) => {
                updateJustThisAssignment(assignment)
            })
        },
        []
    )
    
    useEffect(
        () => {
            const foundName = users.find(u => u.id === parseInt(thisAssignmentExpanded.request.userId))
            setRequestor(foundName)
        },
        [thisAssignmentExpanded]
    )

    useEffect(
        () => {
            getAllTasks()
            .then((task) => {
                setTasks(task)
            })
        },
        []
    )
    
    const findTask = () => {
        const foundTask = tasks.find(t => t.id === thisAssignmentExpanded.taskId)
        const taskName = foundTask?.task
        return taskName
    }

    const handleCompletedChange = (e) => {
        const copy = {...justThisAssignment}
        copy.completed = Boolean(e.target.value)
        updateJustThisAssignment(copy)
    }

    const handleCompletion = (e) => {
        e.preventDefault()
        const copy = {...justThisAssignment}
        updateAssignment(copy)
        .then(
            () => {
                localStorage.removeItem('completedAssignment')
                history.push('/VolunteerStatus')
            }
        )
    }

    return(
        <main id="container--CompletionForm" className="container--CompletionForm">
            <img src={hero} className="hero--completionForm" alt="" />
            <section className='form--volunteer' id='form--volunteer'>
                <h1 className='form--CompletionForm' >Please fill in the details of your work</h1>
        
                {requestor?.first_name} {requestor?.last_name} requested assistance with {findTask()} to be completed by {thisAssignmentExpanded.request?.dateNeeded}.

                <form className='form--CompletionForm' onSubmit={(e) => handleCompletion(e) }>
                    <h3 className='center title--Completion' >Please complete this form:</h3>
                    <fieldset>
                        <label htmlFor='workDate'> Date work was performed. </label>
                        <input
                            type='date'
                            id='workDate'
                            className='form-control'
                            required autoFocus
                            onChange={
                                (e) => {
                                    const copy = {...justThisAssignment}
                                    copy.workDate = e.target.value
                                    updateJustThisAssignment(copy)
                                }
                            }
                        />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='lengthInHours'> How long did your work take? </label>
                            <input
                                type='float'
                                id='lengthInHours'
                                className='form-control'
                                required autoFocus
                                onChange={
                                    (e) => {
                                        const copy = {...justThisAssignment}
                                        copy.lengthInHours = parseFloat(e.target.value)
                                        updateJustThisAssignment(copy)
                                    }
                                }
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='completed'> Were you able to complete the request? &nbsp;</label>
                            &nbsp;Yes&nbsp; <input onChange={handleCompletedChange} type='radio' value='true' id='completed' name='completed' className='form-control' checked={justThisAssignment.completed === true} />
                            &nbsp;&nbsp;&nbsp;No&nbsp; <input onChange={handleCompletedChange} type='radio' value='false' id='completed' name='completed' className='form-control' checked={justThisAssignment.completed === false} />
                        </fieldset>
                        <fieldset>
                            <button
                                type="submit"
                                className="btn btn--CompletionForm"
                            ><span>Submit</span></button>
                        </fieldset>

                </form>
            </section>
        </main>
    )
}

export default CompletionReport