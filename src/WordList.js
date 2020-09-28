import React from 'react';
import './WordList.css';
import leftArrow from './icons/arrow-circle-left-solid.svg';
import rightArrow from './icons/arrow-circle-right-solid.svg';
import openedEye from './icons/eye-regular.svg';
import closedEye from './icons/eye-slash-regular.svg';
import externalLink from './icons/external-link-alt-solid.svg';
export default class WordList extends React.Component {
    constructor(props){
        super(props)
        this.last = this.last.bind(this)
        this.next = this.next.bind(this)
        this.switch = this.switch.bind(this)
        this.state = {
                vocab : [],
                count : 0,
                show : false
            }
    }
    
    componentDidMount(){
        this.fetchWord(0)
    }

    next = () => {
        this.setState({show: false})
        this.setState({count: this.state.count+1})
        this.fetchWord(this.state.count+1)
    }

    last = () => {
        this.setState({show: false})
        this.setState({count: this.state.count-1})
        this.fetchWord(this.state.count-1)
    }
    
    switch = () => {
        this.setState({show:!this.state.show});
    }

    fetchWord = (offset) => {
        
        // dir? this.setState({count: this.state.count+1}) : this.setState({count: this.state.count-1})
        // this.setState({show: false});
        

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("offset", offset);
        
        let options = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        }


        fetch("http://peteryuanmac/myhomeapp/php/vocab.php", options)
            .then(response => response.json())
            .then(result => {
                const vocab = result[0];
                // console.log(result[0]);
                // console.log(this.state.count)
                this.setState({ vocab: vocab });
                
            })
            .catch(error => console.log('error', error));
    }

    render(){
        return (
            <div className="word-board">
                
                <div className="word-header">
                    <div className="last-page-button" onClick={()=>this.last()}><img src={leftArrow} /></div>
                    <div className="show-hide-button" onClick={()=>this.switch()}>{this.state.show? <img src={closedEye} /> : <img src={openedEye} />}</div>
                    <div className="next-page-button" onClick={()=>this.next()}><img src={rightArrow} /></div>
                    <div className="vocab-link"><a href={"https://www.vocabulary.com/dictionary/"+this.state.vocab.vocab} target="_blank"><img src={externalLink} /></a></div>
                </div>
                <div className ="word-card">
                    <div className="vocab">
                        <span>{this.state.vocab.vocab}</span>
                    </div>
                    <Translation vocab={this.state.vocab} show={this.state.show} />
                    {/* <div><span>{this.state.count}</span></div> */}
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