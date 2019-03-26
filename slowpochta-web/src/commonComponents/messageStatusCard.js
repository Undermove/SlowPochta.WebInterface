import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SimpleDialog from '../commonComponents/simpleDialog'


const styles = {
  card: {
    height: 400,
    width: 272,
    margin: 10,
    marginLeft: 25,
    position: 'relative'
  },
  media: {
    height: 150,
  },
  controls:{
    disableActionSpacing: true,
    // todo: поправить на нормальное смещение
    position: 'absolute',
    bottom: 0,
    left: 0
  }
};

class MessageStatusCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {open: false}
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.sliceString = this.sliceString.bind(this);
  }
  
  sliceString(string){
    if(string.length > 100){
        return string.slice(0,100)+'...';
    }
    return string;
  }
  
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render(){
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={"/static/images/cards/" + this.props.id}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.header}
            </Typography>
            <Typography component="p">
              {this.sliceString(this.props.text)}
            </Typography>
            <Typography gutterBottom variant="h6">
              {this.props.dateTime}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className = {classes.controls}>
          <Button size="small" color="primary" onClick={this.handleClickOpen}>
            Подробнее
          </Button>
        </CardActions>
        <SimpleDialog
            open={this.state.open}
            onClose={this.handleClose}
            header = {this.props.header}
            text = {this.props.text}
            image = {"/static/images/cards/" + this.props.id}
          />
      </Card>
    );
  }
}

MessageStatusCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageStatusCard);