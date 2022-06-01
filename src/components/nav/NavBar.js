import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getThisUser } from '../../repositories/usersRepository'
import { getAllRequests } from '../../repositories/requestsRepository'
import { getAllOffers } from '../../repositories/volunteersRepository'
import logo from '../img/cotc_logo-300x147.png'
import './NavBar.css'

function NavBar() {

    const [ showPath, setShowPath ] = useState({})
    const [ thisUser, setThisUser ] = useState({})
    const [ requests, setRequests ] = useState([])
    const [ requestByThisUser, setRequestByThisUser ] = useState ({})
    const [ offers, setOffers ] = useState([])
    const [ offerByThisUser, setOfferByThisUser ] = useState ({})
    const [ visibility, setVisibility ] = useState(false)
    const [ navTitle, setNavTitle ] = useState("")
    const [ linkMsg, setLinkMsg ] = useState("")
    const [ linkHomeMsg, setLinkHomeMsg ] = useState("")
    const [ show, setShow ] = useState(true)
    const [ navVersion, setNavVersion ] = useState("")
    const location = useLocation()
    
    const controlNavBar = () => {
        window.scrollY >= 1 ? setShow(false)
        : setShow(true)
    }
    
    useEffect(
        () => {
            setShowPath(location)
        },
        [location]
    )
    
    useEffect(
        () => {
            window.addEventListener('scroll', controlNavBar)
            return () => {
                window.removeEventListener('scroll', controlNavBar)
            }
        },
        []
    )

    useEffect(
        () => {
            getThisUser(parseInt(localStorage.getItem('communityCare_user')))
            .then((user) => {
                setThisUser(user)
            })
        },
        []
    )

    useEffect(
        () => {
            getAllRequests()
            .then((request) => {
                setRequests(request)
            })
        },
        []
    )

    useEffect(
        () => {
            const foundRequest = requests.find(request => request.userId === thisUser.id)
            setRequestByThisUser(foundRequest)
        },
        [requests, thisUser.id]
    )

    useEffect(
        () => {
            getAllOffers()
            .then((offers) => {
                setOffers(offers)
            })
        },
        []
    )

    useEffect(
        () => {
            const foundOffer = offers.find(offer => offer.userId === thisUser.id)
            setOfferByThisUser(foundOffer)
        },
        [offers, thisUser.id]
    )

    useEffect(
        () => {
            requestByThisUser || offerByThisUser ? setNavTitle('Check Status')
            : setNavTitle('Profile')
        },
        [offerByThisUser, requestByThisUser]
    )

    useEffect(
        () => {
            requestByThisUser && !offerByThisUser ? setLinkMsg('/CheckRequestStatus')
            : offerByThisUser && !requestByThisUser ? setLinkMsg('/VolunteerStatus')
            : setLinkMsg('/EditProfile')
        },
        [offerByThisUser, requestByThisUser]
    )

    const showMenu = () => {
        visibility === false ? setVisibility(true) : setVisibility(false)
    }

    useEffect(
        () => {
            showPath.pathname === "/" ?
                setNavVersion(`header-active ${show && 'header-hidden'} flex`)
                : setNavVersion('container--header flex')
        },
        [showPath, show]
    )

    useEffect(
        () => {
            showPath.pathname === "/" ?
                setLinkHomeMsg('/')
                : setLinkHomeMsg('/AfterRegistration')
        },
        [showPath]
    )
    
    const selectNav = () => {
        if (localStorage.getItem('communityCare_user')) {
            return (
                <>
                    <li className='navbar__item active'>
                        <Link className='navbar__link' to={linkHomeMsg}>home</Link>
                    </li>
                    <li className='navbar__item active'>
                        <Link className='navbar__link' to={linkMsg}>{navTitle}</Link>
                    </li>
                    <li className='navbar__item active'>
                        <Link className='navbar__link' to='/ServiceStories'>our story</Link>
                    </li>
                    <li className='navbar__item active'>
                        <Link className='navbar__link' to='/' 
                            onClick={
                                () => {
                                    localStorage.removeItem('communityCare_user')
                                }
                            }>logout</Link>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className='navbar__item active'>
                        <Link className='navbar__link' to='/'>home</Link>
                    </li>
                    <li className='navbar__item active'>
                        <Link className='navbar__link' to=''>our story</Link>
                    </li>
                </>
            )
        }
    }





    return (
        <>
            <header id="container--navbar" 
            
            
            className={navVersion}>
                <div>
                    <img src={logo} className="header--logo" alt="logo" />
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

                <nav>
                    <ul id='navbar' data-visible={visibility} className='navbar flex'>
                        {selectNav()}
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default NavBar