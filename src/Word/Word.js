import React from 'react';
import WordAdd from './WordAdd';
import WordDashboard from './WordDashboard';
import WordEdit from './WordEdit';
import WordList from './WordList';
import addIcon from '../icons/plus-circle-solid.svg';
import dashboardIcon from '../icons/chalkboard-solid.svg';
import listIcon from '../icons/list-alt-regular.svg';
export default class Word extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openWordAdd:false,
            openWordDashboard:true,
            openWordEdit:false,
            openWordList:false,
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
          
          fetch("http://peteryuanmac/myhomeapp/php/words/listWords.php", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                this.setState({words:result})
            })
            .catch(error => console.log('error', error));
    }

    render(){
        return(
            <div className="board-wedget">
                <div className="board-wedget-header">
                    <span onClick={(e)=>this.handleOpen('openWordAdd',e)}><img className = "icon-button ml-5" src={addIcon} alt="addIcon"/></span>
                    <span onClick={(e)=>this.handleOpen('openWordDashboard',e)}><img className = "icon-button ml-5" src={dashboardIcon} alt="dashboardIcon"/></span>
                    <span onClick={(e)=>this.handleOpen('openWordList',e)}><img className = "icon-button ml-5" src={listIcon} alt="listIcon"/></span>
                </div>
                <div className ="board-wedget-body">
                    {this.state.openWordAdd && <WordAdd />}
                    {this.state.openWordDashboard && <WordDashboard />}
                    {this.state.openWordEdit && <WordEdit editId={this.state.editId} handleOpen = {this.handleOpen} fetchData = {this.fetchData} />}
                    {this.state.openWordList && <WordList getEditId = {this.getEditId} words = {this.state.words} fetchData = {this.fetchData} />}
                </div>
            </div>
            
        )
    }
}