import React from 'react';
import NoteEdit from './NoteEdit';
export default class NoteList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            // header: ['Title', 'Content', 'Insert Date'],
            header: ['Title', 'Insert Date'],
            // index: ['title','content','insert_date'],
            index: ['title', 'insert_date'],
            tableData: [],
            showEdit: false,
            editData: []
            
        }

        this.fetchData = this.fetchData.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData = () => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };
          
          fetch("http://localhost/myhomeapp/php/notes/NoteList.php", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({tableData:result})
                // this.setState({tableData: result}, ()=>{console.log(this.state.tableData)})
            })
            .catch(error => console.log('error', error));
    }

    openEdit = () => {
        this.setState({showEdit:true});
    }

    closeEdit = () => {
        this.setState({showEdit:false});
    }

    handleEdit = (id) => {
        this.openEdit();
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
            this.setState({editData:result},()=>(console.log(this.state.editData)));

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
        if(this.state.showEdit){
            return(<NoteEdit handler = {this.closeEdit} editData = {this.state.editData} />)
        }else{
            return(
                <div className="board">
                    <div className="board-header">
                        <span onClick={this.props.handleAdd}>Add</span>
                    </div>
                    <div className ="board-body">
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
                            // console.log(row.id);
                            return(
                                <tr key={i.toString()}>
                                    {this.state.index.map((item,i)=>{
                                        return(
                                            <td key={i.toString()}>{row[item]}</td>
                                        )
                                    })}
                                    <td key={i.toString()}>
                                    <span onClick={()=>this.handleDelete(row['id'])}>Delete</span>
                                    <span onClick={()=>this.handleEdit(row['id'])}>Edit</span>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    </div>
                </div>
            )
        }
    }
}