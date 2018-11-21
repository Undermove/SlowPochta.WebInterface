import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/Delete';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import * as Rest from '../../restclient';
import TablePaginationWrapped from '../../commonComponents/tablePagination';
import { NavLink } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

class SentMessages extends Component{
    constructor(props){
        super(props);
        this.state = {sentMessages: [],page:0, rowsPerPage: 10, loading: true, protocolCatalogs:[]};
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

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render(){
        const rows= this.state.protocolCatalogs;
        const {page,rowsPerPage } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
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
                    {this.state.protocolCatalogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                        return (
                        <TableRow style = {{maxHeight:5}} key={row.id}>
                            <TableCell style = {{ maxWidth:300, overflow: 'hidden'}}> {this.sliceString(row.messageText)}</TableCell>    
                            <TableCell style = {{maxWidth:200, overflow: 'hidden'}}>{row.creationDate}</TableCell>                      
                            <TableCell style = {{ maxWidth:200, overflow: 'hidden'}}>{row.statusDescription}</TableCell>                      
                            <TableCell  style = {{ textAlign:'right'}}>
                                <Button component = {NavLink} to={"/sentMessage/"+row.id}>
                                    <Icon>edit_icon</Icon>
                                </Button>
                                <IconButton onClick={() => this.handleDelete(row.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        );
                    })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter style={{padding:200}}>
                    <TableRow>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 20, 100]}
                        colSpan={4}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
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