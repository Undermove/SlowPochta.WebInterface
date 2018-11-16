import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/Delete';
import * as Rest from '../../restclient';
import { NavLink } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

class SentMessages extends Component{
    constructor(props){
        super(props);
        this.state = {sentMessages: [], loading: true, protocolCatalogs:[]};
        this.onSuccess = this.onSuccess.bind(this);
    }

    componentDidMount(){
        Rest.GetMethod(this.onSuccess, "api/message/getsendedmessages", true);
    }

    onSuccess(data){
        this.setState({protocolCatalogs: data, loading: false});
    }

    sliceString(string){
        if(string.length > 100){
            return string.slice(0,100)+'...(читать далее)';
        }
        return string;
    }

    render(){
        const view = false ? (<div className='loader'><CircularProgress style={{color: '#f65d50'}} /></div>) :
        (<div>

        <h2>Исходящие сообщения</h2>
        <Table>
            <TableHead>
                  <TableRow>
                    <TableCell>Текст</TableCell>
                    <TableCell>Дата отправления</TableCell>
                    <TableCell>Статус доставки</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.protocolCatalogs.map(row => {
                    return (
                      <TableRow style = {{maxHeight:5}} key={row.id}>
                        <TableCell style = {{ maxWidth:300, overflow: 'hidden'}}> {this.sliceString(row.messageText)}</TableCell>    
                        <TableCell style = {{maxWidth:200, overflow: 'hidden'}}>{row.creationDate}</TableCell>                      
                        <TableCell style = {{maxWidth:200, overflow: 'hidden'}}>{row.statusDescription}</TableCell>                      
                        <TableCell>
                            <IconButton component = {NavLink} to={"/sentMessage/"+row.id}>
                                <Create />
                            </IconButton>
                            <IconButton onClick={() => this.handleDelete(row.id)}>
                                <Delete />
                            </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                </Table>
        </div>)
        return(
            <div>
            {view}
            </div>
          );
    }
}

export default withRouter(SentMessages);