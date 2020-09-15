import React from 'react';

import axios from 'axios';

export default class WordList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            vocab : []
        }
    }
    

    componentDidMount(){
        axios.get('http://localhost/word-app/php/vocab.php')
        .then(res => {
            const vocab = res.data;
            this.setState({ vocab: vocab[0] });
        })
        
    }

    render(){
        return (
            <div>
                <h2>{this.state.vocab.vocab}</h2>
                <span>{this.state.vocab.part_of_speech}</span>
                <span>{this.state.vocab.translation1}</span>;
                <span>{this.state.vocab.translation2}</span>;
                <span>{this.state.vocab.translation3}</span>
                
            </div>
        )
    }
}