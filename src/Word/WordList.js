import React from 'react';
export default class WordList extends React.Component{
    componentDidMount(){
        this.props.fetchData();
    }
    render(){
        const rows = []
        this.props.words.map((word)=>{
            rows.push(
                <WordRow
                word={word}
                key={word.id}
                getEditId={this.props.getEditId}
                />
            )
        })
        return(
            <div>
                <table>
                    <thead>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

class WordRow extends React.Component{
    render(){
        const word = this.props.word;
        return(
            <tr>
                <td>{word.vocab}</td>
                <td>{word.translation}</td>
                <td>
                    <span onClick={(e)=>this.props.getEditId(word.id,e)} >Edit</span>
                </td>
            </tr>
        )
    }
}