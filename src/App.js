import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { getEvents } from './store/events/actions'
import { getTeams } from './store/teams/actions'
import { getUsers } from './store/users/actions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NewEventForm from './components/events/NewEventForm'
import TopNav from "./components/layout/TopNav";
import Analytics from './components/analytics/Analytics'
import { Container, Row, Col } from "reactstrap";



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
        <TopNav/>
        <Container>
          <Row>
            <Col xs="2">
            
            </Col>
            <Col xs="8">
              <Switch>
                <Route exact path="/" component={NewEventForm}/>
                  <Route path="/analytics" component={Analytics}/>
                  {/* <Route path="/teams" component={Teams}/> */}
                  {/* <Route path="/users" component={Users}/> */}
                  {/* <Route path="/events" component={Events}/> */}
              </Switch>
            </Col>
            <Col xs="2">
            
            </Col>
          </Row>
        </Container>
        
      </Router>
      
    </div>
  );
}

export default App;
