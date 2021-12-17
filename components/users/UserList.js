import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../../repositories/usersRepository'
import hero from '../img/volunteer-text.png'

function Users() {

    const [ users, setUsers ] = useState([])

    useEffect(
        () => {
            getAllUsers()
            .then((user) => {
                setUsers(user)
            })
        },
        []
    )

    return (

        <main id="container--Users" className="container--VolunteerStatus">
            <img src={hero} className="hero--Users" alt="People worshipping at Church of the City Franklin" />

            <div>
                <h1>Community Care Users:</h1>
                {
                    users.map(
                        (user) => {
                            return <ul key={`user--${user.id}`}>
                                <li>{user.first_name} {user.last_name}</li>
                                <li>{user.address}</li>
                                {
                                    user.apt ? <li>{user.apt}</li>
                                    : ""
                                }
                                <li>{user.city}, TN &nbsp; {user.zipcode}</li>
                                <li>{user.phone}</li>
                                <li>{user.email}</li>
                            </ul>
                        }
                    )
                }
            </div>
        </main>
    )
}

export default Users