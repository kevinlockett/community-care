import API from './Settings'

export const getAllUsers = () => {
    return fetch(`${API}/users`)
        .then(res => res.json())
}

export const getThisUser = (thisUser) => {
    return fetch(`${API}/users/${thisUser}`)
        .then(res => res.json())
}

export const addUser = (user) => {
    return fetch(`${API}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const getExistingUserEmail = (email) => {
    return fetch(`${API}/users?email=${email}`)
        .then(res => res.json())
}

