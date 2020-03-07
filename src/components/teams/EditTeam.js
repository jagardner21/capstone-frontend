import React, { Component, Fragment } from 'react'
import { Form, Input, Label, Button, Container, Row, Col, FormGroup, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { editTeam } from '../../store/teams/actions'

class EditTeam extends Component {

    state = {
        id: this.props.team.id,
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
        this.props.toggleEditTeamModal()
    }

    render () {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <Form inline onSubmit={this.handleSubmit}>
                                <FormGroup className="mt-3 mb-3">
                                    <Label className="mr-2">New Team Name:</Label>
                                    <Input onChange={this.handleChange} name="name" value={this.state.name} placeholder={this.props.team.name} default={this.props.team.name} className="mr-3"></Input>
                                </FormGroup>                          
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <ModalFooter>
                    <Button onClick={this.handleSubmit} color="primary" >Submit</Button>
                    <Button color="secondary" onClick={this.props.toggleEditTeamModal}>Cancel</Button>
                </ModalFooter>
            </Fragment>
        )
    }
}
export default connect()(EditTeam)