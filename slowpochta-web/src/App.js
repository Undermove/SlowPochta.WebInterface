import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link  } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AuthDialog from './commonComponents/authDialog';
import MenuBar from './menubar';

const styles = theme => ({
  root: {
    flexGrow: 100,
  },
  grow: {
    flexGrow: 100,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class App extends Component {

  constructor(props){
    super(props);
    console.log(sessionStorage);
    
    this.state = {
      name: sessionStorage.getItem('ttc.name'),
      loginLoading: false,
      open: true,
      anchor: 'bottom',
      anchorEl: null
    }

    this.handleChange = this.handleChange.bind(this);
  };
  state = {
    value: 4,
  };

  handleChange = (event, value) => {
    this.setState({ value: event });
    this.render();
  };

  handleClick = () => {
    window.reload();
  };

  handleAuth = (event, value) => {
    this.setState({ isAuth: value });
  };

  render() {
    const contentStyle = { transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };
    const { anchor, open, value } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Router>
                <Typography variant="h6" color="inherit" onClick = {this.handleClick} component = {Link} to="/" className={classes.title}>
                  SlowPochta
                </Typography>
              </Router>
              <div className={classes.grow} />
              <AuthDialog handleAuth={this.handleAuth}/>
            </Toolbar>
          </AppBar>
          <MenuBar/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);