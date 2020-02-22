import React, { Component } from 'react'
import { BarChart, Line } from 'recharts'
import { connect } from 'react-redux'
import { Form, Row, Col, FormGroup, Label, Input, Button} from 'reactstrap'

class Analytics extends Component {

    state = {
        teamName: '',
        startDate: '',
        endDate: ''
    }

    render(){
  
        const teams = this.props.teams
        const events = this.props.events
        const users = this.props.users



        const data = {}
        
        return (
            <div>
                <Form>
                    <Row form>
                        <Col xs={4}>
                            <FormGroup row>
                                <Label>Select Team</Label>
                                <Input type="select"></Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mr-4">
                            <FormGroup row>
                                <Label>Start Date</Label>
                                <Input type="date"></Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup row>
                                <Label>End Date</Label>
                                <Input type="date"></Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    
                </Form>
                Some Charts will go here
                <BarChart width={400} height={400} data={data}>
                    <Line type="monotone" dataKey="type"></Line>
                </BarChart>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        users: state.users.all,
        teams: state.teams.all,
        events: state.events.all
    }

}

export default connect(mapStateToProps)(Analytics)