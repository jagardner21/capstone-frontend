import React, { Component } from 'react'
import { BarChart, Bar, XAxis, CartesianGrid, YAxis, Tooltip, Legend } from 'recharts'
import { connect } from 'react-redux'
import { Form, Row, Col, FormGroup, Label, Input, Button} from 'reactstrap'

class Analytics extends Component {

    state = {
        teamId: '',
        startDate: '',
        endDate: ''
    }

    handleChange = e => {
        let { value, name } = e.target
        this.setState({ [name]: value })
    }

    render(){
  
        const teams = this.props.teams
        const events = this.props.events
        const users = this.props.users

        // const data = events.map(event => {
            

        //     if(isValidStartDate && isValidEndDate && users[event.user_id].team_id === this.state.teamId){
        //         return {
        //                 name: [event.type],
        //                 hours: [event.durationInMinutes/60]
        //                }  
        //     }
        // })

        const teamMembers = users.filter(user => {
            return user.team_id == this.state.teamId
        })

        let allTeamEvents = []


        teamMembers.forEach(teamMember => {
            allTeamEvents = allTeamEvents.concat(teamMember.events)
        })

        const data = []

        allTeamEvents.forEach(event => {
            const isAfterStartDate = event.date >= this.state.startDate
            const isBeforeEndDate = event.date <= this.state.endDate
            console.log('IS AFTER DATE', isAfterStartDate)
            if(isAfterStartDate && isBeforeEndDate){
                if(!data.some(ev => ev.name == event.type)){
                    data.push({
                        name: event.type,
                        hours: event.durationInMinutes/60
                    })
                } else {
                    let existingEvent = data.find(ev => event.type)
                    existingEvent.hours += (event.durationInMinutes/60) 
                }
            }
            
        })
    
        console.log("DATA", data)
        
        let teamOptions = teams.map(team => {
            return <option key={team.id} value={team.id}>{team.name}</option>
        })
        
        return (
            <div>
                <Form>
                    <Row form>
                        <Col xs={4}>
                            <FormGroup row>
                                <Label>Select Team</Label>
                                <Input onChange={this.handleChange} name="teamId" type="select">
                                    <option value="0" selected disabled>Select Team</option>
                                    {teamOptions}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mr-4">
                            <FormGroup row>
                                <Label>Start Date</Label>
                                <Input onChange={this.handleChange} name="startDate" value={this.state.startDate} type="date"></Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup row>
                                <Label>End Date</Label>
                                <Input onChange={this.handleChange} name="endDate" value={this.state.endDate} type="date"></Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    
                </Form>
                Some Charts will go here
                {/* <BarChart width={400} height={400} data={data}>
                    <XAxis></XAxis>
                    <Bar></Bar>
                </BarChart> */}
                
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