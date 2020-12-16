import React from 'react';
export default class WordEdit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id: '',
            word: '',
            trans: '',
            user_id: '',
            source_id: ''

        }
        this.fetchWord = this.fetchWord.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        this.fetchWord(this.props.editId)
    }

    fetchWord(id){
        
        var requestOptions = {
          method: 'GET',
          
          redirect: 'follow'
        };
        
        fetch(this.props.serverData.localDjRest+"words/"+id, requestOptions)
          .then(response => response.json())
          .then(result => {
            //   console.log(result)
              this.setState({
                  id:result.id,
                  word:result.word,
                  trans:result.trans,
                  user_id: result.user_id,
                  source_id: result.source_id
                })
            })
          .catch(error => console.log('error', error));
    }

    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]:target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("id", this.state.id);
        urlencoded.append("word", this.state.word);
        urlencoded.append("trans", this.state.trans);
        urlencoded.append("user_id", this.state.user_id);
        urlencoded.append("source_id", this.state.source_id);

        
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow',
        };
        
        fetch(this.props.serverData.localDjRest+"words/"+this.state.id+"/", requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error))
          .then(()=>{
            this.props.fetchData();
            this.props.handleOpen('openWordList')
        });

          
          

    }

    handleDelete(id){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("id", id);
        
        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        fetch(this.props.serverData.localDjRest+"words/"+id+"/", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error))
          .then(()=>{
            this.props.fetchData();
            this.props.handleOpen('openWordList')
        });
          
    }

    render(){
        return(
          
              <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="word" className="col-sm-2 col-form-label">Word</label>
                    <div className="col-sm-10">
                    <input 
                    type='text' 
                    className="form-control"
                    id='word'
                    name='word' 
                    value={this.state.word}
                    onChange={this.handleInputChange} 
                    />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="trans" className="col-sm-2 col-form-label">Translation</label>
                    <div className="col-sm-10">
                    <input 
                    type='text' 
                    className="form-control"
                    id='trans'
                    name='trans' 
                    value={this.state.trans}
                    onChange={this.handleInputChange}
                    />
                    </div>
                </div>
                <input type="submit" className="btn btn-outline-dark mb-2" value="update" />
                <button type="button" className="btn btn-outline-dark mb-2 ml-2" onClick={(e)=>this.handleDelete(this.state.id,e)} >Delete</button>
            </form>
                
                
            
        )
    }
}