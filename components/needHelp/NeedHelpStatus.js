import React from 'react'
import hero from '../img/volunteer-text.png'
import './NeedHelpStatus.css'

function NeedHelpStatus() {



    return (
        <main id="container--checkRequestStatus" className="container--checkRequestStatus">
            <img src={hero} className="hero--checkRequestStatus" alt="hands reaching out toward each other" />
            <section className='list--checkRequestStatus' id='list--checkRequestStatus'>
                
                <h1 className='center title--checkRequestStatus' >Your submission has been received.</h1>
            </section>
        </main>
    )


}

export default NeedHelpStatus