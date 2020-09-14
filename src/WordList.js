import React from 'react';

import axios from 'axios';

export default class WordList extends React.Component {
    state = {
        persons: []
    }

    componentDidMount(){
        axios.get('http://localhost/word-app/php/vocab.php')
        .then(res => {
            const persons = res.data;
            this.setState({ persons });
        })
    }

    render(){
        return (
            <ul>
                { this.state.persons.map(person => <li>{person.vocab}</li>)}
            </ul>
        )
    }
}