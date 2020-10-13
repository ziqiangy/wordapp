import React from 'react';
import WordAdd from './WordAdd';
import WordDashboard from './WordDashboard';
import WordEdit from './WordEdit';
import WordList from './WordList';
export default class Word extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openWordAdd:false,
            openWordDashboard:false,
            openWordEdit:false,
            openWordList:true,
            editId:'',
            words:[],
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.getEditId = this.getEditId.bind(this);   
        this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount(){
        this.fetchData()
    }
    handleOpen(data){
        this.setState({openWordAdd:false,openWordDashboard:false,openWordEdit:false,openWordList:false})
        this.setState({[data]:true})
    }
    getEditId (id) {
        this.setState({editId:id},(e)=>{this.handleOpen('openWordEdit',e)})
    }
    fetchData(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost/myhomeapp/php/words/listWords.php", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                this.setState({words:result})
            })
            .catch(error => console.log('error', error));
    }

    render(){
        return(
            <div>
                <button onClick={(e)=>this.handleOpen('openWordAdd',e)}>+</button>
                <button onClick={(e)=>this.handleOpen('openWordDashboard',e)}>WordDashboard</button>
                {/* <button onClick={(e)=>this.handleOpen('openWordEdit',e)}>Edit</button> */}
                <button onClick={(e)=>this.handleOpen('openWordList',e)}>List</button>
                {this.state.openWordAdd && <WordAdd />}
                {this.state.openWordDashboard && <WordDashboard />}
                {this.state.openWordEdit && <WordEdit editId={this.state.editId} handleOpen = {this.handleOpen} fetchData = {this.fetchData} />}
                {this.state.openWordList && <WordList getEditId = {this.getEditId} words = {this.state.words} fetchData = {this.fetchData} />}
            </div>
            
        )
    }
}