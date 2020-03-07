import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Modal, ModalHeader } from 'reactstrap'
import Team from './Team'
import NewTeam from './NewTeam'

const Teams = (props) => {

    let teams = props.teams

    let teamObjects = teams.map(team => {
        return <Team key={team.id} team={team}></Team>
    })

    const [newTeamModal, setNewTeamModal] = useState(false);

    const toggleNewTeamModal = () => setNewTeamModal(!newTeamModal);

    return (
        <Fragment>
            <Modal isOpen={newTeamModal} toggle={toggleNewTeamModal}>
                <ModalHeader>New Team</ModalHeader>
                <NewTeam toggleNewTeamModal={toggleNewTeamModal} team={props.team}></NewTeam>
            </Modal>
            <Container className="mt-5">
            <h3 className="mb-3">Troubleshooter Teams</h3>
            <Button onClick={toggleNewTeamModal} className="mb-3" size="sm">Add New Team</Button>            
            {teamObjects}
        </Container>
        </Fragment>
        
  )
}


function mapStateToProps(state){
    return {
        teams: state.teams.all
    }
}
export default connect(mapStateToProps)(Teams) 