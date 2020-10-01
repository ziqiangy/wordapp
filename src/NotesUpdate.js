import React from 'react';
import './NotesUpdate.css';
export default class NotesUpdate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            noteTitle: '',
            noteContent: '',
            // noteTitle: 'hi',
            // noteContent: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount(){
    //     this.setState({noteTitle:this.props.updateData.title});
    //     this.setState({noteContent:this.props.updateData.content});
    // }

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
        urlencoded.append("id", this.props.updateData.id);
        urlencoded.append("title", this.state.noteTitle);
        urlencoded.append("content", this.state.noteContent);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("http://localhost/myhomeapp/php/notes/updateNotes.php", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    render(){
        if(this.props.show){
            return(
            <div className="notes-update-board">
                    <div className="notes-update-header">
                    <p onClick={this.props.handler}>x</p>
                    </div>
                    <div className ="notes-update-card">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="noteTitle" className="col-sm-2 col-form-label">Title</label>
                                <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="noteTitle" 
                                    name="noteTitle" 
                                    defaultValue={this.state.noteTitle||this.props.updateData.title} 
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
                                    defaultValue={this.state.noteContent||this.props.updateData.content} 
                                    onChange={this.handleInputChange}
                                />
                                </div>
                            </div>
                            {/* <h1>{this.props.updateData.title}</h1> */}
                            <input type="submit" className="btn btn-outline-dark mb-2" value="Update" />
                        </form>
                    </div>
                </div>
        )
        } else {
            return(<div/>)
        }
    }
}