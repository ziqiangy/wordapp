import React from 'react';
import Notes from './Notes';
import NotesUpdate from './NotesUpdate';
import './NotesList.css'
export default class NotesList extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
            // header: ['Title', 'Content', 'Insert Date'],
            header: ['Title', 'Insert Date'],
            // index: ['title','content','insert_date'],
            index: ['title', 'insert_date'],
            tableData: [],
            showAdd: false,
            showUpdate: false,
            updateData: []
        }
        this.openAdd = this.openAdd.bind(this);
        this.closeAdd = this.closeAdd.bind(this);
        this.openUpdate = this.openUpdate.bind(this);
        this.closeUpdate = this.closeUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    componentDidMount(){
        this.fetchData()
    }

    openAdd = () => {
        this.setState({showAdd:true});
    }

    closeAdd = () => {
        this.setState({showAdd:false});
    }

    openUpdate = () => {
        this.setState({showUpdate:true});
    }

    closeUpdate = () => {
        this.setState({showUpdate:false});
    }


    fetchData(){
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };
          
          fetch("http://localhost/myhomeapp/php/notes/NoteList.php", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                this.setState({tableData: result})
            })
            .catch(error => console.log('error', error));
    }

    fetchOneRowData(id){
        this.openUpdate();
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

        fetch("http://localhost/myhomeapp/php/notes/searchNotes.php", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            this.setState({updateData:result},()=>{console.log(this.state.updateData)});
            this.setState({updateData:result});

        })
        .catch(error => console.log('error', error));
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
                        <span onClick={()=>this.openAdd()}>Add</span>
                        {/* <span onClick={()=>this.openUpdate()}>Update</span> */}
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
                                    <td key={i.toString()}>
                                    <span onClick={()=>this.handleDelete(row['id'])}>Delete</span>
                                    <span onClick={()=>this.fetchOneRowData(row['id'])}>Edit</span>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    </div>
                </div>
                <Notes show = {this.state.showAdd} handler = {this.closeAdd} />
                <NotesUpdate show = {this.state.showUpdate} handler = {this.closeUpdate} updateData = {this.state.updateData} />
            </div>
        )
    }
}