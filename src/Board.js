import React from 'react';
import './Board.css';
import WordIcon from './icons/font-solid.svg';
import NoteIcon from './icons/sticky-note-regular.svg';
import WeatherIcon from './icons/cloud-solid.svg';
import Note from './Note/Note';
import Word from './Word/Word';
import PublicAPIGroup from './PublicAPI/PublicAPIGroup';

export default class Board extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            wordOpen: true,
            noteOpen: true, 
            weatherOpen: true,
        }
        this.HandleWordOpen = this.HandleWordOpen.bind(this);
        this.handleNoteOpen = this.handleNoteOpen.bind(this);
        this.handlePublicAPIOpen = this.handlePublicAPIOpen.bind(this);

    }

    HandleWordOpen(){
        this.setState({wordOpen:!this.state.wordOpen});
    }
    handleNoteOpen(){
        this.setState({noteOpen:!this.state.noteOpen})
    }
    handlePublicAPIOpen(){
        this.setState({weatherOpen:!this.state.weatherOpen})
    }

    render(){
        return(
            <div className="board">               
                <div className="board-header">
                    <div><img onClick={this.HandleWordOpen} className="board-header-img-icon" src={WordIcon} alt="show_or_hide_wordlist" /></div>
                    <div><img onClick={this.handleNoteOpen} className="board-header-img-icon" src={NoteIcon} alt="show_or_hide_note" /></div>
                    <div><img onClick={this.handlePublicAPIOpen} className="board-header-img-icon" src={WeatherIcon} alt="show_or_hide_weather_or_PublicAPI" /></div>
                </div>
                <div className="board-body">
                    {this.state.wordOpen? <Word serverData={this.props.serverData} />:<div/>}
                    {this.state.noteOpen? <Note serverData={this.props.serverData} />:<div/>}
                    {this.state.weatherOpen? <PublicAPIGroup />:<div/>}
                </div>
            </div>
        )
        
    }
}
