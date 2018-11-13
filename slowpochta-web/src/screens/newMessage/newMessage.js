import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as Rest from '../../restclient';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class NewMessage extends Component{
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccessGet = this.onSuccessGet.bind(this);
        this.onSuccessSave = this.onSuccessSave.bind(this);
        this.handleVendorChange = this.handleVendorChange.bind(this);
        this.onError = this.onError.bind(this);

        if(this.props.match.params.id !== "new"){
            this.state = {newMessage: {}, loading: false};         
            //Rest.GetMethod(this.onSuccessGet, "newMessage?id="+this.props.match.params.id, true);
        }
        else{
            this.state = {newMessage: {}, loading: false};
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

        data["fromUser"] = sessionStorage.getItem('ttc.name');
        
        this.setState({loading: false});
        Rest.PostMethod(this.onSuccessSave, "api/message/", data, false, this.onError);
    }

    onError(data){
        this.setState({loading: false});
        this.props.onError(data);
    }

    onSuccessGet(data){
        this.setState({newMessage: data, loading: false, vendorId: data.vendorId});
    }

    onSuccessSave(data){
        //this.setState({loading: false});
        this.props.history.goBack();
    }

    handleVendorChange(id){
        this.setState({vendorId: id})
    }

    render(){        
        const view = this.state.loading ? (<div className='loader'><CircularProgress style={{color: '#f65d50'}} /></div>) : 
        (<div className="formWithMargin">
            <form onSubmit={this.onSubmit}>
                <h2>Новое сообщение</h2>
                <TextField
                    name = "toUser"
                    id="outlined-full-width"
                    label="Кому"
                    style={{
                        minWidth: 300,
                        width: "50%"
                    }}
                    placeholder="Местодержатель"
                    helperText="Введите никнейм того кому, хотите отправить сообщение!"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br/>
                <TextField
                    name = "messageText"
                    id="outlined-full-width"
                    label="Текст письма"
                    placeholder="Местодержатель"
                    style={{
                        minWidth: 300,
                        width: "50%"
                    }}
                    multiline
                    rows="24"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br/>
                <Button 
                    type='submit' 
                    variant="contained" 
                    color="primary"
                    style = {{
                        marginTop:20,
                        marginBottom:20
                    }}>
                    Положить в почтовый ящик
                </Button>
            </form>
        </div>)
        return(
            <div id="content">
            {view}
            </div>
        )
    }
}

export default withRouter(NewMessage);
