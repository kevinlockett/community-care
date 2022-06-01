import React, { useState, useEffect, useRef } from 'react'
import { getThisUser } from '../../repositories/usersRepository'
import { useHistory } from 'react-router-dom'
import help from '../img/helpingHand.png'
import volunteers from '../img/volunteers.png'
import staff from '../img/staff.png'
import './AfterRegistration.css'

function AfterRegistration() {

    const [ thisUser, updateThisUser ] = useState({})
    const staffDialog = useRef()
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
    
    const handleGetHelpClick = () => {
        history.push("/GetHelp")
    }

    const handleVolunteerClick = () => {
        history.push("/Volunteer")
    }

    const handleStaffClick = () => {
        thisUser?.staff === true
        ? history.push("/LoginStaff")
        : staffDialog.current.showModal()
    }

    return (
        <main id="container--afterRegistration" className="container--afterRegistration">
            
        <dialog className='dialog dialog--staff' ref={staffDialog}>
                <div>User does not exist in staff directory</div>
                <button className="btn btn--close" onClick={e => staffDialog.current.close()}>Close</button>
            </dialog>
            
            <section >
                <div className='hero--afterRegistration'>
                </div>
                <div className='article--afterRegistration'>
                    <h1 className='center title--afterRegistration' >
                        What do you want to do?
                    </h1>
                    <div className='cards--afterRegistration'>
                        <div className='card--afterRegistration'>
                            <div>
                                <img src={help} className='card--afterRegistration__img' alt='a woman appearing to have a bad cold holds a carboard sign reading, "HELP!' />
                                <p>
                                    I want to ask for help. 
                                </p>
                            </div>
                            <div>
                                <button className='btn btn--get-started btn'
                                onClick={() => {
                                    handleGetHelpClick()
                                }}><span>Get Help</span></button>
                            </div>
                        </div>
                        <div className='card--afterRegistration'>
                            <div>
                                <img src={volunteers} className='card--afterRegistration__img' alt='a group of smiling women wearing t-shirts reading "VOLUNTEER" stand in a cirle, shouder-to-shoulder, touching hed-to-head, looking down at the camera' />
                                <p>
                                    I want to vounteer to help. 
                                </p>
                            </div>
                            <div>
                                <button className='btn--get-started btn'
                                onClick={() => {
                                    handleVolunteerClick()
                                }}><span>Volunteer</span></button>
                            </div>
                        </div>
                        <div className='card--afterRegistration'>
                            <div>
                                <img src={staff} className='card--afterRegistration__img' alt='a placeholder of staff people -- not actually associated with COTC' />
                                <p>
                                    I want to access the staff page. 
                                </p>
                            </div>
                            <div>
                                <button className='btn--get-started btn'
                                onClick={() => {
                                    handleStaffClick()
                                }}><span>Staff Login</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AfterRegistration