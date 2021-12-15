import API from './Settings'

export const postRequest = (request) => {
    return fetch(`${API}/requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
        .then(res => res.json())
}

export const updateVolunteer = (user) => {
    return fetch(`${API}/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}