import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import HomeScreen from './screens/homescreen';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ReceivedMessages from './screens/receivedMessage/receivedMessages';
import ReceivedMessage from './screens/receivedMessage/receivedMessage';
import SentMessages from './screens/sentMessage/sentMessages';
import SentMessage from './screens/sentMessage/sentMessage';
import NewMessage from './screens/newMessage/newMessage';
import { BrowserRouter as Router, Route} from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class MenuBar extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      selectedIndex: -1,
    };
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    // let permissions = JSON.parse(sessionStorage.getItem('ttc.account')).permissions;

    const { classes } = this.props;

    return (
        <div className={classes.root}>
            <Router>
            <div className="App">
                {sessionStorage.getItem("ttc.name") ? 
                        <div>
                            <Paper square>
                                <Tabs
                                    value={this.state.value}
                                    indicatorColor="primary"
                                    textColor="inherit"
                                    onChange={this.handleChange}
                                >
                                    <Tab label="Входящие" component = {Link} to="/receivedMessages"/>
                                    <Tab label="Исходящие" component = {Link} to="/sentMessages"/>
                                    <Tab label="Написать новое" component = {Link} to="/newMessage"/>
                                </Tabs>
                            </Paper>
                            <Route path='/receivedMessages' render={(props) => (
                                <ReceivedMessages {...props} onError={this.onError} />
                            )}/>
                            <Route path='/receivedMessage/:id' render={(props) => (
                                <ReceivedMessage {...props} onError={this.onError} />
                            )}/>
                            <Route path='/sentMessages' render={(props) => (
                                <SentMessages {...props} onError={this.onError} />
                            )}/>
                            <Route path='/sentMessage/:id' render={(props) => (
                                <SentMessage {...props} onError={this.onError} />
                            )}/>
                            <Route path='/newMessage' render={(props) => (
                                <NewMessage {...props} onError={this.onError} />
                            )}/>
                            <Route exact path='/' render={(props) => (
                                <HomeScreen {...props} onError={this.onError} />
                            )}/>
                        </div>
                    :<Route path='/' render={(props) => (
                        <HomeScreen {...props} onError={this.onError} />
                    )}/>}
            </div>
            </Router>
        </div>
    );
  }
}

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuBar);