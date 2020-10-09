import React from 'react';
import NoteEdit from './NoteEdit';
import addIcon from '../icons/plus-circle-solid.svg';
import editIcon from '../icons/edit-solid.svg';
import deleteIcon from '../icons/trash-alt-solid.svg';
export default class NoteList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            // header: ['Title', 'Content', 'Insert Date'],
            header: ['Title', 'Insert Date'],
            // index: ['title','content','insert_date'],
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
                        <div onClick={this.props.handleAdd}><a href="#"><img src={addIcon}/></a></div>
                        {/* <span onClick={this.props.handleAdd}>Add</span> */}
                    </div>
                    <div className ="board-wedget-body">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            {this.state.header.map((ans,i)=>
                                <th scope="col" key={i.toString()}>{ans}</th>
                            )}
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.tableData.map((row,i)=>{
                            // console.log(row.id);
                            return(
                                <tr key={i.toString()}>
                                    {this.state.index.map((item,i)=>{
                                        return(
                                            <td key={i.toString()}>{row[item]}</td>
                                        )
                                    })}
                                    <td key={i.toString()}>
                                        <span onClick={()=>this.getEditId(row['id'])}><a href="#"><img src={editIcon}/></a></span>
                                        {/* <span onClick={()=>this.handleDelete(row['id'])}><a href="#"><img src={deleteIcon}/></a></span> */}
                                    </td>
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