import React, { Component, Fragment } from 'react'
import { Form, Input, Label, Button, Container, Row, Col, FormGroup, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { addTeam } from '../../store/teams/actions'

class NewTeam extends Component {

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
        this.props.dispatch(addTeam(this.state))
        this.props.toggleNewTeamModal()
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
                                    <Input onChange={this.handleChange} name="name" value={this.state.name} placeholder={"Enter name"} className="mr-3"></Input>
                                </FormGroup>                          
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <ModalFooter>
                    <Button onClick={this.handleSubmit} color="primary" >Add Team</Button>
                    <Button color="secondary" onClick={this.props.toggleNewTeamModal}>Cancel</Button>
                </ModalFooter>
            </Fragment>
        )
    }
}
export default connect()(NewTeam)