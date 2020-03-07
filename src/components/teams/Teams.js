import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Row, Col } from 'reactstrap'
import Team from './Team'

const Teams = (props) => {

    let teams = props.teams

    let teamObjects = teams.map(team => {
        return <Team key={team.id} team={team}></Team>
    })

    return (
        <Container className="mt-5">
            <h3 className="mb-3">Troubleshooter Teams</h3>
            <Button className="mb-3" size="sm">Add New Team</Button>            
            {teamObjects}
        </Container>
  )
}


function mapStateToProps(state){
    return {
        teams: state.teams.all
    }
}
export default connect(mapStateToProps)(Teams) 