import React from 'react';
import './Board.css';
import WordIcon from './icons/font-solid.svg';
import NoteIcon from './icons/sticky-note-regular.svg';
import WordList from './WordList';
import Note from './Note/Note';

export default class Board extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            wordOpen: true,
            noteOpen: true, 
            weather: [],
            weatherIcon: '',
        }
        this.HandleWordOpen = this.HandleWordOpen.bind(this);
        this.handleNoteOpen = this.handleNoteOpen.bind(this);
        this.getWeatherData = this.getWeatherData.bind(this);
    }


    componentDidMount(){
        this.getWeatherData();
    }
    getWeatherData(){
        var unirest = require("unirest");
        var req = unirest("GET", "https://weatherbit-v1-mashape.p.rapidapi.com/current");

        req.query({
            "lang": "en",
            "lon": "-111.658531",
            "lat": "40.233845"
        });

        req.headers({
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
            "x-rapidapi-key": "5f3329cca2msh78620cada34b33dp16d603jsn72ee5e90dcc9",
            "useQueryString": true
        });


        req.end( res => {
            if (res.error) throw new Error(res.error);

            console.log(res.body);
            console.log(res.body.data[0].weather.icon)
            this.setState({weather:res.body.data[0]});
            this.setState({weatherIcon:res.body.data[0].weather.icon})
        });
    }


    HandleWordOpen(){
        this.setState({wordOpen:!this.state.wordOpen});
    }
    handleNoteOpen(){
        this.setState({noteOpen:!this.state.noteOpen})
    }

    render(){
        // this line doesn't work, why?
        // {console.log(this.state.weather.weather.description)}
        return(
            <div className="app">
                <div className="app-header-weather">
        <div className="app-header-weather-fonts">{this.state.weather.city_name}, {this.state.weather.state_code} | {this.state.weather.temp}°C <img src={"https://www.weatherbit.io/static/img/icons/"+this.state.weatherIcon+".png"}/> | {this.state.weather.aqi}</div>
        

                </div>
                <div className="app-header">
                    <div><a onClick={this.HandleWordOpen} href="#"><img className="app-img" src={WordIcon} /></a></div>
                    <div><a onClick={this.handleNoteOpen} href="#"><img className="app-img" src={NoteIcon} /></a></div>
                </div>
                <div className="app-board">
                    {this.state.wordOpen? <WordList />:<div/>}
                    {this.state.noteOpen? <Note />:<div/>}
                </div>
            </div>
        )
        
    }
}
