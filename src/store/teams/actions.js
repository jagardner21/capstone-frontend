import axios from 'axios'
import { GET_TEAMS_PENDING, GET_TEAMS_SUCCESS, GET_TEAMS_FAILED, SET_SELECTED_TEAM, ADD_TEAM_PENDING, ADD_TEAM_SUCCESS, ADD_TEAM_FAILED, EDIT_TEAM_PENDING, EDIT_TEAM_SUCCESS, EDIT_TEAM_FAILED, DELETE_TEAM_PENDING, DELETE_TEAM_SUCCESS, DELETE_TEAM_FAILED } from './constants'

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

export const setSelectedTeam = teamId => {
    return dispatch => {
        dispatch({
            type: SET_SELECTED_TEAM,
            payload: teamId
        })
    }
}

export const addTeam = newTeam => {
    return dispatch => {
        dispatch({
            type: ADD_TEAM_PENDING
        })
        axios.post(`${url}/teams`, newTeam)
            .then(res => {
                let newTeam = res.data
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
        axios.patch(`${url}/teams`, editedTeam)
            .then(res => {
                dispatch({
                    type: EDIT_TEAM_SUCCESS,
                    payload: res.data
                })
            })
            .catch(error => {
                dispatch({
                    type: EDIT_TEAM_FAILED,
                    payload: error
                })
                alert(error + ". Failed to update team information.")
            })
    }
}

export const deleteTeam = (id, teamBeingDeleted) => {
    return dispatch => {
        dispatch({
            type: DELETE_TEAM_PENDING
        })
        axios.delete(`${url}/teams/${id}`)
            .then(res => {
                dispatch({
                    type: DELETE_TEAM_SUCCESS,
                    payload: teamBeingDeleted
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