import React, { useState } from 'react'
import { Form,  Container, Row, Col, Button, Modal, ModalHeader, ModalFooter, ModalBody, Label, Input } from 'reactstrap'
import TeamMember from './TeamMember'
import EditTeam from './EditTeam'
import { connect } from 'react-redux'

const Team = (props) => {

    const [editTeamModal, setEditTeamModal] = useState(false);

    const toggleEditTeamModal = () => setEditTeamModal(!editTeamModal);

    const [deleteTeamModal, setDeleteTeamModal] = useState(false)

    const toggleDeleteTeamModal = () => setDeleteTeamModal(!deleteTeamModal)

    const teamMembers = props.users.map(user => {
        if(user.team_id == props.team.id){
            return <TeamMember key={user.id} user={user}></TeamMember>
        }
    })


    return (
        <Container>
                 
            <Modal isOpen={editTeamModal} toggle={toggleEditTeamModal} className="">
            <ModalHeader toggle={toggleEditTeamModal}>Edit Team</ModalHeader>
            <EditTeam team={props.team}></EditTeam>
            {/* <ModalBody>
              Modal Body - needed?
            </ModalBody> */}
            <ModalFooter>
            <Button color="secondary" onClick={toggleEditTeamModal}>Cancel</Button>
            </ModalFooter>
            </Modal>

            <Container className="card status-card pl-3 pt-3 pb-2 pr-0 mb-2">
                <Row>
                    <Col className="pl-3" xs="9">
                            <h6>{props.team.name}</h6>
                    </Col>
                    <Col className="pl-5 pr-0">
                    <Button color="light" onClick={toggleEditTeamModal} size="sm">Edit Team</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="1"></Col>
                    <Col className="pl-1" xs="11">
                        {teamMembers}
                    </Col>
                </Row>
            </Container>
            
        </Container>
    )

}

function mapStateToProps(state){
    return {
        teams: state.teams.all, 
        users: state.users.all
    }
}
export default connect(mapStateToProps)(Team) 