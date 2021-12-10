import React from 'react'
import hero from '../img/register.png'
import help from '../img/help.png'
import volunteers from '../img/volunteers.png'
import staff from '../img/staff.png'

import './Register.css'

function Register() {
    return (
        <main id="register" className="register">
            <img src={hero} className="register-hero" alt="Register" />
            <section className='registrationCards'>
                <h1 className='center register-title' >What do you want to do?</h1>
                <div className='cards'>
                    <div className='card'>
                        <img src={help} className='card-img' alt='a woman appearing to have a bad cold holds a carboard sign reading, "HELP!' />
                        <p>
                            I want to ask for help. 
                        </p>
                        <button className='btn-get-started btn'
                        onClick={() => {
                            
                        }}><span>Register</span></button>    
                    </div>
                    <div className='card'>
                        <img src={volunteers} className='card-img' alt='a group of smiling women wearing t-shirts reading "VOLUNTEER" stand in a cirle, shouder-to-shoulder, touching hed-to-head, looking down at the camera' />
                        <p>
                            I want to vounteer to help. 
                        </p>
                        <button className='btn-get-started btn'
                        onClick={() => {
                            
                        }}><span>Register</span></button>    
                    </div>
                    <div className='card'>
                        <img src={staff} className='card-img' alt='a placeholder of a group of people appearing to be staff members' />
                        <p>
                            I want to login as a staff member.
                        </p>
                        <button className='btn-get-started btn'
                        onClick={() => {
                            
                        }}><span>Login</span></button>    
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Register