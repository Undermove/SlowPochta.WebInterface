import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import HomeScreen from './screens/homescreen';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import AllInbox from '@material-ui/icons/AllInbox';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Incomings from './screens/incoming/incomings';
import Incoming from './screens/incoming/incoming';
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
    // console.log(permissions);

    // var dictionaries = [];

    const { classes } = this.props;

    // permissions.forEach(p => {
    //   if(p.permissionId == 1 && p.canSelect){
    //     dictionaries.push(<ListItem key='1'
    //       button
    //       selected={this.state.selectedIndex === 1}
    //       component = {Link} to="/vendors"
    //       onClick={event => this.handleListItemClick(event, 1)}
    //     >
    //       <ListItemText primary="Вендоры" />
    //     </ListItem>)
    //   }
    // });
    const { value } = this.state;

    return (
    //   <div className={classes.root}>
    //     {/* <List component="nav">
    //         {dictionaries}
    //     </List> */}
    //     <div>TEST</div>
    //     <Divider />
    //   </div>
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
                                    <Tab label="Входящие" component = {Link} to="/incomings"/>
                                    <Tab label="Исходящие" component = {Link} to="/sentMessages"/>
                                    <Tab label="Написать новое" component = {Link} to="/newMessage"/>
                                </Tabs>
                            </Paper>
                            <Route path='/incomings' render={(props) => (
                                <Incomings {...props} onError={this.onError} />
                            )}/>
                            <Route path='/sentMessages' render={(props) => (
                                <SentMessages {...props} onError={this.onError} />
                            )}/>
                            <Route path='/newMessage' render={(props) => (
                                <NewMessage {...props} onError={this.onError} />
                            )}/>
                            <Route exact path='/' render={(props) => (
                                <HomeScreen {...props} onError={this.onError} />
                            )}/>
                        </div>
                    :<Route exact path='/' render={(props) => (
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