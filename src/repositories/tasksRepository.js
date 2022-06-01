import { API } from "./Settings"

export const getAllTasks = () => {
    return fetch(`${API}/tasks`)
        .then(res => res.json())
}

export const getRequestsWithTasks = () => {
    return fetch(`${API}/requests?_expand=task`)
        .then(res => res.json())
}

export const addTask = (task) => {
    return fetch(`${API}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        .then(res => res.json())
}



