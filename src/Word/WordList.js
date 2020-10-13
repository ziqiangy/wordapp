import React from 'react';
export default class WordList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            words:[],
        }
        this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost/myhomeapp/php/words/listWords.php", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                this.setState({words:result})
            })
            .catch(error => console.log('error', error));
    }

    render(){
        const rows = []
        this.state.words.map((word)=>{
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