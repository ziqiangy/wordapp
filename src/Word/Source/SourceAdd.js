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
        // myHeaders.append('Access-Control-Allow-Origin', '*');

        var urlencoded = new URLSearchParams();
        urlencoded.append("source", this.state.sourceName);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow',
        // mode: 'no-cors'
        };

        fetch("http://peteryuanmac/myhomeapp/php/vocab_source/addVocabSource.php", requestOptions)
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
                <form class="form-inline" onSubmit={this.handleSubmit} >
                    <div className="form-group mx-sm-3 mb-2">
                        <label for="sourceName" class="sr-only">Source</label>
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