import React from 'react'
import hero from '../img/networking.png'

import './StaffReviewList.css'

function StaffReviewList() {
    return (
        <main id="container--staffReviewList" className="container--staffReviewList">
            <img src={hero} className="hero--StaffReviewList" alt="Networking" />
            <section className='staffReviewList'>
                <h1 className='center title--staffReviewList' >Neighbors in Need</h1>
                
            </section>
            <section className='volunteerList'>
                <h1 className='center title--staffReviewList' >Volunteers</h1>
                
            </section>
        </main>
    );
}

export default StaffReviewList