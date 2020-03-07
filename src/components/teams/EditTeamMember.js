import React, { Component, Fragment } from 'react'
import { Form, Input, Label, Button, Container, Row, Col, FormGroup, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { editUser } from '../../store/users/actions'

class EditTeamMember extends Component {

    state = {
        name: '',
        team_id: 0,
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        console.log("WORKING!!!")
        // e.preventDefault()
        // this.props.dispatch(editTeam(this.state))
    }

    render () {

        let teams = this.props.teams
        let userTeam = teams.filter(team => {
            return team.id == this.props.teamMember.team_id
        })[0]

        let userTeamName = userTeam.name

        let teamsOptions = teams.map(team => {
            if(team.id !== userTeam.id){
                return <option key={team.id} value={team.id}>{team.name}</option>
            }   
        })

        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup className="mt-3 mb-3">
                                    <Label className="mr-2">New Name:</Label>
                                    <Input onChange={this.handleChange} name="name" value={this.state.name} placeholder={this.props.teamMember.name} default={this.props.teamMember.name} className="mr-3 mb-2"></Input>
                                    <Label className="mr-2">New Team:</Label>
                                    <Input onChange={this.handleChange} name="team_id" type="select" value={this.state.team_id} className="mr-3">
                                        <option selected value={this.props.teamMember.team_id}>{userTeamName}</option>
                                        {teamsOptions}    
                                    </Input>
                                </FormGroup>                          
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <ModalFooter>
                    <Button onClick={this.handleSubmit} color="primary" >Submit</Button>
                    <Button color="secondary" onClick={this.props.toggleEditTeamMemberModal}>Cancel</Button>
                </ModalFooter>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    return {
        teams: state.teams.all
    }
}
export default connect(mapStateToProps)(EditTeamMember)