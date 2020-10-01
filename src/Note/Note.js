import React from 'react';
import NoteList from './NoteList'
import NoteAdd from './NoteAdd';
import './Note.css'
export default class Note extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            showAdd: false,
            
        }
        this.openAdd = this.openAdd.bind(this);
        this.closeAdd = this.closeAdd.bind(this);
    }

    openAdd = () => {
        this.setState({showAdd:true});
    }

    closeAdd = () => {
        this.setState({showAdd:false});
    }

    
    render(){
        if(this.state.showAdd){
            return(<NoteAdd handler = {this.closeAdd} />);
        }else{
            return(<NoteList handleAdd={this.openAdd} />);
        }

    }
}