import { GET_EVENTS_PENDING, GET_ONE_EVENT_PENDING, ADD_EVENT_PENDING, EDIT_EVENT_PENDING, DELETE_EVENT_PENDING, GET_EVENTS_FAILED, GET_ONE_EVENT_FAILED, ADD_EVENT_FAILED, EDIT_EVENT_FAILED, DELETE_EVENT_FAILED, GET_EVENTS_SUCCESS, GET_ONE_EVENT_SUCCESS, ADD_EVENT_SUCCESS, EDIT_EVENT_SUCCESS, DELETE_EVENT_SUCCESS } from "./constants"


let initialState = {
    all: [],
    oneEvent: {},
    err: {}
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_EVENTS_PENDING:
        case GET_ONE_EVENT_PENDING:
        case ADD_EVENT_PENDING:
        case EDIT_EVENT_PENDING:
        case DELETE_EVENT_PENDING:
            return state;

        case GET_EVENTS_FAILED:
        case GET_ONE_EVENT_FAILED:
        case ADD_EVENT_FAILED:
        case EDIT_EVENT_FAILED:
        case DELETE_EVENT_FAILED:
            let error = action.payload;
            return {
                ...state,
                err: error
            }
        
        case GET_EVENTS_SUCCESS:
            let events = action.payload;
            return {
                ...state,
                all: events
            }

        case GET_ONE_EVENT_SUCCESS:
            let oneEvent = action.payload;
            return {
                ...state,
                oneEvent: oneEvent
            }

        case ADD_EVENT_SUCCESS: 
            let newEvent = action.payload;
            return {
                ...state,
                all: [newEvent, ...state.all]
            }

        case EDIT_EVENT_SUCCESS:
            let editedEvent = action.payload;
            return {
                ...state,
                all: state.all.map(event => {
                    if(event.id == editedEvent.id){
                        return editedEvent
                    } else {
                        return event
                    }
                })
            }

        case DELETE_EVENT_SUCCESS:
            let deletedEvent = action.payload;
            return {
                ...state,
                all: state.all.filter(event => {
                    return event.id !== deletedEvent.id
                })
            }

        default: return state;
    }
}