import React from 'react';
export default class WordAdd extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            wordTitle:'',
            wordTranslation:'',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleSubmit(e){
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        // myHeaders.append('Access-Control-Allow-Origin', '*');

        var urlencoded = new URLSearchParams();
        urlencoded.append("word", this.state.wordTitle);
        urlencoded.append("translation", this.state.wordTranslation);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow',
        // mode: 'no-cors'
        };

        fetch("http://peteryuanmac/myhomeapp/php/words/addWords.php", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


    }
    handleInputChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input 
                type='text' 
                name='wordTitle' 
                value={this.state.wordTitle}
                onChange={this.handleInputChange} 
                />
                <input 
                type='text' 
                name='wordTranslation' 
                value={this.state.wordTranslation}
                onChange={this.handleInputChange} 
                />
                <input 
                type='submit' 
                value='add' 
                />        
            </form>
        )
    }

}