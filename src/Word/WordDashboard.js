import React from 'react';
import leftArrow from '../icons/arrow-circle-left-solid.svg';
import rightArrow from '../icons/arrow-circle-right-solid.svg';
import openedEye from '../icons/eye-regular.svg';
import closedEye from '../icons/eye-slash-regular.svg';
import externalLink from '../icons/external-link-alt-solid.svg';

export default class WordDashboard extends React.Component {
    constructor(props){
        super(props)
        this.fetchLast = this.fetchLast.bind(this)
        this.fetchNext = this.fetchNext.bind(this)
        this.showHide = this.showHide.bind(this)
        this.fetchWord = this.fetchWord.bind(this)
        this.state = {
                vocab : [],
                count : 0,
                show : false
        }
    }
    componentDidMount(){
        this.fetchWord(0)
    }
    fetchNext(){
        this.setState({show: false})
        this.setState({count: this.state.count+1},()=>{this.fetchWord(this.state.count)})
        //Always remember that setState won't execute immediately. If you want Popup.show() after setState, you can use a callback
        // this.fetchWord(this.state.count+1)
    }
    fetchLast(){
        this.setState({show: false})
        this.setState({count: this.state.count-1},()=>{this.fetchWord(this.state.count)})
        // this.fetchWord(this.state.count-1)
    }
    showHide(){
        this.setState({show:!this.state.show});
    }
    fetchWord(offset){
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
            this.setState({ vocab: vocab });
        })
        .catch(error => console.log('error', error));
    }

    render(){
        return(
            <div>
                <div className="word-header">
                    <div className="last-page-button" onClick={()=>this.fetchLast()}><img className = "icon-button" src={leftArrow} alt="go_back_arrow" /></div>
                    <div className="show-hide-button" onClick={()=>this.showHide()}>{this.state.show? <img className = "icon-button" src={closedEye} alt="close_hint_icon" /> : <img className = "icon-button" src={openedEye} alt="open_hint_icon" />}</div>
                    <div className="next-page-button" onClick={()=>this.fetchNext()}><img className = "icon-button" src={rightArrow} alt="move_forward_arrow" /></div>
                    <div className="vocab-link"><a href={"https://www.vocabulary.com/dictionary/"+this.state.vocab.vocab} target="_blank" rel="noopener noreferrer"><img className = "icon-button" src={externalLink} alt="go_to_external_link" /></a></div>
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
                <span>{this.props.vocab.translation}</span>
            </div> 
            )
        }else{
            return(<div/>)
        }
        
    }
}