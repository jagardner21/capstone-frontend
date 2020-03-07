import React, { useState, Fragment } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Button, Modal, ModalHeader } from 'reactstrap'
import EditTeamMember from './EditTeamMember'
import DeleteTeamMember from './DeleteTeamMember'

const TeamMember = (props) => {

  const [editTeamMemberModal, setEditTeamMemberModal] = useState(false)

  const toggleEditTeamMemberModal = () => setEditTeamMemberModal(!editTeamMemberModal)
  
  const [deleteTeamMemberModal, setDeleteTeamMemberModal] = useState(false)

  const toggleDeleteTeamMemberModal = () => setDeleteTeamMemberModal(!deleteTeamMemberModal)

  return (
    <Fragment>
      <Modal isOpen={editTeamMemberModal} toggle={toggleEditTeamMemberModal}>
        <ModalHeader>Edit Team Member</ModalHeader>
        <EditTeamMember toggleEditTeamMemberModal={toggleEditTeamMemberModal} toggle={toggleEditTeamMemberModal} user={props.user}></EditTeamMember>
      </Modal>

      <Modal isOpen={deleteTeamMemberModal} toggle={toggleDeleteTeamMemberModal}>
          <ModalHeader>Delete Team member</ModalHeader>
          <DeleteTeamMember toggleDeleteTeamMemberModal={toggleDeleteTeamMemberModal} toggle={toggleDeleteTeamMemberModal} user={props.user}></DeleteTeamMember>
      </Modal>
            
      <tr>
        <th scope="row">{props.user.id}</th>
        <td>{props.user.name}</td>
        <td><Button onClick={toggleEditTeamMemberModal} color="light" size="sm"><FaEdit/></Button></td>
        <td><Button onClick={toggleDeleteTeamMemberModal} size="sm" color="danger"><FaTrashAlt /></Button></td>
      </tr>
    </Fragment>
    
  )
}
export default TeamMember