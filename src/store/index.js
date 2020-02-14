import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import eventsReducer from './events/reducer'
import teamsReducer from './teams/reducer'
import usersReducer from './users/reducer'

const rootReducer = combineReducers({
    events: eventsReducer,
    teams: teamsReducer,
    users: usersReducer
})

const middleware = [thunk, logger]

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

