import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as Rest from '../../restclient';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class Incoming extends Component{
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccessGet = this.onSuccessGet.bind(this);
        this.onSuccessSave = this.onSuccessSave.bind(this);
        this.handleVendorChange = this.handleVendorChange.bind(this);
        this.onError = this.onError.bind(this);

        if(this.props.match.params.id !== "new"){
            this.state = {incoming: {}, loading: true};         
            Rest.GetMethod(this.onSuccessGet, "incoming?id="+this.props.match.params.id, true);
        }
        else{
            this.state = {incoming: {}, loading: false};
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
            Rest.PostMethod(this.onSuccessSave, "incoming/", data, false, this.onError);
        }
        else{
            data["id"] = this.state.incoming.id;
            Rest.PutMethod(this.onSuccessSave, "incoming/", data, false, this.onError);
        }
    }

    onError(data){
        this.setState({loading: false});
        this.props.onError(data);
    }

    onSuccessGet(data){
        this.setState({incoming: data, loading: false, vendorId: data.vendorId});
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
            <h2>Тип устройства</h2>
                <TextField name="modelName" autoComplete="off" defaultValue={this.state.incoming.modelName} label="Имя модели" />
                <br />
                <TextField name="version" autoComplete="off" defaultValue={this.state.incoming.version} label="Версия" />
                <br />
                <Button type='submit'>Сохранить</Button>
            </form>

        </div>)
        return(
            <div id="content">
            {view}
            </div>
        )
    }
}

export default withRouter(Incoming);
