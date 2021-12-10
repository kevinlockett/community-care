import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/cotc_logo-300x147.png'
import './NavBar.css'

function NavBar() {

    const [visibility, setVisibility] = useState(false)

    const showMenu = () => {
        visibility === false ? setVisibility(true) : setVisibility(false)
    }

    return (
        <>
            <header id='header' className='header flex'>
                <div>
                    <img src={logo} className="header-logo" alt="logo" />
                </div>

                <button className='mobile-nav-toggle filter-yellow'
                    aria-controls='navbar'
                    aria-expanded={visibility}
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={() => {
                        showMenu()
                    }}
                    >
                    <span className='sr-only'>Menu</span>
                </button>

                <nav >
                <ul id='navbar' data-visible={visibility} className='navbar flex'>
                        <li className='navbar__item active'>
                            <Link className='navbar__link' to='/'>home</Link>
                        </li>
                        <li className='navbar__item active'>
                            <Link className='navbar__link' to=''>profile</Link>
                        </li>
                        <li className='navbar__item active'>
                            <Link className='navbar__link' to=''>our story</Link>
                        </li>
                        <li className='navbar__item active'>
                            <Link className='navbar__link' to=''>logout</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default NavBar