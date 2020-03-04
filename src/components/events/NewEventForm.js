import React, { Component } from 'react'
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { addEvent } from '../../store/events/actions'
import { setSelectedTeam } from '../../store/teams/actions'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class NewEventForm extends Component {

    state = {
        team_name: 0,
        user_id: 0,
        type: 0,
        durationInMinutes: 0,
        date: ""
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = e => {
        e.preventDefault()
        let { team_name, ...newEvent } = this.state
        this.props.dispatch(addEvent(newEvent))
        this.setState({
            team_name: 0,
            user_id: 0,
            type: 0,
            durationInMinutes: 0,
            date: ""
        })
    }

    handleSelectTeam = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
        this.props.dispatch(setSelectedTeam(value))
    }


    render() {

        let teams = this.props.teams
        let teamsOptions = teams.map(team => {
            return <option key={team.id} value={team.id}>{team.name}</option>
        })

        let users = this.props.users.filter(user => {
            return user.team_id == this.props.selectedTeamId
        })
        let usersOptions = users.map(user => {
            return <option key={user.id} value={user.id}>{user.name}</option>
        })

        
        
        return (
            <Container>
                <h3 className="mb-4">Track Event</h3>    
                <Form onSubmit={this.handleSubmit} className="pb-5 pl-5">
                    <FormGroup>
                        <Label>Select Team</Label>
                        <Input className="w-75" onChange={this.handleSelectTeam} value={this.state.team_name} type="select" name="team_name">
                            <option value="0" selected disabled>Select Team</option> 
                            {teamsOptions} 
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Troubleshooter</Label>
                        <Input className="w-75" onChange={this.handleChange} value={this.state.user_id} type="select" name="user_id">
                            <option value="0" selected disabled>Select User</option> 
                            {usersOptions} 
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Task Type</Label>
                        <Input className="w-75" onChange={this.handleChange} value={this.state.type} type="select" name="type">
                            <option value="0" selected disabled>Select Task</option>
                            {/* LOOK INTO WHETHER OR NOT DIFFERENT TEAMS HAVE DIFFERENT TASK TYPES */}
                            <option>Task Type 1</option>
                            <option>Task Type 2</option>
                            <option>Task Type 3</option>
                            <option>Task Type 4</option>
                            <option>Task Type 5</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Date</Label>
                        <Input className="w-75" onChange={this.handleChange} value={this.state.date} type="date" name="date"/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Duration (in minutes)</Label>
                        <Input className="w-75" onChange={this.handleChange} value={this.state.durationInMinutes} type="number" name="durationInMinutes"/>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </Container>
            
        )
    }
}

function mapStateToProps(state){
    return {
        users: state.users.all,
        teams: state.teams.all,
        selectedTeamId: state.teams.selectedTeamId
    }
}

export default connect(mapStateToProps)(NewEventForm)