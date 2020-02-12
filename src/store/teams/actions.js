import axios from 'axios'
import { GET_TEAMS_PENDING, GET_TEAMS_SUCCESS, GET_TEAMS_FAILED, GET_ONE_TEAM_PENDING, GET_ONE_TEAM_SUCCESS, GET_ONE_TEAM_FAILED, ADD_TEAM_PENDING, ADD_TEAM_SUCCESS, ADD_TEAM_FAILED, EDIT_TEAM_PENDING, EDIT_TEAM_SUCCESS, EDIT_TEAM_FAILED, DELETE_TEAM_PENDING, DELETE_TEAM_SUCCESS, DELETE_TEAM_FAILED } from './constants'

const url = "http://localhost:8080"

export const getTeams = () => {
    return dispatch => {
        dispatch({
            type: GET_TEAMS_PENDING
        })
        axios.get(`${url}/teams`)
            .then(res => {
                let teams = res.data
                dispatch({
                    type: GET_TEAMS_SUCCESS,
                    payload: teams
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_TEAMS_FAILED,
                    payload: error
                })
            })
    }
}

export const getOneTeam = id => {
    return dispatch => {
        dispatch({
            type: GET_ONE_TEAM_PENDING
        })
        axios.get(`${url}/teams/${id}`)
            .then(res => {
                let team = res.data
                dispatch({
                    type: GET_ONE_TEAM_SUCCESS,
                    payload: team
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_ONE_TEAM_FAILED,
                    payload: error
                })
            })
    }
}

export const addTeam = newTeam => {
    return dispatch => {
        dispatch({
            type: ADD_TEAM_PENDING
        })
        axios.put(`${url}/teams`, newTeam)
            .then(res => {
                let newTeam = res.json
                dispatch({
                    type: ADD_TEAM_SUCCESS,
                    payload: newTeam
                })
            })
            .catch(error => {
                dispatch({
                    type: ADD_TEAM_FAILED,
                    payload: error
                })
            })
    }
}

export const editTeam = editedTeam => {
    return dispatch => {
        dispatch({
            type: EDIT_TEAM_PENDING
        })
        axios.patch(`${url}/teams/${editedTeam.id}`, editedTeam)
            .then(res => {
                dispatch({
                    type: EDIT_TEAM_SUCCESS,
                    payload: editedTeam
                })
            })
            .catch(error => {
                dispatch({
                    type: EDIT_TEAM_FAILED,
                    payload: error
                })
            })
    }
}

export const deleteTeam = id => {
    return dispatch => {
        dispatch({
            type: DELETE_TEAM_PENDING
        })
        axios.delete(`${url}/teams/${id}`)
            .then(res => {
                let deletedTeam = res.data
                dispatch({
                    type: DELETE_TEAM_SUCCESS,
                    payload: deletedTeam
                })
            })
            .catch(error => {
                dispatch({
                    type: DELETE_TEAM_FAILED,
                    payload: error
                })
            })
    }
}