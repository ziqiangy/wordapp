import React from 'react';

import axios from 'axios';

import './WordList.css';
export default class WordList extends React.Component {
    
    state = {
        vocab : []
    }

    componentDidMount(){
        axios.get('http://localhost/word-app/php/vocab.php')
        .then(res => {
            const vocab = res.data[0];
            this.setState({ vocab: vocab });
        })
        
    }

    render(){
        return (
            <div className="board">
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