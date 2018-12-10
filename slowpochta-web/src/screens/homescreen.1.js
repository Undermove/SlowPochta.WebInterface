import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Footer from '../commonComponents/footer';
import { withStyles } from '@material-ui/core/styles';
import Slider from "react-slick";

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
    mainText:{
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 20,
        marginBottom: 20,
        'text-align':'Center',
    }
  });

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

class HomeScreen extends Component{
    render(){
        const { classes } = this.props;
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };
        return(
            <div >
                <Paper className={classes.mainText}>
                    Добро пожаловать в самый медленный мессенджер на планете!
                </Paper>
                <Paper className={classes.mainText} component="p">
                <ul>Наша концепция:
                    <li>Пока все работает на скорость и качество, мы работаем на медленность и душевность.</li>
                </ul>
                    
                    
                    Мы считаем что приятнее получить письмо, которое дошло кое-как, чем то, которое гарантированно достигнет вас
                </Paper>
                <Paper className={classes.mainText}>
                    <Typography variant="h5" color="">
                        Временный маскот сервиса SlowPostman:
                    </Typography>
                    <img  className={classes.mainText} src="/static/images/cards/slowpostman.png" alt="Italian Trulli"></img>
                </Paper>
                <Footer>
                    <Typography variant="h7" color="textSecondary" className={classes.grow}>
                        Back-end by <a href="https://github.com/Taiiayo">Taiiayo</a> / Front-end by <a href="https://github.com/Undermove">Undermove</a> 
                    </Typography>
                </Footer>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(HomeScreen);