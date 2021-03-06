import React from 'react';
import goBackIcon from '../icons/arrow-circle-left-solid.svg';
export default class NoteEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            noteId: '',
            noteTitle: '',
            noteContent: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        this.handleEdit(this.props.editId);
    }

    handleEdit(id){

        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        // var urlencoded = new URLSearchParams();
        // urlencoded.append("id", id);

        var requestOptions = {
        method: 'GET',
        // headers: myHeaders,
        // body: urlencoded,
        redirect: 'follow'
        };

        fetch(this.props.serverData.localDjRest+"notes/"+id, requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                noteId: result.id,
                noteTitle: result.title,
                noteContent: result.content
            });
            // this.setState({editData:result});

        })
        .catch(error => console.log('error', error));
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", this.state.noteTitle);
        urlencoded.append("content", this.state.noteContent);
        urlencoded.append("user_id", "1");


        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch(this.props.serverData.localDjRest+"notes/"+this.state.noteId+"/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
        .then(()=>{
            this.props.fetchData();
            this.props.closeEdit();
        });
    }

    handleDelete(id){
        // alert(id);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("id", id);

        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch(this.props.serverData.localDjRest+"notes/"+id+"/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
        .then(()=>{
            this.props.fetchData();
            this.props.closeEdit();
        });
    }

    render(){
        return(
            <div className="board-wedget">
                <div className="board-wedget-header">
                    <img onClick={this.props.closeEdit} className = "icon-button" src={goBackIcon} alt="Note_edit_go_back_icon"/>
                </div>
                <div className ="board-wedget-body">
                    {/* <h1>id {this.state.editData.id}</h1> */}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="noteTitle" className="col-sm-2 col-form-label">Title</label>
                            <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="noteTitle" 
                                name="noteTitle" 
                                value={this.state.noteTitle} 
                                onChange={this.handleInputChange}
                            />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="noteContent" className="col-sm-2 col-form-label">Content</label>
                            <div className="col-sm-10">
                            <textarea 
                                rows="5" 
                                className="form-control" 
                                id="noteContent" 
                                name="noteContent" 
                                value={this.state.noteContent} 
                                onChange={this.handleInputChange}
                            />
                            </div>
                        </div>
                        <input type="submit" className="btn btn-outline-dark mb-2" value="Update" />
                        <button type="button" className="btn btn-outline-dark mb-2 ml-2" onClick={()=>this.handleDelete(this.state.noteId)}>Delete</button>
                    </form>

                </div>
            </div>
        )
    }
}