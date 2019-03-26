import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';

const styles = {
  title: {
    'text-align':'center',
    marginTop: 10
  },
  image:{
    width: 'auto',
    'max-width': '100%',
  },
  text:{
    margin: 20,
  }
};

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog class={classes.dialog} onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <img class= {classes.image} src={this.props.image}></img>
        <DialogTitle class={classes.title} id="simple-dialog-title">{this.props.header}</DialogTitle>
        <DialogContentText class = {classes.text}>{this.props.text}</DialogContentText>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(SimpleDialog);