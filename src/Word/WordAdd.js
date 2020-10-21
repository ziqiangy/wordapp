import React from 'react';
import SourceAdd from './Source/SourceAdd';
import addIcon from '../icons/plus-circle-solid.svg';
import minusIcon from '../icons/minus-circle-solid.svg';
export default class WordAdd extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            wordTitle:'',
            wordTranslation:'',
            wordSource:'0',
            vocabSource:[],
            openSourceAdd: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.fetchVocabSource = this.fetchVocabSource.bind(this)
        this.toggleSourceAddWindow = this.toggleSourceAddWindow.bind(this)
    }

    componentDidMount(){
        this.fetchVocabSource()
    }

    toggleSourceAddWindow(){
        this.setState({openSourceAdd:!this.state.openSourceAdd})
    }

    handleSubmit(e){
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        // myHeaders.append('Access-Control-Allow-Origin', '*');

        var urlencoded = new URLSearchParams();
        urlencoded.append("word", this.state.wordTitle);
        urlencoded.append("translation", this.state.wordTranslation);
        urlencoded.append("source", this.state.wordSource);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow',
        // mode: 'no-cors'
        };

        fetch("http://peteryuanmac/myhomeapp/php/words/addWords.php", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
        .then(()=>{
            this.setState({
                wordTitle:'',
                wordTranslation:'',
                wordSource:'0',
            })
        });


    }
    handleInputChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    fetchVocabSource(){
        fetch("http://peteryuanmac/myhomeapp/php/vocab_source/listVocabSource.php")
        .then(response=>response.json())
        .then(result=>{
            // console.log(result)
            this.setState({vocabSource:result})})
        .catch(error=>console.log('error',error))
    }

    render(){
        const sourceOptions = [];
        sourceOptions.push(<option key="0" value="0" ></option>)
        this.state.vocabSource.map(eachSource=>{
            sourceOptions.push(
                <option 
                key={eachSource.id}
                value={eachSource.id}
                >
                    {eachSource.source_from}
                </option>
            )
            return sourceOptions;
        })





        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="wordTitle" className="col-sm-2 col-form-label">Vocab</label>
                        <div className="col-sm-10">
                        <input 
                        type='text' 
                        className="form-control"
                        id='wordTitle'
                        name='wordTitle' 
                        value={this.state.wordTitle}
                        onChange={this.handleInputChange} 
                        />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="wordTranslation" className="col-sm-2 col-form-label">Translation</label>
                        <div className="col-sm-10">
                        <input 
                        type='text' 
                        className="form-control"
                        id='wordTranslation'
                        name='wordTranslation' 
                        value={this.state.wordTranslation}
                        onChange={this.handleInputChange} 
                        />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="wordTranslation" className="col-sm-2 col-form-label">
                            Source
                        </label>
                        <div className="col-sm-10">
                        <select
                        className="form-control"
                        id="wordSource"
                        name='wordSource'
                        value={this.state.wordSource}
                        onChange={this.handleInputChange} 
                        >
                            {sourceOptions}
                        </select>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-outline-dark mb-2" value="Add" />
                </form>
                <div>Add Source
                <img onClick={this.toggleSourceAddWindow} className = "icon-button ml-1" src={this.state.openSourceAdd? minusIcon : addIcon} alt="addIcon"/>
                </div>
                {this.state.openSourceAdd && <SourceAdd handleRefresh = {this.fetchVocabSource} handleCloseSelf = {this.toggleSourceAddWindow} />}
                
            </div>
            
        )
    }

}