import React from 'react';
import './WordList.css';
export default class WordList extends React.Component {
    
    state = {
        vocab : [],
        count : 0,
        show : false
    }

    componentDidMount(){
        this.fetchNextWord()
    }

    next(){
        this.fetchNextWord()
    }
    
    switch(){
        this.setState({show:!this.state.show});
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

        fetch("http://ubuntugui-imac/word-app/php/vocab.php", options)
            .then(response => response.json())
            .then(result => {
                const vocab = result[0];
            this.setState({ vocab: vocab });
            })
            .catch(error => console.log('error', error));

            this.setState({count: this.state.count+1});
            this.setState({show: false});
    }

    render(){
        return (
            <div className="board">
                <div>
                    <span onClick={()=>this.next()}>Next Page</span>
                    <span onClick={()=>this.switch()}>{this.state.show? 'hide' : 'show'}</span>
                </div>
                <div className ="word-card">
                    <div className="vocab">
                        <span>{this.state.vocab.vocab}</span>
                    </div>
                    <Translation vocab={this.state.vocab} show={this.state.show} />
                </div>
            </div>
        )  
    }
}

class Translation extends React.Component{
    render(){
        if(this.props.show){
            return(
            <div className="translation">
                <span>{this.props.vocab.part_of_speech}</span>
                <span>{this.props.vocab.translation1}</span>;
                <span>{this.props.vocab.translation2}</span>;
                <span>{this.props.vocab.translation3}</span>
            </div> 
            )
        }else{
            return(<div/>)
        }
        
    }
}