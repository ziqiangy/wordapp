import React from 'react'
import './sourceAdd.css'
export default class SourceAdd extends React.Component{
    constructor(props){
        super(props)
        this.state={
            sourceName:''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleInputChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("source_from", this.state.sourceName);
        urlencoded.append("user_id", "1");


        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow',
        };

        fetch(this.props.serverData.localDjRest+"wordsources/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
        .then(()=>{
            this.props.handleCloseSelf();
            this.props.handleRefresh()
        });
    }
    render(){
        return(
            <div className='sourceAddInputForm'>
                <form className="form-inline" onSubmit={this.handleSubmit} >
                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="sourceName" className="sr-only">Source</label>
                        <input 
                        className='form-control'
                        type = "text"
                        name = "sourceName"
                        id = "sourceName"
                        value = {this.state.sourceName}
                        onChange = {this.handleInputChange}
                        />
                    </div>
                    
                    <input type="submit" className="btn btn-outline-dark mb-2" value="Add" />

                </form>
            </div>
        )
    }

}