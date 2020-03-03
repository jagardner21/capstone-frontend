import React, { Component } from 'react'
import { Form, Input, Label, Button, Container, Row, Col, FormGroup } from 'reactstrap'
import { connect } from 'react-redux'
import { editTeam } from '../../store/teams/actions'

class EditTeam extends Component {

    state = {
        name: ''
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.dispatch(editTeam(this.state))
    }

    render () {
        return (
            <Container>
                <Row>
                    <Col>
                        <Form inline onSubmit={this.handleSubmit}>
                            <FormGroup className="mt-3 mb-3">
                                <Label className="mr-2">New Team Name:</Label>
                                <Input onChange={this.handleChange} name="name" value={this.state.name} placeholder={this.props.team.name} default={this.props.team.name} className="mr-3"></Input>
                                <Button color="primary" size="sm" onClick={this.handleSubmit}>Submit</Button>
                            </FormGroup>                          
                        </Form>
                    </Col>
                </Row>
            </Container>
            
        )
    }
}
export default connect()(EditTeam)