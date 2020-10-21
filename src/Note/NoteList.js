import React from 'react';
import NoteEdit from './NoteEdit';
import addIcon from '../icons/plus-circle-solid.svg';
// import editIcon from '../icons/edit-solid.svg';
export default class NoteList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            index: ['title', 'insert_date'],
            showEdit: false,
            editId: ''
        }

        
        this.getEditId = this.getEditId.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
    }

    componentDidMount(){
        this.props.fetchData()
    }

    getEditId (id) {
        this.setState({editId:id},this.openEdit())
    }

    

    openEdit = () => {
        this.setState({showEdit:true});
    }

    closeEdit = () => {
        this.setState({showEdit:false});
    }

    

    render(){
        if(this.state.showEdit){
            return(<NoteEdit closeEdit = {this.closeEdit} editId = {this.state.editId} fetchData = {this.props.fetchData} />)
        }else{
            return(
                <div className="board-wedget">
                    <div className="board-wedget-header">
                        <img onClick={this.props.handleAdd} className = "icon-button" src={addIcon} alt="Add_a_note"/>
                    </div>
                    <div className ="board-wedget-body">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Insert Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.tableData.map((row,i)=>{
                            return(
                                <tr key={i.toString()}>      
                                    <td onClick={()=>this.getEditId(row['id'])} >
                                        <button 
                                        type="button"
                                        className="btn btn-link">
                                            {row.title}
                                            </button>
                                    </td>
                                    <td>{row.insert_date}</td>
                                    
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    </div>
                </div>
            )
        }
    }
}