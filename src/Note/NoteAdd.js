import React from 'react';
import goBackIcon from '../icons/arrow-circle-left-solid.svg';
export default class NoteAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            noteTitle: '',
            noteContent: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }


    handleSubmit(event) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", this.state.noteTitle);
        urlencoded.append("content", this.state.noteContent);
        urlencoded.append("user_id", "1");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch(this.props.serverData.localDjRest+"notes/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
        .then(()=>{
            this.props.handler();
            this.props.fetchData();
        });

        

    }
    render(){
        return(
            <div className="board-wedget">
                <div className="board-wedget-header">
                <img onClick={this.props.handler} className = "icon-button" src={goBackIcon} alt="Note_Go_Back_Icon"/>
                </div>
                <div className ="board-wedget-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="noteTitle" className="col-sm-2 col-form-label">Title</label>
                            <div className="col-sm-10">
                            <input type="text" className="form-control" id="noteTitle" name="noteTitle" value={this.state.noteTitle} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="noteContent" className="col-sm-2 col-form-label">Content</label>
                            <div className="col-sm-10">
                            <textarea rows="5" className="form-control" id="noteContent" name="noteContent" value={this.state.noteContent} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <input type="submit" className="btn btn-outline-dark mb-2" value="Add" />
                        
                    </form>
                </div>
            </div>
        )
    }
}