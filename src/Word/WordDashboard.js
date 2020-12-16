import React from 'react';
import './WordDashboard.css';
import leftArrow from '../icons/arrow-circle-left-solid.svg';
import rightArrow from '../icons/arrow-circle-right-solid.svg';
import openedEye from '../icons/eye-regular.svg';
import closedEye from '../icons/eye-slash-regular.svg';
import externalLink from '../icons/external-link-alt-solid.svg';
// import crawlerPaw from '../icons/paw-solid.svg';

export default class WordDashboard extends React.Component {
    constructor(props){
        super(props)
        this.fetchLast = this.fetchLast.bind(this)
        this.fetchNext = this.fetchNext.bind(this)
        this.showHide = this.showHide.bind(this)
        // this.fetchWord = this.fetchWord.bind(this)
        this.crawlerVocab = this.crawlerVocab.bind(this)
        this.state = {
                count : 0,
                show : false,
                VocabCraw : [],
        }
    }
    componentDidMount(){
        this.props.fetchData();
        // console.log(this.props.words[this.state.count])

    }
    fetchNext(){
        this.setState({show: false})
        this.setState({VocabCraw: []})
        // this.setState({count: this.state.count+1},()=>{this.fetchWord(this.state.count)})
        this.setState({count: this.state.count+1})
        //Always remember that setState won't execute immediately. If you want Popup.show() after setState, you can use a callback
        // this.fetchWord(this.state.count+1)
    }
    fetchLast(){
        this.setState({show: false})
        this.setState({VocabCraw: []})
        // this.setState({count: this.state.count-1},()=>{this.fetchWord(this.state.count)})
        this.setState({count: this.state.count-1})
        // this.fetchWord(this.state.count-1)
    }
    showHide(){
        this.setState({show:!this.state.show});
    }

    crawlerVocab(){
        
        var axios = require('axios');

        var config = {
          method: 'get',
          url: 'http://peteryuanmac:8081/crawler/'+this.props.words[this.state.count].vocab,
        };
        
        axios(config)
        .then(response => {
        //   console.log(response.data);
          this.setState({VocabCraw:response.data})
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render(){
        // console.log(this.props.words[this.state.count])
        if(this.props.words[this.state.count]){
            return(
            <div>
                <div className="word-header">
                    <div className="last-page-button" onClick={()=>this.fetchLast()}><img className = "icon-button" src={leftArrow} alt="go_back_arrow" /></div>
                    <div className="show-hide-button" onClick={()=>this.showHide()}>{this.state.show? <img className = "icon-button" src={closedEye} alt="close_hint_icon" /> : <img className = "icon-button" src={openedEye} alt="open_hint_icon" />}</div>
                    <div className="next-page-button" onClick={()=>this.fetchNext()}><img className = "icon-button" src={rightArrow} alt="move_forward_arrow" /></div>
                    <div className="vocab-link"><a href={"https://www.vocabulary.com/dictionary/"+this.props.words[this.state.count].word} rel="noopener"><img className = "icon-button" src={externalLink} alt="go_to_external_link" /></a></div>
                    {/* <div className="crawler-paw-button" onClick={()=>this.crawlerVocab()}><img className = "icon-button" src={crawlerPaw} alt="crawlerPaw" /></div> */}
                </div>
                <div className="word-card-father">
                    <div className ="word-card">
                        <div className="vocab">
                            <span>{this.props.words[this.state.count].word}</span>
                        </div>
                        <Translation word={this.props.words[this.state.count]} show={this.state.show} />
                    </div>
                </div>    
                <div className="word-card-footer" >
                        <p>{this.state.VocabCraw.desc}</p>
                        <p>{this.state.VocabCraw.trans}</p>
                        
                </div>
            </div>
        )
        }return(<div><span>Out of Boundary</span></div>)
        
    }

}

class Translation extends React.Component{
    render(){
        if(this.props.show){
            return(
            <div className="translation">
                <span>{this.props.word.trans}</span>
            </div> 
            )
        }else{
            return(<div/>)
        }
        
    }
}