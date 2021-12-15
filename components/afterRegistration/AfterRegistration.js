import React from 'react'
import { useHistory } from 'react-router-dom'
import hero from '../img/tools.png'
import help from '../img/helpingHand.png'
import volunteers from '../img/volunteers.png'
import './AfterRegistration.css'

function AfterRegistration() {

    const history = useHistory()
    
    const handleGetHelpClick = () => {
        history.push("/GetHelp")
    }

    const handleVolunteerClick = () => {
        history.push("/Volunteer")
    }

    return (
        <main id="afterRegistration" className="afterRegistration">
            <img src={hero} className="hero--afterRegistration" alt="carpterneters tools on a table" />
            <section className='afterRegistrationCards'>
                <h1 className='center title--afterRegistration' >What do you want to do?</h1>
                <div className='cards'>
                    <div className='card'>
                        <div>
                            <img src={help} className='card-img' alt='a woman appearing to have a bad cold holds a carboard sign reading, "HELP!' />
                            <p>
                                I want to ask for help. 
                            </p>
                        </div>
                        <div>
                            <button className='btn--get-started btn'
                            onClick={() => {
                                handleGetHelpClick()
                            }}><span>Get Help</span></button>
                        </div>
                    </div>
                    <div className='card'>
                        <div>
                            <img src={volunteers} className='card-img' alt='a group of smiling women wearing t-shirts reading "VOLUNTEER" stand in a cirle, shouder-to-shoulder, touching hed-to-head, looking down at the camera' />
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
                </div>
            </section>
        </main>
    );
}

export default AfterRegistration