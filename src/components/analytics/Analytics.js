import React, { Component } from 'react'
import { BarChart, Bar, XAxis, CartesianGrid, YAxis, Tooltip } from 'recharts'
import { connect } from 'react-redux'
import { saveAs } from 'file-saver'
import { json2csv } from 'json-2-csv'
import { Form, Row, Col, FormGroup, Label, Input, Button} from 'reactstrap'

class Analytics extends Component {

    state = {
        teamId: '',
        startDate: '',
        endDate: ''
    }

    handleDownload = (data, selectedTeam) => {
        console.log(selectedTeam)
        json2csv(data, (err, csv) => {
            var blob = new Blob([csv], { type: "text/plain;charset=utf-8" })
            saveAs(blob, `${selectedTeam && selectedTeam}_${this.state.startDate}-${this.state.endDate}.csv`)
        })
    }

    handleChange = e => {
        let { value, name } = e.target
        this.setState({ 
            [name]: value
        })
    }


    render(){
  
        const teams = this.props.teams
        const events = this.props.events
        const users = this.props.users

        const selectedTeam = this.props && this.props.teams && this.props.teams[0] && this.props.teams[0].name ? this.props.teams.filter(team => team.id == this.state.teamId)[0] : []

        const teamMembers = users.filter(user => {
            return user.team_id == this.state.teamId
        })

        let allTeamEvents = []

        teamMembers.forEach(teamMember => {
            events.forEach(event => {
                if(event.user_id == teamMember.id){
                    allTeamEvents.push(event)
                }
            })
        })

        const data = []

        allTeamEvents.forEach(event => {
            const isAfterStartDate = event.date >= this.state.startDate
            const isBeforeEndDate = event.date <= this.state.endDate
            if(isAfterStartDate && isBeforeEndDate){
                if(!data.find(ev => ev.name === event.type)){
                    data.push({
                        name: event.type,
                        Hours: Math.round(((event.durationInMinutes/60)*100))/100
                    })
                } else {
                    let existingEvent = data.find(ev => ev.name === event.type)
                    existingEvent.Hours += Math.round((event.durationInMinutes/60)*100)/100 
                }
            }
        })      
        
        let teamOptions = teams.map(team => {
            return <option key={team.id} value={team.id}>{team.name}</option>
        })
        
        
        return (
            <div className="mb-3 mt-5">
                <h3 className="mb-3">Analytics</h3>
                <Form>
                    <Row form >
                        <Col xs={4}>
                            <FormGroup row>
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
                <div className="mt-2">
                    
                    {this.state.endDate && this.state.startDate && this.state.teamId ? 
                    <div>
                        {/* {!data ? : } */}
                        <h4 className="mb-3">Hours per task for {selectedTeam && selectedTeam.name}</h4>
                        <BarChart width={700} height={400} data={data}>
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis dataKey="name"></XAxis>
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="Hours" fill="#255469"></Bar>
                        </BarChart> 
                        <Button onClick={() => this.handleDownload(data, selectedTeam.name)}>Download CSV</Button>
                    </div> 
                    : 
                    <h4>Please select a team and date range to view event data.</h4>
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