import React from "react";
import './PNRStylee.css'
import axios from 'axios';
class PNRComponents extends React.Component
{
    constructor(props)
    {
     super(props);
     this.state = {
        PNRNumber:"",
        PNRDetails:[],
        PassengerStatus:[],
        PassengerStatus:[],
        OnButtonClicked:false,
        ErrorMessage:"",
        IsErrorOccured:false
    }
    }
    handleChange=(event)=>{
        this.setState(
            {
                PNRNumber:event.target.value
            }
        )
    }
    handleSubmit=()=>
    { this.setState({
        PNRDetails:[],
        PassengerStatus:[],
        PassengerStatus:[],
        ErrorMessage:"",
        IsErrorOccured:false

    })
      const options=
      {
        method:'GET',
        url:'https://irctc1.p.rapidapi.com/api/v3/getPNRStatus',
        params:{pnrNumber:this.state.PNRNumber}
      }
      axios.request(options).then(response=> {
        console.log(response.data)
             this.setState({
                PNRDetails: response.data.data,
                PassengersStatus:response.data.data.PassengerStatus,
                OnButtonClicked:true
             })
        }).catch(error =>{
             this.setState(
                {
                    ErrorMessage:"PLEASE ENTER CORRECT PNR....", 
                    IsErrorOcuuured:true
                }
             )
        })

    }

    render()
    {
        return(
            <div className="app">
            <h2>this is keyur's Railway Website</h2>
            <h3>PLEASE ENTER YOUR PNR NUMBER</h3>
            <div>
            <input type="text" id="pnr" name="pnr" value={this.state.PNRNumber} onChange={this.handleChamge}/>
            <button type="submit" onclick={this.handleSubmit}>Search</button>
            </div>
             {this.state.IsErrorOccured ? <h5> {this.state.ErrorMessage}</h5>: this.state.OnButtonClicked &&<div>
            <div>
            <table className="table">
            <thead>
            <tr>
            <th>PNR Number</th>
            <th>Train Number</th>
            <th>Train Name</th>
            <th>Source Station</th>
            <th>Destination Station</th>
            <th>Date of journey</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>{this.state.PNRDetails.pnr}</td> 
            <td>{this.state.PNRDetails.TrainNo}</td>
            <td>{this.state.PNRDetails.TrainName}</td>
            <td>{this.state.PNRDetails.BoardingStationName}</td>
            <td>{this.state.PNRDetails.ReservationUptoName}</td>
            <td>{this.state.PNRDetails.SourceDoj}</td>
            
            </tr>
            </tbody>
            </table>
            </div>
            <div>
            <table className="table">
            <thead>
            <tr>
            <th>Person No</th>
            <th>Coach</th>
            <th>Berth</th>
            <th>Booking Status</th>
            <th>Current Status</th>
            <th>Percentage Prediction</th>
            </tr>
            </thead>
            <tbody>
            {this.state.PassengersStatus.map((passenger,index)=>
            <tr key={index}>
            <td>{passenger.Number}</td> 
            <td>{passenger.Coach}</td>
            <td>{passenger.Berth}</td>
            <td>{passenger.BookingStatus}</td>
            <td>{passenger.CurrentStatus}</td>
            <td>{passenger.PredictionPercentage}</td>
            
            </tr>)}
            </tbody>
            </table>
            </div>
        </div>}
            </div>
        )
    }
}
export default PNRComponents