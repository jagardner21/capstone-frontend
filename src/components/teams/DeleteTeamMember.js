import React, { Component, Fragment } from 'react'
import { Form, Input, Label, Button, Container, Row, Col, FormGroup, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { deleteUser } from '../../store/users/actions'

class DeleteTeamMember extends Component {

    state = {
        confirmation: '',
        deleteButtonActive: false,
        user_id: this.props.user.id
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
        // console.log("USER ID", this.state.user_id)
        this.props.dispatch(deleteUser(this.state.user_id))
    }

    render () {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup className="mt-3 mb-3">
                                    <Label className="mr-2">Are you SURE?</Label>
                                    <Input onChange={this.handleChange} name="confirmation" value={this.state.confirmation} placeholder={"Type 'I am sure' to confirm"} className="mr-3 mb-3"></Input>
                                </FormGroup>                          
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <ModalFooter>
                    <Button onClick={this.handleSubmit} disabled={!this.state.deleteButtonActive} color="danger" >DELETE USER FOR REAL</Button>
                    <Button onClick={this.props.toggleDeleteTeamMemberModal} color="secondary">Cancel</Button>
                </ModalFooter>
            </Fragment>
        )
    }
}
export default connect()(DeleteTeamMember)