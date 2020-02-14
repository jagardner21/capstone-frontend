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
        this.setState({ [name]: value })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.dispatch(addEvent(this.state))
        //TODO: clear out the form back to default state
    }

    render() {
        let teams = this.props.teams
        console.log("TEAMS", teams)
        let teamsOptions = teams.map(team => {
            return <option>{team.name}</option>
        })
        return (
            <Form onSubmit={this.handleSubmit} className="pb-5">
                <FormGroup>
                    <Label>Team Name</Label>
                    <Input onChange={this.handleChange} type="select" name="team name" placeholder="required">
                        {teamsOptions} 
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Troubleshooter</Label>
                    <Input onChange={this.handleChange} min={0} max={5} type="number" name="rating" placeholder="optional" />
                </FormGroup>
                <FormGroup>
                <FormGroup>
                    <Label>Duration</Label>
                    <Input onChange={this.handleChange} type="textarea" name="review_body" placeholder="optional"/>
                </FormGroup>
                    <Label>Date</Label>
                    <Input onChange={this.handleChange} type="textarea" name="review_body" placeholder="optional"/>
                </FormGroup>
                <FormGroup>
                    <Label>Duration</Label>
                    <Input onChange={this.handleChange} type="textarea" name="review_body" placeholder="optional"/>
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