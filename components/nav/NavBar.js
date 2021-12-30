import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getThisUser } from '../../repositories/usersRepository'
import { getAllRequests } from '../../repositories/requestsRepository'
import { getAllOffers } from '../../repositories/volunteersRepository'
import logo from '../img/cotc_logo-300x147.png'
import './NavBar.css'

function NavBar() {

    const [ thisUser, setThisUser ] = useState({})
    const [ requests, setRequests ] = useState([])
    const [ requestByThisUser, setRequestByThisUser ] = useState ({})
    const [ offers, setOffers ] = useState([])
    const [ offerByThisUser, setOfferByThisUser ] = useState ({})
    const [visibility, setVisibility] = useState(false)
    const [ navTitle, setNavTitle ] = useState("")
    const [ linkMsg, setLinkMsg ] = useState("")

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
        []
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
        []
    )

    useEffect(
        () => {
            requestByThisUser || offerByThisUser ? setNavTitle('Check Status')
            : setNavTitle('Profile')
        },
        []
    )

    useEffect(
        () => {
            requestByThisUser && !offerByThisUser ? setLinkMsg('/CheckRequestStatus')
            : offerByThisUser && !requestByThisUser ? setLinkMsg('/VolunteerStatus')
            : setLinkMsg('/EditProfile')
        },
        []
    )

    const showMenu = () => {
        visibility === false ? setVisibility(true) : setVisibility(false)
    }

    const selectNav = () => {
        if (localStorage.getItem('communityCare_user')) {
            return (
                <>
                    <li className='navbar__item active'>
                        <Link className='navbar__link' to='/AfterRegistration'>home</Link>
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
            <header id='container--header' className='container--header flex'>
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
                        {selectNav()}
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default NavBar