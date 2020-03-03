import React, { Component } from 'react'
import { Form, Input, Label, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { editTeam } from '../../store/teams/actions'

class EditTeam extends Component {

    state = {
        name: ''
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.dispatch(editTeam(this.state))
    }

    render () {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Label>Team Name</Label>
                <Input name="name" value={this.state.name} placeholder={this.props.team.name}></Input>
                <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
            </Form>
        )
    }
}
export default connect()(EditTeam)