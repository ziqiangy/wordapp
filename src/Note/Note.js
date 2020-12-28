import React from 'react';
import NoteList from './NoteList'
import NoteAdd from './NoteAdd';
export default class Note extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            
            tableData: [],
            showAdd: false,
            
        }
        this.fetchData = this.fetchData.bind(this);
        this.openAdd = this.openAdd.bind(this);
        this.closeAdd = this.closeAdd.bind(this);
    }

    fetchData = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(this.props.serverData.localDjRest+"notes/", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)


                result.forEach(element=>{
                    var str = element.insert_date;
                    var res = str.split("T");
                    element.display_insert_date = res[0];
                    element.display_insert_time = res[1];
                })

                // console.log(result)
                this.setState({tableData:result})
                // this.setState({tableData: result}, ()=>{console.log(this.state.tableData)})
            })
            .catch(error => console.log('error', error));
    }

    openAdd = () => {
        this.setState({showAdd:true});
    }

    closeAdd = () => {
        this.setState({showAdd:false});
    }

    
    render(){
        if(this.state.showAdd){
            return(<NoteAdd handler = {this.closeAdd} fetchData = {this.fetchData} serverData={this.props.serverData} />);
        }else{
            return(<NoteList handleAdd={this.openAdd} fetchData ={this.fetchData} tableData={this.state.tableData} serverData={this.props.serverData} />);
        }

    }
}