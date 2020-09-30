import React from 'react';
import Notes from './Notes';
import './NotesList.css'
export default class NotesList extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
            header: ['Title', 'Content', 'Insert Date'],
            index: ['title','content','insert_date'],
            tableData: [],
            show: false
        }
        this.clickX = this.clickX.bind(this);
        this.click = this.click.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };
          
          fetch("http://localhost/myhomeapp/php/notes/NoteList.php", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({tableData: result})
            })
            .catch(error => console.log('error', error));
    }


    click = () => {
        this.setState({show:true});
    }

    clickX = () => {
        this.setState({show:false});
    }

    handleDelete = (id) => {
        // alert(id);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("id", id);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("http://localhost/myhomeapp/php/notes/deleteNotes.php", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    render(){
        return(
            <div>
                <div className="notes-list-board">
                    <div className="notes-list-header">
                        <span onClick={()=>this.click()}>+</span>
                        {/* <span onClick={()=>this.clickX()}>x</span> */}
                    </div>
                    <div className ="notes-list-card">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            {this.state.header.map((ans,i)=>
                                <th scope="col" key={i.toString()}>{ans}</th>
                            )}
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.tableData.map((row,i)=>{
                            // console.log(row.Name);
                            return(
                                <tr key={i.toString()}>
                                    {this.state.index.map((item,i)=>{
                                        return(
                                            <td key={i.toString()}>{row[item]}</td>
                                        )
                                    })}
                                    <td key={i.toString()} onClick={()=>this.handleDelete(row['id'])}>Delete</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    </div>
                </div>
                <Notes show = {this.state.show} handler = {this.clickX} />
            </div>
        )
    }
}