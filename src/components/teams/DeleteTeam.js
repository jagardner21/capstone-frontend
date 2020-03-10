import React, { Component, Fragment } from 'react'
import { Form, Input, Label, Button, Container, Row, Col, FormGroup, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { deleteTeam } from '../../store/teams/actions'

class DeleteTeam extends Component {

    state = {
        confirmation: '',
        deleteButtonActive: false,
        team_id: this.props.team.id
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        }, () => {
            if(this.state.confirmation == "I am sure"){
                this.setState({
                    deleteButtonActive: true
                })
            } else {
                this.setState({
                    deleteButtonActive: false
                })
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.dispatch(deleteTeam(this.state.team_id, this.props.team))
    }

    render () {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup className="mt-3 mb-3">
                                    <Label className="mr-2">DELETE TEAM FOR REAL?</Label>
                                    <Input onChange={this.handleChange} name="confirmation" value={this.state.confirmation} placeholder={"Type 'I am sure' to confirm"}  className="mr-3 mb-3"></Input>
                                </FormGroup>                          
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <ModalFooter>
                    <Button disabled={!this.state.deleteButtonActive} color="danger" onClick={this.handleSubmit}>DELETE TEAM FOR REAL</Button>
                    <Button color="secondary" onClick={this.props.toggleDeleteTeamModal}>Cancel</Button>
                </ModalFooter>
            </Fragment>
        )
    }
}
export default connect()(DeleteTeam)