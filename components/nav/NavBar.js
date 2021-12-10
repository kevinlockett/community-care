import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import logo from '../img/cotc_logo-300x147.png'
import './NavBar.css'

function NavBar() {

    const [navVisibility, setNavVisibility] = useState({
        isVisible: false
    })

    useEffect(
        () => {
            fetch("http://localhost:8088/visibility")
                .then(res => res.json())
                .then((data) => {
                    setNavVisibility(data)
                })
        },
        []
    )

    const showMenu = () => {
        navVisibility.isVisible === false ? chngMenuVisibility(true) : chngMenuVisibility(false)
    }

    const history = useHistory()

    const chngMenuVisibility = (bool) => {
        const newMenuValue = {
            isVisible: bool
        }

        return postVisibility(newMenuValue)
            .then(() => {
                history.push("/")
            })
    }

    const postVisibility = (newMenuValue) => {
        return fetch("http://localhost:8088/visibility", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMenuValue)
        })
    }

    return (
        <>
            <header id='header' className='header flex'>
                <div>
                    <img src={logo} className="header-logo" alt="logo" />
                </div>

                <button className='mobile-nav-toggle filter-yellow'
                    aria-controls='navbar'
                    aria-expanded={navVisibility.isVisible}
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
                    <ul id='navbar' data-visible={navVisibility.isVisible} className='navbar flex'>
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