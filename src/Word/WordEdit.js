import React from 'react';
// export default function WordEdit(){
//     return(<div>hello wordEdit</div>)
// }
export default class WordEdit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id: '',
            vocab: '',
            translation: '',

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
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("id", id);
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        fetch("http://localhost/myhomeapp/php/words/searchWords.php?=", requestOptions)
          .then(response => response.json())
          .then(result => {
            //   console.log(result)
              this.setState({
                  id:result.id,
                  vocab:result.vocab,
                  translation:result.translation
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
        urlencoded.append("vocab", this.state.vocab);
        urlencoded.append("translation", this.state.translation);
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        fetch("http://localhost/myhomeapp/php/words/updateWords.php", requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

    }

    handleDelete(id){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("id", id);
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        fetch("http://localhost/myhomeapp/php/words/deleteWords.php", requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit} >
                    <input 
                    type='text' 
                    name='vocab' 
                    value={this.state.vocab}
                    onChange={this.handleInputChange}
                    />
                    <input 
                    type='text' 
                    name='translation' 
                    value={this.state.translation}
                    onChange={this.handleInputChange}
                    />
                    <input 
                    type='submit' 
                    value='update' 
                    />        
                </form>
                <button onClick={(e)=>this.handleDelete(this.state.id,e)} >Delete</button>
            </div>
            
        )
    }
}