import React, { Component } from 'react'
import { Form, Input, Label, Button, Container, Row, Col, FormGroup } from 'reactstrap'
import { connect } from 'react-redux'
import { deleteTeam } from '../../store/teams/actions'

class DeleteTeam extends Component {

    state = {
        confirmation: '',
        deleteButtonActive: false
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
        this.props.dispatch(deleteTeam("!!!!!!!!!!!!!!! needs to be req.params maybe? --> OOORR team.id, yeah yeah, that."))
    }

    render () {
        return (
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup className="mt-3 mb-3">
                                <Label className="mr-2">DELETE TEAM FOR REAL?</Label>
                                <Input onChange={this.handleChange} name="confirmation" value={this.state.confirmation} placeholder={"Type 'I am sure' to confirm"} default={this.props.team.name} className="mr-3 mb-3"></Input>
                                <Button disabled={!this.state.deleteButtonActive} color="danger" size="sm" onClick={this.handleSubmit}>DELETE TEAM FOR REAL</Button>
                            </FormGroup>                          
                        </Form>
                    </Col>
                </Row>
            </Container>
            
        )
    }
}
export default connect()(DeleteTeam)