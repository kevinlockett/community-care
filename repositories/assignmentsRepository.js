import API from "./Settings";

export const getAllAssignments = () => {
    return fetch(`${API}/assignments`)
        .then(res => res.json())
}

export const addAssignment = (assignment) => {
    return fetch(`${API}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(assignment)
    })
        .then(res => res.json())
}
