import React from 'react'
import { useHistory } from 'react-router-dom'
import hero from '../img/nash2.png'
import mechanic from '../img/auto-mechanic.png'
import mowing from '../img/lawn-mowing.png'
import plumbing from '../img/plumbing.png'
import ask from '../img/need-help.png'
import match from '../img/volunteer.png'
import schedule from '../img/phone.png'
import './LandingPage.css'

function Home() {

    const history = useHistory()
    
    const handleClick = () => {
        history.push("/Register")
    }

    return (
        <main id="landingPage" className="landingPage">
            <img src={hero} className="landingPage-hero" alt="City of Nashville" />
            <h1 className="center cc-title">Community Care</h1>
            <section className='cc-intro'>
                <p>
                    At Church of the City, we want to see the fame and deeds of God renewed and known in our time. We have launched a family of churches intent on joining God’s renewal plan by pursuing the way of Jesus in our church and our city. One of our four pursuits is to pursue the spiritul, social and cultural flourishing of our city and its people.  We believe God is moving in our community and is taking us to new places as we partner with Him in the renewal of our city. We would love for you to join us in our pursuit.
                </p>
                <p>
                    If you’re walking through a difficult season or facing significant life challenges (illness, physical limitations, financial challenges, parenting as a single person, or serving as a foster-parent), and need some short-term practical assistance, we want to help.  Or if you want to make a positive difference and are a skilled craftsman or can push a broom, lawnmower, or a paintbrush, we can use your volunteer help.  Click the button below to register and let's get started!
                </p>
            </section>
            <section className='get-started'>
                <h2 className='center'>Ready to get started</h2>
                <button className='btn-get-started btn'
                    onClick={() => {
                        handleClick()                      
                    }}><span>Register</span></button>
            </section>
            <section className='helpCards'>
                <h2 className='center'>How we can help</h2>

                <div className='cards'>
                    <div className='card'>
                        <img src={mechanic} className='card-img' alt='man working on the engine of a car' />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </p>
                    </div>
                    <div className='card'>
                        <img src={mowing} className='card-img' alt='woman mowing the lawn with a push mower' />
                        <p>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        </p>
                    </div>
                    <div className='card'>
                        <img src={plumbing} className='card-img' alt='man working on sink drain pipe with a pipe wrench' />
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.
                        </p>
                    </div>
                </div>
            </section>
            <section className='howItWorks'>
                <h2 className='center'>How it works</h2>

                <div className='cards'>
                    <div className='card'>
                        <img src={ask} className='card-img' alt='a woman talking on a cell phone while standing near a broken-down car on the side of the road' />
                        <h3>Tell us what kind of help you need</h3>
                        <p>
                            From routine cleaning, painting, or general maintenance and repairs to pluming, electronics, or automotive, we can help with any project. 
                        </p>
                    </div>
                    <div className='card'>
                        <img src={match} className='card-img' alt='a man wearing a t-shirt on which is written "Volunteer"' />
                        <h3>We'll match you with caring volunteers</h3>
                        <p>
                            Our staff will match your needs with a caring, skilled volunteer to help meet your needs. Many or our volunteers are licensed or certified in their craft! 
                        </p>
                    </div>
                    <div className='card'>
                        <img src={schedule} className='card-img' alt='a man talking on a cell phone' />
                        <h3>Start to finish, you're covered!</h3>
                        <p>
                            One of our volunteers will reach out to schedule a convenient time and place to get started with finding the right solution to your problem.
                        </p>
                    </div>
                </div>
            </section>
            <section className='get-started'>
                <h2 className='center'>Let's get started!</h2>
                <button className='btn-get-started btn'
                    onClick={() => {
                        handleClick()
                    }}><span>Register</span></button>
            </section>

        </main>
    );
}

export default Home