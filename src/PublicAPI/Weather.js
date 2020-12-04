import React from 'react';
import "./Weather.css"
export default class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state={
            weather:{},
        }
        this.catchWeatherData = this.catchWeatherData.bind(this)
    }

    componentDidMount(){
        this.catchWeatherData();
    }

    catchWeatherData(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=Provo,UT&country=US&key=a742cbfc706b4a9eb40fe417acc4543e", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                this.setState({weather:result})
            })
            .catch(error => console.log('error', error));
    }


    render(){
        // {console.log(this.state.weather)}
        
        if (this.state.weather.data) {
            return(
                <div className="weather-wedget" >
                    <table>
                        <thead>

                        </thead>
                        <tbody>
                            <tr>
                                {this.state.weather.data.map((row,index)=>(
                                    <td key={index}>
                                        <ul>
                                            <li>{row.valid_date}</li>
                                            <li>{row.high_temp}°C/{row.low_temp}°C</li>
                                            {/* <li>{row.temp}</li> */}
                                            <li><img src={"https://www.weatherbit.io/static/img/icons/"+row.weather.icon+".png"} alt="weather_icon" /></li>
                                            {/* <li>{row.weather.description}</li> */}
                                        </ul>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            )
        } else {
            return(
                <div>waiting for data</div>
            )
        }
        
    }
}


