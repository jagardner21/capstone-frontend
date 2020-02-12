import { GET_TEAMS_PENDING, GET_ONE_TEAM_PENDING, ADD_TEAM_PENDING, EDIT_TEAM_PENDING, DELETE_TEAM_PENDING, GET_TEAMS_FAILED, GET_ONE_TEAM_FAILED, ADD_TEAM_FAILED, EDIT_TEAM_FAILED, DELETE_TEAM_FAILED, GET_TEAMS_SUCCESS, GET_ONE_TEAM_SUCCESS, ADD_TEAM_SUCCESS, EDIT_TEAM_SUCCESS, DELETE_TEAM_SUCCESS } from "./constants";
import { deleteTeam } from "./actions";


let initialState = {
    all: [],
    oneTeam: {},
    err: {}
}

export default (state = initialState, action) =>{
    switch(action.type){
        case GET_TEAMS_PENDING:
        case GET_ONE_TEAM_PENDING:
        case ADD_TEAM_PENDING:
        case EDIT_TEAM_PENDING:
        case DELETE_TEAM_PENDING:
            return state;

        case GET_TEAMS_FAILED:
        case GET_ONE_TEAM_FAILED:
        case ADD_TEAM_FAILED:
        case EDIT_TEAM_FAILED:
        case DELETE_TEAM_FAILED:
            let error = action.payload;
            return {
                ...state,
                err: error
            }

        case GET_TEAMS_SUCCESS:
            let teams = action.payload;
            return {
                ...state,
                all: teams
            }

        case GET_ONE_TEAM_SUCCESS:
            let oneTeam = action.payload;
            return {
                ...state,
                oneTeam: oneTeam
            }

        case ADD_TEAM_SUCCESS:
            let newTeam = action.payload;
            return {
                ...state,
                all: [newTeam, ...state.all]
            }

        case EDIT_TEAM_SUCCESS:
            let editedTeam = action.payload;
            return {
                ...state,
                all: state.all.map(team => {
                    if(team.id == editedTeam.id){
                        return editedTeam
                    } else {
                        return team
                    }
                })
            }
        
        case DELETE_TEAM_SUCCESS:
            let deletedTeam = action.payload;
            return {
                ...state,
                all: state.all.filter(team => {
                    return team.id !== deletedTeam.id
                })
            }

        default: return state;
    }
}