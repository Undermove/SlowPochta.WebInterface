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
import { BrowserRouter as Router, Route} from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

class SelectedListItem extends React.Component {
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
            <div className="App">
                <Router>
                    <div>
                        <Paper square>
                            <Tabs
                                value={this.state.value}
                                indicatorColor="primary"
                                textColor="inherit"
                                onChange={this.handleChange}
                            >
                                <Tab label="Входящие" />
                                <Tab label="Исходящие" component = {Link} to="/incomings"/>
                                <Tab label="Написать новое" />
                            </Tabs>
                        </Paper>
                        <Route exact path='/' render={(props) => (
                            <HomeScreen {...props} onError={this.onError} />
                        )}/>
                        <Route path='/incomings' render={(props) => (
                            <Incomings {...props} onError={this.onError} />
                        )}/>
                    </div>
                </Router>
            </div>
        </div>
    );
  }
}

SelectedListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectedListItem);