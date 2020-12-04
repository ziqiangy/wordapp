import React from 'react';
import './AppHeader.css';
export default class AppHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            headerWeather:{},
        }
        this.fetchCurrentWeather = this.fetchCurrentWeather.bind(this)
    }

    componentDidMount(){
        this.fetchCurrentWeather();    
    }
    fetchCurrentWeather(){
        var myHeaders = new Headers();
        myHeaders.append("x-rapidapi-host", "weatherbit-v1-mashape.p.rapidapi.com");
        myHeaders.append("x-rapidapi-key", "5f3329cca2msh78620cada34b33dp16d603jsn72ee5e90dcc9");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://weatherbit-v1-mashape.p.rapidapi.com/current?lang=en&lon=-111.658531&lat=40.233845", requestOptions)
        .then(response => response.json())
        .then(result => {
            // console.log(result)
            this.setState({headerWeather:result})
        })
        .catch(error => console.log('error', error));
    }
    render(){
        if(this.state.headerWeather.data){
            return(
                <div className="app-header-weather">
                    <div className="app-header-weather-fonts">
                        {this.state.headerWeather.data[0].city_name}, 
                        {this.state.headerWeather.data[0].state_code} | 
                        {this.state.headerWeather.data[0].temp}°C 
                        <img style={{height: "2em"}} src={"https://www.weatherbit.io/static/img/icons/"+this.state.headerWeather.data[0].weather.icon+".png"} alt="show_weather_icon" /> | 
                        {this.state.headerWeather.data[0].aqi}</div>
                </div>
            )
        }else{
            return(<div>waiting for data</div>)
        }
    }
}