import React, { Component } from 'react'
import { BarChart, Bar, XAxis, CartesianGrid, YAxis, Tooltip, Legend } from 'recharts'
import { connect } from 'react-redux'
import { CSVLink } from 'react-csv'
import { Form, Row, Col, FormGroup, Label, Input, Button} from 'reactstrap'

class Analytics extends Component {

    state = {
        teamId: '',
        startDate: '',
        endDate: ''
    }

    handleChange = e => {
        let { value, name } = e.target
        this.setState({ 
            [name]: value
        })
    }

    // declare a createData function and keep data variable in state?? - need an adult

    render(){
  
        const teams = this.props.teams
        const events = this.props.events
        const users = this.props.users

        const selectedTeam = this.props && this.props.teams && this.props.teams[0] && this.props.teams[0].name ? this.props.teams.filter(team => team.id == this.state.teamId)[0] : []
        console.log("SELECTED TEAM NAME", selectedTeam)

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
            if(isAfterStartDate && isBeforeEndDate){
                if(!data.some(ev => ev.name == event.type)){
                    data.push({
                        name: event.type,
                        Hours: Math.round(((event.durationInMinutes/60)*100))/100
                    })
                } else {
                    let existingEvent = data.find(ev => event.type)
                    existingEvent.Hours += Math.round((event.durationInMinutes/60)*100)/100 
                }
            }
            
        })
    
        const headers = [
            { label: "Task Type", key: "name" },
            { label: "Hours", key: "Hours" }
        ]
        
        let teamOptions = teams.map(team => {
            return <option key={team.id} value={team.id}>{team.name}</option>
        })
        
        return (
            <div>
                <Form>
                    <Row form>
                        <Col xs={4}>
                            <FormGroup row>
                                <Label></Label>
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
                <div className="mt-4">
                    
                    
                    {this.state.endDate && this.state.startDate && this.state.teamId ? 
                    <div>
                        <p>Hours per task for {selectedTeam && selectedTeam.name}</p>
                        <BarChart width={700} height={400} data={data}>
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name"></XAxis>
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Hours" fill="#255469"></Bar>
                        </BarChart> 
                        <CSVLink filename={`${selectedTeam && selectedTeam.name}_${this.state.startDate}-${this.state.endDate}.csv`} data={data} headers={headers}>
                            Download CSV
                        </CSVLink>
                    </div>
                    
                    : 
                    <p>Please select a team and date range</p>
                    }
                </div>
                
                
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