import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as Rest from '../../restclient';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MessageStatusCard from '../../commonComponents/messageStatusCard'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      width: '580px',
      'text-align':'Center',
    },
    gridList: {
        width: '610px',
    },
  });

class SentMessage extends Component{
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccessGet = this.onSuccessGet.bind(this);
        this.onSuccessSave = this.onSuccessSave.bind(this);
        this.handleVendorChange = this.handleVendorChange.bind(this);
        this.onError = this.onError.bind(this);

        if(this.props.match.params.id !== "new"){
            this.state = {sentMessage: {}, loading: false};         
            //Rest.GetMethod(this.onSuccessGet, "sentMessage?id="+this.props.match.params.id, true);
        }
        else{
            this.state = {sentMessage: {}, loading: false};
        }
    }

    onSubmit(e){
        e.preventDefault();

        const form = e.target;
        const data = {}
        for (let element of form.elements) {
          if (element.tagName === 'BUTTON') { continue; }
          data[element.name] = element.value;
        }
        data["vendorId"] = this.state.vendorId;
        
        this.setState({loading: true});
        if(this.props.match.params.id === "new"){
            //Rest.PostMethod(this.onSuccessSave, "api/message/sentMessage/", data, false, this.onError);
        }
        else{
            data["id"] = this.state.sentMessage.id;
            //Rest.PutMethod(this.onSuccessSave, "api/message/sentMessage/", data, false, this.onError);
        }
    }

    onError(data){
        this.setState({loading: false});
        this.props.onError(data);
    }

    onSuccessGet(data){
        this.setState({sentMessage: data, loading: false, vendorId: data.vendorId});
    }

    onSuccessSave(data){
        //this.setState({loading: false});
        this.props.history.goBack();
    }

    handleVendorChange(id){
        this.setState({vendorId: id})
    }

    render(){    
        const { classes } = this.props;    
        const view = this.state.loading ? (<div className='loader'><CircularProgress style={{color: '#f65d50'}} /></div>) : 
        (<div style ={{ display: 'inline-block'}}>
            <h2>Исходящее сообщение</h2>
            <div >
            <Paper style = {{textAlign:'left'}} className={classes.root} elevation={1}>
            <i style = {{color: 'gray'}}>От:</i> Вас
            </Paper>
            <br/>
            <Paper style = {{textAlign:'left'}} className={classes.root} elevation={1}>
            <i style = {{color: 'gray'}}>Кому:</i> Test
            </Paper>
            <br/>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    This is a sheet of paper.
                </Typography>
                <Typography component="p">
                <br/>
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                    Paper can be used to build surface or other elements for your application.
                </Typography>
            </Paper>
            </div>
            <br/>
            <GridList cellHeight={"auto"} className={classes.gridList} cols={2}>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
                    <MessageStatusCard></MessageStatusCard>
            </GridList>
        </div>)
        return(
            <div id="content">
            {view}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(SentMessage));
