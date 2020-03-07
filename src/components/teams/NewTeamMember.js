import React, { Component, Fragment } from 'react'
import { Form, Input, Label, Button, Container, Row, Col, FormGroup, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { addUser } from '../../store/users/actions'

class NewTeamMember extends Component {

    state = {
        name: '',
        team_id: this.props.team.id
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.dispatch(addUser(this.state))
        this.props.toggleAddTeamMemberModal()
    }

    render () {

        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <Form inline onSubmit={this.handleSubmit}>
                                <FormGroup className="mt-3 mb-3">
                                    <Label className="mr-2">New Troubleshooter Name:</Label>
                                    <Input onChange={this.handleChange} name="name" value={this.state.name} placeholder={"Enter name"} className="mr-3"></Input>
                                </FormGroup>                          
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <ModalFooter>
                    <Button onClick={this.handleSubmit} color="primary" >Add Troubleshooter</Button>
                    <Button color="secondary" onClick={this.props.toggleAddTeamMemberModal}>Cancel</Button>
                </ModalFooter>
            </Fragment>
        )
    }
}
export default connect()(NewTeamMember)