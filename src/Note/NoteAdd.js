import React from 'react';
export default class NoteAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            noteTitle: '',
            noteContent: '',
            noteDate: '',
            currentTime: new Date()
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
        urlencoded.append("date", this.state.noteDate);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch("http://localhost/myhomeapp/php/notes/addNotes.php", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }
    render(){
        return(
            <div className="board">
                <div className="board-header">
                <p onClick={this.props.handler}>{"<-"}</p>
                </div>
                <div className ="board-body">
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