import React, { Component, Fragment } from 'react'
import { Form, Input, Label, Button, Container, Row, Col, FormGroup, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { editUser } from '../../store/users/actions'

class EditTeamMember extends Component {

    state = {
        id: this.props.user.id,
        name: '',
        team_id: this.props.user.team_id,
    }

    handleChange = e => {
        let { name, value } = e.target
        if(name == "team_id"){
            let numberValue = Number(value)
            this.setState({
                [name]: numberValue
            }, () => console.log("STATE", this.state))
        } else {
            this.setState({
                [name]: value
            }, () => {console.log("STATE", this.state)})
        }
        
    }

    handleSubmit = e => {
        console.log("WORKING!!!")
        // e.preventDefault()
        // this.props.dispatch(editUser(this.state))
    }

    render () {

        let teams = this.props.teams
        let userTeam = teams.filter(team => {
            return team.id == this.props.user.team_id
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
                                    <Input onChange={this.handleChange} name="name" value={this.state.name} placeholder={this.props.user.name} default={this.props.user.name} className="mr-3 mb-2"></Input>
                                    <Label className="mr-2">New Team:</Label>
                                    <Input onChange={this.handleChange} name="team_id" type="select" value={this.state.team_id} defaultValue={this.props.user.team_id} className="mr-3">
                                        <option selected value={this.props.user.team_id}>{userTeamName}</option>
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