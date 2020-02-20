import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { addEvent } from '../../store/events/actions'
import { setSelectedTeam } from '../../store/teams/actions'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class NewEventForm extends Component {

    state = {
        user_id: 0,
        type: "",
        durationInMinutes: 0,
        date: ""
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value }, ()=> console.log("STATE", this.state))
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.dispatch(addEvent(this.state))
        //ensure submit only works if all inputs filled out
        //TODO: clear out the form back to default state
    }

    handleSelectTeam = e => {
        let { value } = e.target
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
            <Form onSubmit={this.handleSubmit} className="pb-5">
                <FormGroup>
                    <Label>Team Name</Label>
                    <Input onChange={this.handleSelectTeam} type="select" name="team name">
                        <option selected disabled>Select Team</option> 
                        {teamsOptions} 
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Troubleshooter</Label>
                    <Input onChange={this.handleChange} type="select" name="user_id">
                        <option selected disabled>Select User</option> 
                        {usersOptions} 
                    </Input>
                </FormGroup>
                <FormGroup>
                <FormGroup>
                    <Label>Task Type</Label>
                    <Input onChange={this.handleChange} type="select" name="type">
                        <option selected disabled>Select Task</option>
                        {/* LOOK INTO WHETHER OR NOT DIFFERENT TEAMS HAVE DIFFERENT TASK TYPES */}
                        <option>Task Type 1</option>
                        <option>Task Type 2</option>
                        <option>Task Type 3</option>
                        <option>Task Type 4</option>
                        <option>Task Type 5</option>
                        </Input>
                </FormGroup>
                    <Label>Date</Label>
                    <Input onChange={this.handleChange} type="date" name="date"/>
                </FormGroup>
                <FormGroup>
                    <Label>Duration (in minutes)</Label>
                    <Input onChange={this.handleChange} type="number" name="durationInMinutes"/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        )
    }
}

function mapStateToProps(state){
    return {
        users: state.users.all,
        teams: state.teams.all,
        selectedTeamId: state.teams.selectedTeamId,
        event: state.events.all
    }
}

export default connect(mapStateToProps)(NewEventForm)