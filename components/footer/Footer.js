import React from 'react'
import logo from '../img/LockettDesigns.png'
import githubIcon from '../img/github.png'
import linkedinIcon from '../img/linkedin.png'
import './Footer.css'

function Footer() {
    return (
        <footer id="container--footer" className="container--footer">
            <div className='footer__div footer__divl'>
                <p className='footer-copy'>&copy; 2021 Kevin Lockett</p>
            </div>
            <div className='footer__div footer__divc'>
                <img src={logo} className="footer-logo" alt="logo" />
            </div>
            <div className='footer__div footer__divr'>
                <a href='https://github.com/kevinlockett'>
                    <img src={githubIcon} className="footer-icon" alt="github icon" />
                </a>
                <a href='https://www.linkedin.com/in/kevin-lockett/'>
                    <img src={linkedinIcon} className="footer__icon" alt="linked-in icon" />
                </a>
            </div>
        </footer>
    )
}

export default Footer