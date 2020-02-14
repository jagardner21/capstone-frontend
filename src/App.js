import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { getEvents } from './store/events/actions'
import { getTeams } from './store/teams/actions'
import { getUsers } from './store/users/actions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NewEventForm from './components/events/NewEventForm'



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getTeams())
    dispatch(getEvents())
  }, [])
  
  return (
    <div className="App">
      <Router>
        <NewEventForm  />
      </Router>
      
    </div>
  );
}

export default App;
