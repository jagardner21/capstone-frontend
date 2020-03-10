import React, { Component, Fragment } from 'react'
import { Form, Input, Label, Button, Container, Row, Col, FormGroup, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { editUser } from '../../store/users/actions'

class EditTeamMember extends Component {

    state = {
        id: this.props.user.id,
        name: this.props.user.name,
        team_id: this.props.user.team_id,
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.dispatch(editUser(this.state))
        this.props.toggleEditTeamMemberModal()
    }

    render () {

        let teams = this.props.teams

        let teamsOptions = teams.map(team => {
            return <option key={team.id} value={team.id}>{team.name}</option>
        })

        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup className="mt-3 mb-3">
                                    <Label className="mr-2">New Name:</Label>
                                    <Input onChange={this.handleChange} name="name" type="text" value={this.state.name} default={this.props.user.name} className="mr-3 mb-2"></Input>
                                    <Label className="mr-2">New Team:</Label>
                                    <Input onChange={this.handleChange} name="team_id" type="select" value={this.state.team_id} default={this.props.user.team_id} className="mr-3">
                                        {teamsOptions && teamsOptions}    
                                    </Input>
                                </FormGroup>                          
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <ModalFooter>
                    <Button onClick={this.handleSubmit}   color="primary" >Submit</Button>
                    <Button onClick={this.props.toggleEditTeamMemberModal} color="secondary" >Cancel</Button>
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