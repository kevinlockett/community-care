import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getThisUser, updateUser } from '../../repositories/usersRepository'
import hero from '../img/register.png'
import './EditProfile.css'



function EditProfile() {

    const [ thisUser, setThisUser ] = useState({})
    const history = useHistory()
    
    useEffect(
        () => {
            getThisUser((parseInt(localStorage.getItem('communityCare_user'))))
            .then((user) => {
                setThisUser(user)
            })
        },
        []
    )

    const editProfile = (e) => {
        const copy = {...thisUser}
        copy[e.target.id] = e.target.value
        setThisUser(copy)
    }

    const handleStakeholderChange = (e) => {
        const copy = {...thisUser}
        copy.stakeholder = Boolean(e.target.value)
        setThisUser(copy)
    }

    const handleStaffChange = (e) => {
        const copy = {...thisUser}
        copy.staff = Boolean(e.target.value)
        setThisUser(copy)
    }

    return (

    <main id="container--editProfile" className="container--editProfile">

    <img src={hero} className="hero--register" alt="What's your story? word art" />
            
            <form className='form--editProfile'>
                <h1 className='center title--register' >Edit the information that is incorrect.</h1>
                <fieldset>
                    <label htmlFor='first_name'> First Name </label>
                    <input onChange={editProfile}
                        type='text' id='first_name' className='form-control' placeholder={`${thisUser.first_name}`} autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor='last_name'> Last Name </label>
                    <input onChange={editProfile}
                        type='text' id='last_name' className='form-control' placeholder={`${thisUser.last_name}`}/>
                </fieldset>
                <fieldset>
                    <label htmlFor='address'> Address </label>
                    <input onChange={editProfile}
                        type='text' id='address' className='form-control' placeholder={`${thisUser.address}`} />
                </fieldset>
                <fieldset>
                    <label htmlFor='apt'> Apt or Box </label>
                    <input onChange={editProfile}
                        type='text' id='apt' className='form-control' placeholder="Apartment or Box Number if any"  />
                </fieldset>
                <fieldset>
                    <label htmlFor='city'> City </label>
                    <input onChange={editProfile}
                        type='text' id='city' className='form-control' placeholder={`${thisUser.city}`} />
                </fieldset>
                <fieldset>
                    <label htmlFor='zipcode'> ZIP code </label>
                    <input onChange={editProfile}
                        type='text' id='zipcode' className='form-control' placeholder={`${thisUser.zipcode}`} pattern='^\s*?\d{5}(?:[-\s]\d{4})?\s*?$' />
                </fieldset>
                <fieldset>
                    <label htmlFor='phone'> Phone </label>
                    <input onChange={editProfile}
                        type='tel' id='phone' className='form-control' placeholder={`${thisUser.phone}`} pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' />
                </fieldset>
                <fieldset>
                    <label htmlFor='email'> Email Address </label>
                    <input onChange={editProfile}
                        type='email' id='email' className='form-control' placeholder={`${thisUser.email}`} />
                </fieldset>
                <fieldset>
                    <label htmlFor='stakeholder'> Are you a COTC Stakeholder? &nbsp;</label>
                    &nbsp;Yes&nbsp; <input onChange={handleStakeholderChange} type='radio' value='true' id='stakeholder' name='stakeholder' className='form-control' checked={thisUser.stakeholder === true} />
                    &nbsp;&nbsp;&nbsp;No&nbsp; <input onChange={handleStakeholderChange} type='radio' value='false' id='stakeholder' name='stakeholder' className='form-control' checked={thisUser.stakeholder === false} />
                </fieldset>
                <fieldset>
                    <label htmlFor='staff'> Are you a COTC Staff Member? &nbsp;</label>
                    &nbsp;Yes&nbsp; <input onChange={handleStaffChange} type='radio' value='true' id='staff' name='staff' className='form-control' checked={thisUser.staff === true} />
                    &nbsp;&nbsp;&nbsp;No&nbsp; <input onChange={handleStaffChange} type='radio' value='false' id='staff' name='staff' className='form-control' checked={thisUser.staff === false} />
                </fieldset>
                <fieldset>
                    <button
                        type="submit"
                        className="btn btn--editProfile"
                        onClick={() => {
                            updateUser(thisUser)
                            .then(
                                ()=>{
                                    getThisUser()
                                    .then((user) => {
                                        setThisUser(user)
                                    })
                                })
                                history.push("/AfterRegistration")
                            }       
                        }><span> Update Profile </span></button>
                </fieldset>
            </form>
    </main>

    )
}

export default EditProfile
