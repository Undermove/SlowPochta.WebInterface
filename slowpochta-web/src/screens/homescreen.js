import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Footer from '../commonComponents/footer';
import { withStyles } from '@material-ui/core/styles';
import CustomPaginationActionsTable from '../commonComponents/customPaginationActionsTable';

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

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

class HomeScreen extends Component{
    state = {
        rows: [
          createData('Cupcake', 305, 3.7),
          createData('Donut', 452, 25.0),
          createData('Eclair', 262, 16.0),
          createData('Frozen yoghurt', 159, 6.0),
          createData('Gingerbread', 356, 16.0),
          createData('Honeycomb', 408, 3.2),
          createData('Ice cream sandwich', 237, 9.0),
          createData('Jelly Bean', 375, 0.0),
          createData('KitKat', 518, 26.0),
          createData('Lollipop', 392, 0.2),
          createData('Marshmallow', 318, 0),
          createData('Nougat', 360, 19.0),
          createData('Oreo', 437, 18.0),
        ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
    };
    
    
    render(){
        const { classes } = this.props;
        return(
            <div>
                <Typography>{'В век высоких технолигий мы работаем над тем, чтобы все было так же хреново, как раньше.'}</Typography>
                <Typography>{'Пока все всё стараются ускорить, мы качественно замедляем.'}</Typography>
                <Typography>{'Мы не пытаемся быть хорошим сервисом, не пытаемся быть смешным сервисом, мы вообще больше НЕ, чем что либо другое'}</Typography>
                <CustomPaginationActionsTable rows = {this.state.rows}>
                </CustomPaginationActionsTable>
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