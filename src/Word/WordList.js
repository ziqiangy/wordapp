import React from 'react';
import editIcon from '../icons/edit-solid.svg';
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
            return rows;
        })
        return(
            <div>
                <table className="table table-striped table-hover">
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
                <td onClick={(e)=>this.props.getEditId(word.id,e)} >
                    <button 
                    type="button" 
                    className="btn btn-link">
                        {word.vocab}
                        </button>
                </td>
                <td>{word.translation}</td>
                <td>
                <span onClick={(e)=>this.props.getEditId(word.id,e)} ><img className = "icon-button" src={editIcon} alt="edit_a_note"/></span>
                </td>
            </tr>
        )
    }
}