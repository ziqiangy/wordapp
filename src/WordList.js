import React from 'react';

import axios from 'axios';

import './WordList.css';
export default class WordList extends React.Component {
    
    state = {
        vocab : [],
        count : 0
    }

    componentDidMount(){
        this.fetchNextWord()
    }

    handleClick(){
        this.fetchNextWord()
    }

    fetchNextWord(){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("offset", this.state.count);

        let options = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        }

        fetch("http://localhost/word-app/php/vocab.php", options)
            .then(response => response.json())
            .then(result => {
                const vocab = result[0];
            this.setState({ vocab: vocab });
            })
            .catch(error => console.log('error', error));

            this.setState({count: this.state.count+1});
    }

    render(){
        return (
            <div className="board">
                <div>
                    <span onClick={()=>this.handleClick()}>Next Page</span>
                </div>
                <div className ="word-card">
                   <div className="vocab">
                        <span>{this.state.vocab.vocab}</span>
                    </div>
                    <div className="translation">
                        <span>{this.state.vocab.part_of_speech}</span>
                        <span>{this.state.vocab.translation1}</span>;
                        <span>{this.state.vocab.translation2}</span>;
                        <span>{this.state.vocab.translation3}</span>
                    </div> 
                </div>
            </div>
        )
    }
}