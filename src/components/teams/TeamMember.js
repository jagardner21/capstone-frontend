import React from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Button } from 'reactstrap'
const TeamMember = (props) => {
  return (
    <tr>
        <th scope="row">{props.user.id}</th>
        <td>{props.user.name}</td>
        <td><Button color="light" size="sm"><FaEdit/></Button></td>
        <td><Button size="sm" color="danger"><FaTrashAlt /></Button></td>
    </tr>
  )
}
export default TeamMember