import React, { useState } from 'react'
import { connect } from 'react-redux'
import Team from './Team'
import { Button, Modal, ModalHeader, ModalBody, NavLink, ModalFooter } from 'reactstrap'
import { Container, Row, Col, Link } from 'reactstrap'


const Teams = (props) => {

    let teams = props.teams

    let teamObjects = teams.map(team => {
        return <Team key={team.id} team={team}></Team>
    })

    return (
        <div>
            <h3 className="mb-4">Troubleshooter Teams</h3>
            {teamObjects}
        </div>
  )
}


function mapStateToProps(state){
    return {
        teams: state.teams.all
    }
}
export default connect(mapStateToProps)(Teams) 