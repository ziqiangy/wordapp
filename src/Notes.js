import React from 'react';
import './Notes.css'
export default class Notes extends React.Component{

    render(){
        return(
            <div className="notes-board">
                
                <div className="notes-header">
                    
                </div>
                <div className ="notes-card">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="noteTitle" className="col-sm-2 col-form-label">Title</label>
                            <div className="col-sm-10">
                            <input type="text" className="form-control" id="noteTitle" value="" />
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
                        <button type="submit" className="btn btn-outline-dark mb-2">Save</button>
                    </form>
                </div>
            </div>
        )
    }
}