import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import * as Rest from '../restclient';
import DialogTitle from '@material-ui/core/DialogTitle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

export default class AuthDialog extends React.Component {
    constructor(props) {
        super(props);
        console.log(sessionStorage);

        this.state = {
            name: sessionStorage.getItem('ttc.name'),
            loginLoading: false,
            isAuthComplete: false,
            open: false,
            login: "",
            password: ""
        }

        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.onAuth = this.onAuth.bind(this);
        this.onErrorAuth = this.onErrorAuth.bind(this);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onLoginSubmit = () => {
        var data = {};
        data["login"] = this.state.login;
        data["password"] = this.state.password;
        this.setState({ loginLoading: true, anchorEl: null });
        Rest.PostMethod(this.onAuth, "token", data, true, this.onErrorAuth);
    }

    onAuth(data) {
        sessionStorage.setItem('ttc.token', data.access_token);
        sessionStorage.setItem('ttc.name', data.username);
        sessionStorage.setItem('ttc.account', JSON.stringify(data))

        this.setState({ loginLoading: false, name: data.username });
        this.setState({ open: false });
        this.setState({ isAuthComplete: true });
        this.props.handleAuth(true);
    }

    onErrorAuth(data) {
        alert(data);
        this.setState({ loginLoading: false });
    }

    handleLoginChange(event) {
        this.setState({ login: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    
    handleLogout(event) {
        sessionStorage.clear();
        this.setState({ isAuthComplete: false });
        this.props.handleAuth(false);
    }

    render() {
        return (
            <div>
                {sessionStorage.getItem('ttc.name') ? (
                    <div>
                        <Router>
                            <IconButton aria-haspopup="true" component = {Link} to="/" color="inherit" onClick={this.handleLogout}>
                                <AccountCircle />
                            </IconButton>
                        </Router>
                    </div>
                ) : <Button color="inherit" onClick={this.handleClickOpen}>ВХОД</Button>}
                
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Авторизация</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="login"
                            label="Логин"
                            type="email"
                            fullWidth
                            onChange={this.handleLoginChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Пароль"
                            type="password"
                            fullWidth
                            onChange={this.handlePasswordChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onLoginSubmit} color="primary">
                            ВХОД
                        </Button>
                        <Button onClick={this.handleClose} color="secondary">
                            ОТМЕНА
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}