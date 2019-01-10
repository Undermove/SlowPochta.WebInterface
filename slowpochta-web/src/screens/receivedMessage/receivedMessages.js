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
    { id: 'recieverLogin', numeric: false, disablePadding: true, label: 'Получатель' },
    { id: 'messageText', numeric: false, disablePadding: false, label: 'Текст сообщения' },
    { id: 'creationDate', numeric: false, disablePadding: false, label: 'Дата создания' },
    { id: 'lastStatusDescription', numeric: true, disablePadding: false, label: 'Статус' },
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
            <TableCell component="th" scope="row" padding="none">
                {n.recieverLogin}
            </TableCell>
            <TableCell align="right" className={classes.root}>{this.sliceString(n.messageText)}</TableCell>
            <TableCell align="right" className={classes.root}>{n.creationDate}</TableCell>
            <TableCell align="right" className={classes.root}>{n.lastStatusDescription}</TableCell>
            <TableCell align="right" className={classes.root}>{n.lastUpdateTime}</TableCell>
            <TableCell  style = {{ width:10, textAlign:'right'}}>
                <Button component = {NavLink} to={"/sentMessage/"+n.id}>
                    <MailOutline />
                </Button>
            </TableCell>
        </TableRow>
    }

    render(){
        const rows= this.state.protocolCatalogs;
        const {page,rowsPerPage } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        const view = false ? (<div className='loader'><CircularProgress style={{color: '#f65d50'}} /></div>) :
        // (<div>
          
        // <h2>Входящие сообщения</h2>
        // <Table>
        //     <TableHead>
        //           <TableRow>
        //             <TableCell>Отправитель</TableCell>
        //             <TableCell>Текст письма</TableCell>
        //             <TableCell>Время доставки</TableCell>
        //             <TableCell></TableCell>
        //           </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {this.state.protocolCatalogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        //                 var isReadStyle = 'normal';
        //                 if(!row.isRead){
        //                     isReadStyle = 'bold';
        //                 }
        //                 return (
        //                 <TableRow style = {{ maxHeight:5}} key={row.id}>
        //                     <TableCell style = {{ fontWeight:isReadStyle,maxWidth:300, overflow: 'hidden'}}> {this.sliceString(row.senderLogin)}</TableCell>    
        //                     <TableCell style = {{ fontWeight:isReadStyle,maxWidth:300, overflow: 'hidden'}}> {this.sliceString(row.messageText)}</TableCell>    
        //                     <TableCell style = {{ fontWeight:isReadStyle,maxWidth:200, overflow: 'hidden'}}> {row.lastUpdateTime}</TableCell>                    
        //                     <TableCell  style = {{ textAlign:'right'}}>
        //                         <Button component = {NavLink} to={"/receivedMessage/"+row.id}>
        //                             <MailOutline />
        //                         </Button>
        //                     </TableCell>
        //                 </TableRow>
        //                 );
        //             })}
        //             {emptyRows > 0 && (
        //                 <TableRow style={{ height: 48 * emptyRows }}>
        //                 <TableCell colSpan={6} />
        //                 </TableRow>
        //             )}
        //         </TableBody>
        //         <TableFooter style={{padding:200}}>
        //             <TableRow>
        //                 <TablePagination
        //                 rowsPerPageOptions={[5, 10, 20, 100]}
        //                 colSpan={4}
        //                 count={rows.length}
        //                 rowsPerPage={rowsPerPage}
        //                 page={page}
        //                 onChangePage={this.handleChangePage}
        //                 onChangeRowsPerPage={this.handleChangeRowsPerPage}
        //                 />
        //             </TableRow>
        //         </TableFooter>
        //         </Table>
        // </div>)
        (<div>
            <h2>Исходящие сообщения</h2>
            <EnhancedTable columns = {columns} renderBody = {this.renderBody} data = {rows}>
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