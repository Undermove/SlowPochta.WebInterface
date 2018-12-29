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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { HubConnectionBuilder, HttpTransportType, LogLevel } from '@aspnet/signalr';

export default class AuthDialog extends React.Component {
    constructor(props) {
        super(props);
        console.log(sessionStorage);

        this.state = {
            name: sessionStorage.getItem('ttc.name'),
            loginLoading: false,
            isAuthComplete: false,
            anchorEl: null,
            open: false,
            login: "",
            password: "",
            value: 0,
            count: 0,
            hubConnection: null
        }

        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.onAuth = this.onAuth.bind(this);
        this.onErrorAuth = this.onErrorAuth.bind(this);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.onRegister = this.onRegister.bind(this);
    };

    componentDidMount = () => {
        this.ws = new WebSocket('ws://localhost:3000/ws');
        this.ws.addEventListener('message', function(e) {console.log('Server: ' + e.data);})
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    onLoginSubmit = () => {
        var data = {};
        data["login"] = this.state.login;
        data["password"] = this.state.password;
        this.setState({ loginLoading: true, anchorEl: null });
        Rest.PostMethod(this.onAuth, "token", data, true, this.onErrorAuth);
    }

    onRegistrationSubmit = () => {
        var data = {};
        data["login"] = this.state.login;
        data["password"] = this.state.password;
        this.setState({ loginLoading: true, anchorEl: null });
        Rest.PutMethod(this.onRegister, "api/users", data, false, this.onErrorAuth);
    }

    onRegister(data) {
        alert("Registration sucsess!");
        this.handleClose();
    }

    onAuth(data) {
        sessionStorage.setItem('ttc.token', data.access_token);
        sessionStorage.setItem('ttc.name', data.username);
        sessionStorage.setItem('ttc.account', JSON.stringify(data))

        this.setState({ loginLoading: false, name: data.username });
        this.setState({ open: false });
        this.setState({ isAuthComplete: true });
        this.props.handleAuth(true);
        window.location.reload();
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
        this.setState({ anchorEl: null });
        window.location.reload();
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.setState({ anchorEl: null });
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { anchorEl } = this.state;
        return (
            <Router>
                <div>
                    {sessionStorage.getItem('ttc.name') ? (
                        <div>
                            <div>
                                <IconButton aria-haspopup="true" component = {Link} to="/" color="inherit" onClick={this.handleClick}>
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={this.handleClose}
                                    >
                                    <MenuItem onClick={this.handleClose} >Профиль</MenuItem>
                                    <MenuItem onClick={this.handleLogout}>Разлогиниться</MenuItem>
                                </Menu>
                            </div>   
                        </div>
                    ) : <Button color="inherit" onClick={this.handleClickOpen} component = {Link} to="/receivedMessages">ВХОД</Button>}
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <Paper square>
                            <Tabs
                                value={this.state.value}
                                indicatorColor="primary"
                                textColor="inherit"
                                onChange={this.handleChange}
                            >
                                <Tab style = {{minWidth:'50%'}} label="Авторизация"  />
                                <Tab style = {{minWidth:'50%'}} label="Регистрация" />
                            </Tabs>
                        </Paper>

                        {this.state.value === 0 ? 
                        <div>
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
                        </div> :
                        <div>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="login"
                                    label="Придумайте Логин"
                                    type="email"
                                    fullWidth
                                    onChange={this.handleLoginChange}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="password"
                                    label="Придумайте Пароль"
                                    type="password"
                                    fullWidth
                                    onChange={this.handlePasswordChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.onRegistrationSubmit} color="primary">
                                    ЗАРЕГИСТРИРОВАТЬСЯ
                                </Button>
                            </DialogActions>
                        </div>}
                    </Dialog>
                </div>
            </Router>
        );
    }
}