import React from 'react';
import './Notes.css'
export default class Notes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            noteTitle: '',
            noteContent: '',
            noteDate: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({noteTitle: event.target.value});
    }

    handleSubmit(event) {
        alert('the note title is: ' + this.state.noteTitle);
        event.preventDefault();
    }
    render(){
        return(
            <div className="notes-board">
                
                <div className="notes-header">
                    
                </div>
                <div className ="notes-card">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="noteTitle" className="col-sm-2 col-form-label">Title</label>
                            <div className="col-sm-10">
                            <input type="text" className="form-control" id="noteTitle" value={this.state.noteTitle} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="noteContent" className="col-sm-2 col-form-label">Content</label>
                            <div className="col-sm-10">
                            <textarea rows="5" className="form-control" id="noteContent" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="noteDate" className="col-sm-2 col-form-label">Date</label>
                            <div className="col-sm-10">
                            <input type="text" className="form-control" id="noteDate" />
                            </div>
                        </div>
                        <input type="submit" className="btn btn-outline-dark mb-2" value="Save" />
                    </form>
                </div>
            </div>
        )
    }
}