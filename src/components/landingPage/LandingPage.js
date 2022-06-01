import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import logo from '../img/cotc_logo_white.png'
import mechanic from '../img/auto-mechanic.png'
import mowing from '../img/lawn-mowing.png'
import plumbing from '../img/plumbing.png'
import ask from '../img/need-help.png'
import match from '../img/volunteer.png'
import schedule from '../img/phone.png'
import nashville from '../img/cotc_joiningGod.jpg'
import '../fonts.css'
import './LandingPage.css'

function Home() {

    const history = useHistory()
    
    const handleClick = () => {
        history.push("/Login")
    }

    return (
        <main id='container--landingPage' className='container container--landingPage' >
            
            <section className='hero--landingPage' >
                <div className='hero--landingPage__center'>
                    Practicing the way of Jesus in Greater Nashville
                </div>
                <div className='hero--landingPage__top-left'>
                    <img src={logo} className='cotc-logo' alt='Church of the City name in a block' />
                </div>
                <div className='hero--landingPage__bottom-left'>
                    <span className='container--arrow'><span className='bounce'>&#8681; </span></span>&nbsp;&nbsp;scroll down
                </div>
            </section>
            
            <section className='article--landingPage'>

                <div className='intro--landingPage'>
                    <div className='intro--landingPage__ourStory'>
                        Why we do what we do
                    </div>
                    <h1 className="intro--landngPage__scripture">
                        “Lord, I have heard of your fame; I stand in awe of your deeds, Lord. Renew them in our day, in our time make them known; in wrath remember mercy.” Habakkuk 3:2
                    </h1>
                    <div className="intro--landingPage__text">
                        <p className='intro--landingPage__text--paragraph' >
                            At Church of the City, we want to see the fame and deeds of God renewed and known in our time. We have launched a family of churches intent on joining God’s renewal plan by pursuing the way of Jesus in our church and our city. One of our four pursuits is to pursue the spiritul, social and cultural flourishing of our city and its people.  We believe God is moving in our community and is taking us to new places as we partner with Him in the renewal of our city. We would love for you to join us in our pursuit.
                        </p>
                        <img src={nashville} className='cotc-joiningGod' alt='Skyline of Nashville with words, "Church of the City, Joining God in the Renewal of Nashville superimposed.' />
                    </div>
                </div>

                <div className='article--helpCards'>
                    <h2 className='center'>How we can help</h2>
                    <div className='cards--helpCards'>
                        <div className='card--helpCards'>
                            <img src={mechanic} className='card--helpCards__img' alt='man working on the engine of a car' />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            </p>
                        </div>
                        <div className='card--helpCards'>
                            <img src={mowing} className='card--helpCards__img' alt='woman mowing the lawn with a push mower' />
                            <p>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            </p>
                        </div>
                        <div className='card--helpCards'>
                            <img src={plumbing} className='card--helpCards__img' alt='man working on sink drain pipe with a pipe wrench' />
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.
                            </p>
                        </div>
                    </div>
                </div>
                        
                <div className='article--howItWorks'>
                    <h2 className='center'>How it works</h2>
                    <div className='cards--howItWorks'>
                        <div className='card--howItWorks'>
                            <img src={ask} className='card--howItWorks__img' alt='a woman talking on a cell phone while standing near a broken-down car on the side of the road' />
                            <h3>Tell us what kind of help you need</h3>
                            <p>
                                From routine cleaning, painting, or general maintenance and repairs to pluming, electronics, or automotive, we can help with any project. 
                            </p>
                        </div>
                        <div className='card--howItWorks'>
                            <img src={match} className='card--howItWorks__img' alt='a man wearing a t-shirt on which is written "Volunteer"' />
                            <h3>We'll match you with caring volunteers</h3>
                            <p>
                                Our staff will match your needs with a caring, skilled volunteer to help meet your needs. Many or our volunteers are licensed or certified in their craft! 
                            </p>
                        </div>
                        <div className='card--howItWorks'>
                            <img src={schedule} className='card--howItWorks__img' alt='a man talking on a cell phone' />
                            <h3>Start to finish, you're covered!</h3>
                            <p>
                                One of our volunteers will reach out to schedule a convenient time and place to get started with finding the right solution to your problem.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='get-started'>
                    <h2 className='center'>Let's get started!</h2>
                    <button className='btn--landingPage'
                        onClick={() => {
                            handleClick()
                        }}><span>Login</span></button>
                    <h3>Haven't registered yet? <Link className='link--landingPage' to="/Login">Register here</Link></h3>
                </div>
            </section>
        </main>
    );
}

export default Home