import axios from 'axios'
import { GET_EVENTS_PENDING, GET_EVENTS_SUCCESS, GET_EVENTS_FAILED, GET_ONE_EVENT_PENDING, GET_ONE_EVENT_SUCCESS, GET_ONE_EVENT_FAILED, ADD_EVENT_PENDING, ADD_EVENT_SUCCESS, ADD_EVENT_FAILED, EDIT_EVENT_SUCCESS, EDIT_EVENT_PENDING, EDIT_EVENT_FAILED, DELETE_EVENT_PENDING, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILED } from './constants'

const url = "http://localhost:8080"

export const getEvents = () => {
    return dispatch => {
        dispatch({
            type: GET_EVENTS_PENDING
        })
        axios.get(`${url}/events`)
            .then(res => {
                let events = res.data
                dispatch({
                    type: GET_EVENTS_SUCCESS,
                    payload: events
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_EVENTS_FAILED,
                    payload: error
                })
            })
    }
}

export const getOneEvent = id => {
    return dispatch => {
        dispatch({
            type: GET_ONE_EVENT_PENDING
        })
        axios.get(`${url}/events/${id}`)
            .then(res => {
                let event = res.data
                dispatch({
                    type: GET_ONE_EVENT_SUCCESS,
                    payload: event
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_ONE_EVENT_FAILED,
                    payload: error
                })
            })
    }
}

export const addEvent = newEvent => {
    return dispatch => {
        dispatch({
            type: ADD_EVENT_PENDING
        })
        axios.put(`${url}/events`, newEvent)
            .then(res => {
                let newEvent = res.json
                dispatch({
                    type: ADD_EVENT_SUCCESS,
                    payload: newEvent
                })
            })
            .catch(error => {
                dispatch({
                    type: ADD_EVENT_FAILED,
                    payload: error
                })
            })
    }
}

export const editEvent = editedEvent => {
    return dispatch => {
        dispatch({
            type: EDIT_EVENT_PENDING
        })
        axios.patch(`${url}/events/${editedEvent.id}`, editedEvent)
            .then(res => {
                dispatch({
                    type: EDIT_EVENT_SUCCESS,
                    payload: editedEvent
                })
            })
            .catch(error => {
                dispatch({
                    type: EDIT_EVENT_FAILED,
                    payload: error
                })
            })
    }
}

export const deleteEvent = id => {
    return dispatch => {
        dispatch({
            type: DELETE_EVENT_PENDING
        })
        axios.delete(`${url}/events/${id}`)
            .then(res => {
                let deletedEvent = res.data
                dispatch({
                    type: DELETE_EVENT_SUCCESS,
                    payload: deletedEvent
                })
            })
            .catch(error => {
                dispatch({
                    type: DELETE_EVENT_FAILED,
                    payload: error
                })
            })
    }
}