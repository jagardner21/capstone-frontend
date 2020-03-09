import axios from 'axios'
import { GET_USERS_PENDING, GET_USERS_SUCCESS, GET_USERS_FAILED, GET_ONE_USER_PENDING, GET_ONE_USER_SUCCESS, GET_ONE_USER_FAILED, ADD_USER_PENDING, ADD_USER_SUCCESS, ADD_USER_FAILED, EDIT_USER_PENDING, EDIT_USER_SUCCESS, EDIT_USER_FAILED, DELETE_USER_PENDING, DELETE_USER_SUCCESS, DELETE_USER_FAILED } from './constants'

const url = "http://localhost:8080"

export const getUsers = () => {
    return dispatch => {
        dispatch({
            type: GET_USERS_PENDING
        })
        axios.get(`${url}/users`)
            .then(res => {
                let users = res.data
                dispatch({
                    type: GET_USERS_SUCCESS,
                    payload: users
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_USERS_FAILED,
                    payload: error
                })
            })
    }
}

export const getOneUser = id => {
    return dispatch => {
        dispatch({
            type: GET_ONE_USER_PENDING
        })
        axios.get(`${url}/users/${id}`)
            .then(res => {
                let user = res.data
                dispatch({
                    type: GET_ONE_USER_SUCCESS,
                    payload: user
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_ONE_USER_FAILED,
                    payload: error
                })
            })
    }
}

export const addUser = newUser => {
    return dispatch => {
        dispatch({
            type: ADD_USER_PENDING
        })
        axios.post(`${url}/users`, newUser)
            .then(res => {
                let newUser = res.data
                dispatch({
                    type: ADD_USER_SUCCESS,
                    payload: newUser
                })
            })
            .catch(error => {
                dispatch({
                    type: ADD_USER_FAILED,
                    payload: error
                })
            })
    }
}

export const editUser = editedUser => {
    return dispatch => {
        dispatch({
            type: EDIT_USER_PENDING
        })
        axios.patch(`${url}/users`, editedUser)
            .then(res => {
                dispatch({
                    type: EDIT_USER_SUCCESS,
                    payload: res.data
                })
            })
            .catch(error => {
                dispatch({
                    type: EDIT_USER_FAILED,
                    payload: error
                })
            })
    }
}

export const deleteUser = id => {
    return dispatch => {
        dispatch({
            type: DELETE_USER_PENDING
        })
        axios.delete(`${url}/users/${id}`)
            .then(res => {
                let deletedUser = res.data
                dispatch({
                    type: DELETE_USER_SUCCESS,
                    payload: deletedUser
                })
            })
            .catch(error => {
                dispatch({
                    type: DELETE_USER_FAILED,
                    payload: error
                })
            })
    }
}