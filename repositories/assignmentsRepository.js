import { API } from "./Settings"

export const getAllAssignments = () => {
    return fetch(`${API}/assignments?_expand=offer&_expand=request`)
        .then(res => res.json())
}

export const getJustThisAssignment = (id) => {
    return fetch(`${API}/assignments/${id}`)
        .then(res => res.json())
}

export const getThisAssignmentExpanded = (id) => {
    return fetch(`${API}/assignments/${id}?_expand=offer&_expand=request`)
        .then(res => res.json())
}

export const addAssignment = (assignment) => {
    return fetch(`${API}/assignments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(assignment)
    })
        .then(res => res.json())
}

export const cancelAssignment = (id) => {
    return fetch(`${API}/assignments/${id}`, {method: 'DELETE'})
}

export const updateAssignment = (assignment) => {
    return fetch(`${API}/assignments/${assignment.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(assignment)
    })
        .then(res => res.json())
}
