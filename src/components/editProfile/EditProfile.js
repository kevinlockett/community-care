import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getThisUser, updateUser } from '../../repositories/usersRepository'
import hero from '../img/update.png'
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

        <div className='header--editProfile'>
            <img src={hero} className="hero--editProfile" alt="" />
        </div>
        <article className='form--editProfile__container'>
            <h1 className='center form--editProfile__title' >Help us keep your profile current</h1>
            <section className='form--editProfile__wrapper'>
                <form className='form--editProfile'>
                    <div className='form--editProfile'>
                        <h3 className='form--editProfile__legend'>Change only incorrect items</h3>
                        <fieldset>
                            <label htmlFor='first_name'> First Name </label>
                            <input onChange={editProfile}
                                type='text' id='first_name' className='form--editProfile__input-wide' placeholder={`${thisUser.first_name}`} autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='last_name'> Last Name </label>
                            <input onChange={editProfile}
                                type='text' id='last_name' className='form--editProfile__input-wide' placeholder={`${thisUser.last_name}`}/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor='address'> Address line 1 </label>
                            <input onChange={editProfile}
                                type='text' id='address' className='form--editProfile__input-wide' placeholder={`${thisUser.address}`} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='apt'> Address line 2 </label>
                            <input onChange={editProfile}
                                type='text' id='apt' className='form--editProfile__input-wide' placeholder="Apt or Box Number"  />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='city'> City </label>
                            <input onChange={editProfile}
                                type='text' id='city' className='form--editProfile__input-wide' placeholder={`${thisUser.city}`} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='zipcode'> ZIP code </label>
                            <input onChange={editProfile}
                                type='text' id='zipcode' className='form--editProfile__input-wide' placeholder={`${thisUser.zipcode}`} pattern='^\s*?\d{5}(?:[-\s]\d{4})?\s*?$' />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='phone'> Phone </label>
                            <input onChange={editProfile}
                                type='tel' id='phone' className='form--editProfile__input-wide' placeholder={`${thisUser.phone}`} pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='email'> Email Address </label>
                            <input onChange={editProfile}
                                type='email' id='email' className='form--editProfile__input-wide' placeholder={`${thisUser.email}`} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='stakeholder'> COTC Stakeholder?</label>
                            <span>Yes&nbsp;</span><input onChange={handleStakeholderChange} type='radio' value='true' id='stakeholder' name='stakeholder' className='form-control' checked={thisUser.stakeholder === true} />
                            <span>&nbsp;&nbsp;&nbsp;No&nbsp;</span><input onChange={handleStakeholderChange} type='radio' value='false' id='stakeholder' name='stakeholder' className='form-control' checked={thisUser.stakeholder === false} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor='staff'>COTC Staff Member?</label><span>
                            Yes</span> <input onChange={handleStaffChange} type='radio' value='true' id='staff' name='staff' className='form-control' checked={thisUser.staff === true} />
                            <span>&nbsp;&nbsp;&nbsp;No</span> <input onChange={handleStaffChange} type='radio' value='false' id='staff' name='staff' className='form-control' checked={thisUser.staff === false} />
                        </fieldset>
                        <div className='button--editProfile'>
                            <button
                                type="submit"
                                className="btn--editProfile"
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
                                }><span> Submit </span></button>
                        </div>
                    </div>
                </form>
            </section>
        </article>
    </main>

    )
}

export default EditProfile
