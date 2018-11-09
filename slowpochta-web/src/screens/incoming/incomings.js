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

class Incomings extends Component{
    constructor(props){
        super(props);
        this.state = {incomings: [], loading: true, protocolCatalogs:[]};
        this.onSuccess = this.onSuccess.bind(this);
    }

    componentDidMount(){
        //Rest.GetMethod(this.onSuccess, "incoming", true);
    }

    onSuccess(data){
        this.setState({protocolCatalogs: data, loading: false});
    }

    render(){
        const view = false ? (<div className='loader'><CircularProgress style={{color: '#f65d50'}} /></div>) :
        (<div>
          

        {<Table>
            <TableHead>
                  <TableRow>
                    <TableCell>Наименование</TableCell>
                    <TableCell>Производитель</TableCell>
                    <TableCell>Версия прошивки</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.protocolCatalogs.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.modelName}
                        </TableCell>
                        <TableCell>{row.vendorName}</TableCell>    
                        <TableCell>{row.version}</TableCell>                      
                        <TableCell>
                            <IconButton component = {NavLink} to={"/incoming/"+row.id}>
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
                </Table>}
        </div>)
        return(
            <div>
            {view}
            </div>
          );
    }
}

export default withRouter(Incomings);