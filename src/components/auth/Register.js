import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { getExistingUserEmail, addUser } from '../../repositories/usersRepository'
import hero from '../img/register.png'
import './Register.css'

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
            
            <div className='header--register'>
                <img src={hero} className="hero--register" alt="'Register' in word art" />
            </div>
            
            <section className='form--register__container'>
                <h1 className='form--register__title' >Community Care Registration</h1>
                <div className='form--register__wrapper'>
                    <p>
                        <strong className="mandatory">*</strong> Denotes fields which are mandatory
                    </p>
                    <form className='form--register' onSubmit={handleRegister}>
                    
                        <fieldset>
                            <label htmlFor='first_name'><strong className="mandatory">*</strong> First Name </label>
                            <input onChange={updateUser}
                                type='text' id='first_name' className='form--register__input-wide form--register__name' required autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='last_name'><strong className="mandatory">*</strong> Last Name </label>
                            <input onChange={updateUser}
                                type='text' id='last_name' className='form--register__input-wide form--register__name' required/>
                        </fieldset>
                
                        <fieldset>
                            <label htmlFor='address'><strong className="mandatory">*</strong> Address line 1 </label>
                            <input onChange={updateUser}
                                type='text' id='address' className='form--register__input-wide form--register__address' placeholder='Street Address' required/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor='apt'> Address line 2 </label>
                            <input onChange={updateUser}
                                type='text' id='apt' className='form--register__input-wide form--register__address' placeholder='Apt or Box Number' autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='city'><strong className="mandatory">*</strong> City </label>
                            <input onChange={updateUser}
                                type='text' id='city' className='form--register__input-wide form--register__address' required/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor='zipcode'><strong className="mandatory">*</strong> ZIP code </label>
                            <input onChange={updateUser}
                                type='text' id='zipcode' className='form--register__input-wide form--register__address' pattern='^\s*?\d{5}(?:[-\s]\d{4})?\s*?$' required/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor='phone'><strong className="mandatory">*</strong> Phone </label>
                            <input onChange={updateUser}
                                type='tel' id='phone' className='form--register__input-wide form--register__phone' placeholder='123-456-7890' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' required/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor='email'><strong className="mandatory">*</strong> Email Address </label>
                            <input onChange={updateUser}
                                type='email' id='email' className='form--register__input-wide form--register__email'  required/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor='stakeholder'> COTC Stakeholder? &nbsp;</label>
                            &nbsp;Yes&nbsp; <input onChange={handleStakeholderChange} type='radio' value='true' id='stakeholder' name='stakeholder' className='form-control' checked={registeredUser.stakeholder === true} />
                            &nbsp;&nbsp;&nbsp;No&nbsp; <input onChange={handleStakeholderChange} type='radio' value='false' id='stakeholder' name='stakeholder' className='form-control' checked={registeredUser.stakeholder === false} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='staff'> COTC Staff Member? &nbsp;</label>
                            &nbsp;Yes&nbsp; <input onChange={handleStaffChange} type='radio' value='true' id='staff' name='staff' className='form-control' checked={registeredUser.staff === true} />
                            &nbsp;&nbsp;&nbsp;No&nbsp; <input onChange={handleStaffChange} type='radio' value='false' id='staff' name='staff' className='form-control' checked={registeredUser.staff === false} />
                        </fieldset>
                        <div className='button--register'>
                            <button type="submit" className="btn--register"><span> Register </span></button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Register