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
        }
        this.HandleWordOpen = this.HandleWordOpen.bind(this);
        this.handleNoteOpen = this.handleNoteOpen.bind(this);
    }


    HandleWordOpen(){
        this.setState({wordOpen:!this.state.wordOpen});
    }
    handleNoteOpen(){
        this.setState({noteOpen:!this.state.noteOpen})
    }

    render(){
        return(
            <div className="app">
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
