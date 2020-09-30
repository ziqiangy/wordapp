import React from 'react';
import Notes from './Notes';
import './NotesList.css'
export default class NotesList extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
            header: ['Title', 'Content', 'Insert Date'],
            index: ['title','content','insert_date'],
            tableData: [],
            show: false
        }
    }


    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };
          
          fetch("http://localhost/myhomeapp/php/notes/NoteList.php", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({tableData: result})
            })
            .catch(error => console.log('error', error));
    }


    click = () => {
        this.setState({show:true});

    }

    render(){
        return(
            <div>
                <div className="notes-list-board">
                    <div className="notes-list-header">
                        <h3 onClick={()=>this.click()}>+</h3>
                    </div>
                    <div className ="notes-list-card">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            {this.state.header.map((ans,i)=>
                                <th scope="col" key={i.toString()}>{ans}</th>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.tableData.map((row,i)=>{
                            // console.log(row.Name);
                            return(
                                <tr key={i.toString()}>
                                    {this.state.index.map((item,i)=>{
                                        return(
                                            <td key={i.toString()}>{row[item]}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    </div>
                </div>
                <Notes show={this.state.show} />
            </div>
        )
    }
}