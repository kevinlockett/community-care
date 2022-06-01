import { API } from "./Settings"

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

export const getAllRequests = () => {
    return fetch(`${API}/requests`)
        .then(res => res.json())
}

export const getAllRequestsWithUsers = () => {
    return fetch(`${API}/requests?_expand=user`)
        .then(res => res.json())
}

export const updateRequest = (request) => {
    return fetch(`${API}/requests/${request.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
        .then(res => res.json())
}

export const getRequestDetails = (requestDetailsId) => {
    return fetch(`${API}/requests/${requestDetailsId}?_expand=user&_expand=task`)
            .then( response => response.json())
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, {method: 'DELETE'})
}

