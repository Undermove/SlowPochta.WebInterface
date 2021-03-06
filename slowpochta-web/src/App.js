import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeScreen from './screens/homescreen';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuBar from './menubar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    flexGrow: 100,
  },
  grow: {
    flexGrow: 100,
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

  };
  state = {
    value: 4,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const contentStyle = { transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };
    const { anchor, open } = this.state;
    const { classes } = this.props;

    this.state.name = true;

    const drawer = !this.state.name ? <div></div> : (
        <MenuBar />
    );

    return (
      <div className={classes.root}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                SlowPochta
            </Typography>
              <Button color="inherit">Вход</Button>
            </Toolbar>
          </AppBar>
          {drawer}
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);