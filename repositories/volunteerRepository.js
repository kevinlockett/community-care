import API from "./Settings"

export const postVolunteerSelections = (selectedTaskId) => {
    return fetch(`${API}/offers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: +localStorage.getItem("communityCare_user"),
            taskId: selectedTaskId,
            approverId: 0
        })
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

export const getAllOffersWithUsers = () => {
    return fetch(`${API}/offers?_expand=user`)
        .then(res => res.json())
}

export const deleteOffer = (id) => {
    return fetch(`${API}/offers/${id}`, {method: 'DELETE'})
}
