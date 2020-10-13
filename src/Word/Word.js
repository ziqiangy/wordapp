import React from 'react';
import WordAdd from './WordAdd';
import WordDashboard from './WordDashboard';
import WordEdit from './WordEdit';
import WordList from './WordList';
export default class Word extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openWordAdd:true,
            openWordDashboard:false,
            openWordEdit:false,
            openWordList:false,
            editId:'',
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.getEditId = this.getEditId.bind(this);   
    }
    handleOpen(data){
        this.setState({openWordAdd:false,openWordDashboard:false,openWordEdit:false,openWordList:false})
        this.setState({[data]:true})
    }
    getEditId (id) {
        this.setState({editId:id})
    }

    render(){
        return(
            <div>
                <button onClick={(e)=>this.handleOpen('openWordAdd',e)}>+</button>
                <button onClick={(e)=>this.handleOpen('openWordDashboard',e)}>WordDashboard</button>
                <button onClick={(e)=>this.handleOpen('openWordEdit',e)}>Edit</button>
                <button onClick={(e)=>this.handleOpen('openWordList',e)}>List</button>
                {this.state.openWordAdd && <WordAdd />}
                {this.state.openWordDashboard && <WordDashboard />}
                {this.state.openWordEdit && <WordEdit editId={this.state.editId}/>}
                {this.state.openWordList && <WordList getEditId = {this.getEditId} />}
            </div>
            
        )
    }
}