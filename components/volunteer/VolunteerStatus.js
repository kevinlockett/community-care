import React from 'react'
import hero from '../img/volunteer-text.png'
import './VolunteerStatus.css'

function VolunteerStatus() {



    return (
        <main id="container--VolunteerStatus" className="container--VolunteerStatus">
            <img src={hero} className="hero--VolunteerStatus" alt="hands reaching out toward each other" />
            <section className='list--VolunteerStatus' id='list--VolunteerStatus'>
                
                <h1 className='center title--VolunteerStatus' >Your submission has been received.</h1>
            </section>
        </main>
    )


}

export default VolunteerStatus