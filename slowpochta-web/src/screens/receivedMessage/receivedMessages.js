import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import MailOutline from '@material-ui/icons/MailOutline';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Rest from '../../restclient';
import EnhancedTable from '../../commonComponents/enhancedTable/enhancedTable'
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

const columns = [
    { id: 'snederLogin', numeric: false, disablePadding: true, label: 'Отправитель' },
    { id: 'messageText', numeric: false, disablePadding: false, label: 'Текст сообщения' },
    { id: 'lastUpdateTime', numeric: true, disablePadding: false, label: 'Последнее обновление' },
    { id: 'button'},
  ];

const styles = theme => ({
    root: { maxWidth:100, overflow: 'hidden'}
});

class ReceivedMessage extends Component{
    constructor(props){
        super(props);
        this.state = {incomings: [], page:0, rowsPerPage: 10,  loading: true, protocolCatalogs:[]};
        this.onSuccess = this.onSuccess.bind(this);
    }

    componentDidMount(){
        this.page = 0;
        Rest.GetMethod(this.onSuccess, "api/message/getdeliveredmessages", true);
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

    renderBody = (isSelected, n, handleClick) => {
        const { classes } = this.props;
        var isReadStyle = 'normal';
        if(!n.isRead){
            isReadStyle = 'bold';
        }
        return <TableRow
            hover
            onClick={event => handleClick(event, n.id)}
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={-1}
            key={n.id}
            selected={isSelected}
            >
            <TableCell padding="checkbox">
                <Checkbox checked={isSelected} />
            </TableCell>
            <TableCell style = {{ fontWeight:isReadStyle }} component="th" scope="row" padding="none"> {n.senderLogin} </TableCell>
            <TableCell style = {{ fontWeight:isReadStyle }} align="right" className={classes.root}>{this.sliceString(n.messageText)}</TableCell>
            <TableCell style = {{ fontWeight:isReadStyle }} align="right" className={classes.root}>{n.lastUpdateTime}</TableCell>
            <TableCell style = {{ width:10, textAlign:'right'}}>
                <Button component = {NavLink} to={"/receivedMessage/"+n.id}>
                    <MailOutline />
                </Button>
            </TableCell>
        </TableRow>
    }

    render(){
        const rows= this.state.protocolCatalogs;
        const view = false ? (<div className='loader'><CircularProgress style={{color: '#f65d50'}} /></div>) :
        (<div>
            <EnhancedTable 
                columns = {columns} 
                renderBody = {this.renderBody} 
                data = {rows} 
                defaultOrder = {'lastUpdateTime'}
                header = {'Входящие сообщения'}>
            </EnhancedTable>
        </div>)
        return(
            <div>
            {view}
            </div>
          );
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(ReceivedMessage));