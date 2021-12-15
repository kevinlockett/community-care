import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { getExistingUserEmail, addUser } from '../../repositories/usersRepository'
import hero from '../img/register.png'
import './Login.css'

function Register(props) {

    const [registeredUser, setRegisteredUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        apt: null,
        city: "",
        zipcode: "",
        phone: "",
        stakeholder: false,
        staff: false,
        volunteer: false,
        needsHelp: false
    })
    
    const conflictDialog = useRef()
    
    const existingUserCheck = () => {
        return getExistingUserEmail(registeredUser.email)
        .then(user => !!user.length)
    }
    
    const history = useHistory()
    
    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    addUser(registeredUser)
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty('id')) {
                                localStorage.setItem('communityCare_user', createdUser.id)
                                history.push("/AfterRegistration")
                            }
                        })
                } else {
                    conflictDialog.current.showModal()
                }
            })
    }

    const updateUser = (e) => {
        const copy = {...registeredUser}
        copy[e.target.id] = e.target.value
        setRegisteredUser(copy)
    }

    const handleStakeholderChange = (e) => {
        const copy = {...registeredUser}
        copy.stakeholder = Boolean(e.target.value)
        setRegisteredUser(copy)
    }

    const handleStaffChange = (e) => {
        const copy = {...registeredUser}
        copy.staff = Boolean(e.target.value)
        setRegisteredUser(copy)
    }

    return (
        <main id="container--register" className="container--register">
            <dialog className='dialog dialog--password' ref={conflictDialog}>
                <div>
                    Account already exists
                </div>
                <button className='btn btn--close' onClick={e => conflictDialog.current.close()}>
                    Close
                </button>
            </dialog>

            <img src={hero} className="hero--register" alt="What's your story? word art" />
            
            <form className='form--register' onSubmit={handleRegister}>
                <h1 className='center title--register' >Tell us about you</h1>
                <fieldset>
                    <label htmlFor='first_name'> First Name </label>
                    <input onChange={updateUser}
                        type='text' id='first_name' className='form-control' placeholder='First Name' required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor='last_name'> Last Name </label>
                    <input onChange={updateUser}
                        type='text' id='last_name' className='form-control' placeholder='Last Name' required/>
                </fieldset>
                <fieldset>
                    <label htmlFor='address'> Address </label>
                    <input onChange={updateUser}
                        type='text' id='address' className='form-control' placeholder='Street Address' required/>
                </fieldset>
                <fieldset>
                    <label htmlFor='apt'> Apt or Box </label>
                    <input onChange={updateUser}
                        type='text' id='apt' className='form-control' placeholder='Apartment or Box Number if any' autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor='city'> City </label>
                    <input onChange={updateUser}
                        type='text' id='city' className='form-control' placeholder='City' required/>
                </fieldset>
                <fieldset>
                    <label htmlFor='zipcode'> ZIP code </label>
                    <input onChange={updateUser}
                        type='text' id='zipcode' className='form-control' placeholder='ZIP code' pattern='^\s*?\d{5}(?:[-\s]\d{4})?\s*?$' required/>
                </fieldset>
                <fieldset>
                    <label htmlFor='phone'> Phone </label>
                    <input onChange={updateUser}
                        type='tel' id='phone' className='form-control' placeholder='123-456-7890' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' required/>
                </fieldset>
                <fieldset>
                    <label htmlFor='email'> Email Address </label>
                    <input onChange={updateUser}
                        type='email' id='email' className='form-control' placeholder='Email Address' required/>
                </fieldset>
                <fieldset>
                    <label htmlFor='stakeholder'> Are you a COTC Stakeholder? &nbsp;</label>
                    &nbsp;Yes&nbsp; <input onChange={handleStakeholderChange} type='radio' value='true' id='stakeholder' name='stakeholder' className='form-control' checked={registeredUser.stakeholder === true} />
                    &nbsp;&nbsp;&nbsp;No&nbsp; <input onChange={handleStakeholderChange} type='radio' value='false' id='stakeholder' name='stakeholder' className='form-control' checked={registeredUser.stakeholder === false} />
                </fieldset>
                <fieldset>
                    <label htmlFor='staff'> Are you a COTC Staff Member? &nbsp;</label>
                    &nbsp;Yes&nbsp; <input onChange={handleStaffChange} type='radio' value='true' id='staff' name='staff' className='form-control' checked={registeredUser.staff === true} />
                    &nbsp;&nbsp;&nbsp;No&nbsp; <input onChange={handleStaffChange} type='radio' value='false' id='staff' name='staff' className='form-control' checked={registeredUser.staff === false} />
                </fieldset>
                <fieldset>
                    <button type="submit" className="btn btn--register"> Register </button>
                </fieldset>
            </form>

        </main>
    );
}

export default Register