import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Footer from '../../commonComponents/footer';
import MessageStatusCard from '../../commonComponents/messageStatusCard';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 2,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 100,
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 0}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
  bigAvatar: {
    margin: 10,
    width: 260,
    height: 260,
  },
});

function HomeScreen(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              SlowPochta
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Добро пожаловать в самый медленный сервис на планете! Мы не стесняемся медлительности, а выставляем её на показ.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Левая бесполезная кнопка
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Правая бесполезная кнопка
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Немного о наших концепциях:
            </Typography>
          <Grid container spacing={40}>
              <Grid item key={1} sm={6} md={4} lg={3}>
                <MessageStatusCard id = {"slowpostman"} header={"Знай своего маскота!"} text={"Это Slowpostman (Медленныйпочтальон)! И он офигенный! Он может вообще все. Если он чего-то не умеет, это значит, что ему это просто не нужно. Любите его, он единственный, кто упорно дотаскивает ваши письма до наших серверов. точнее до нашего сервера. И не серчайте, он работает в нашем недавно открывшемся банке. Картинка с его изобраением нахально украдена, конечно, но это не мешает ему быть собой."}></MessageStatusCard>
              </Grid>
              <Grid item key={3} sm={6} md={4} lg={3}>
                <MessageStatusCard id = {"passwords"} header={"МЫ ВИДИМ ВАШИ ПАРОЛИ"} text={"Что это значит? Это значит, что пароль, который вы придумали, мы можем посмотреть. Страшно ли это? Ну вообще, да, но фейсбук недавно заявил, что до недавнего времени хранил пароли в открытом виде. Но они это делали скрыто! Мы же, честно предупреждаем. Когда-нибудь мы их зашифруем и тогда никто не сможет их посмотреть. НЕ ИСПОЛЬЗУЙТЕ ПАРОЛИ КОТОРЫЕ ВАМ ДОРОГИ!!! ПРИДУМАЙТЕ НОВЫЙ!!!"}></MessageStatusCard>
              </Grid>
              <Grid item key={3} sm={6} md={4} lg={3}>
                <MessageStatusCard id = {"nopasswords"} header={"МЫ НЕ ВОССТАНАВЛИВАЕМ ПАРОЛИ"} text={"Что это значит? Это значит, что пароль, который вы придумали и потом забыли, мы вам не восстановим. Может в будущем мы всё это поправим, но пока нет. Почему так? Потому, что хранить персональные данные - это гемор."}></MessageStatusCard>
              </Grid>
              <Grid item key={2} sm={6} md={4} lg={3}>
                <MessageStatusCard id = {"slowpochta_logo"} header={"Мы доставляем письма медленно."} text={"В век высоких технологий и широкополосного интернета, все привыкли все ускорять, мы же не поддаемся на новомодные тенденции и все качественно замедляем. То есть мы делаем так чтобы все ваши миллиарды терабайт пропускной способности работали так же хорошо, как и повозка в которую запряжена чахлая лошаденка."}></MessageStatusCard>
              </Grid>
              <Grid item key={4} sm={6} md={4} lg={3}>
                <MessageStatusCard id = {"dushevno"} header={"Душевно"} text={"Самое главное, что потеряли письма - это дух приключений. Вот оно пришло к вам мятое, в каких-то пятнах и пахнущее масляной рыбой. Но оно пришло! И это самоценно для вас. А теперь, когда ваше письмо лежит в облаке, многократно откопированное на случай пожара в серверной, оно перестало быть таким желанным. Нажимая кнопку отправить с любовным признаением, вы точно знаете, что оно дойдет до адресата, и нет этой магии, что ваше идиотское решение приходит в тот момент, когда вы уже расслабились. Кара наступает сразу, когда вы как раз поджали сфинктер."}></MessageStatusCard>
              </Grid>
              <Grid item key={5} sm={6} md={4} lg={3}>
                <MessageStatusCard id = {"hateandlove"} header={"Мы любим вас"} text={"Мы любим наших пользователей, просто наша любовь к вам выражается через ненависть и непрофессионализм."}></MessageStatusCard>
              </Grid>
              <Grid item key={6} sm={6} md={4} lg={3}>
                <MessageStatusCard id = {"notfun"} header={"Не обязательно смешно"} text={"Наш юмор так себе. Но если кому-то зайдет, то и пускай."}></MessageStatusCard>
              </Grid>
              <Grid item key={7} sm={6} md={4} lg={3}>
                <MessageStatusCard id = {"donotwanttoheartyou"} header={"Никого не хотим обидеть"} text={"Тут всё просто. Если что-то вас обижает, то это не было задумано так чтобы вас обидеть. Никакую религию, организацию, персону, рассу, пол, страну, сексуальную ориентацию, или кого бы то ни было этот сайт не собирается и не будет собираться оскорблять."}></MessageStatusCard>
              </Grid>
          </Grid>
        </div>
      </main>
      {/* Footer */}
      <Footer className={classes.footer}>
        <Typography variant="h7" color="textSecondary" className={classes.grow}>
            Back-end by <a href="https://github.com/Taiiayo">Taiiayo</a> / Front-end by <a href="https://github.com/Undermove">Undermove</a> 
        </Typography>
      </Footer>
      {/* End footer */}
    </React.Fragment>
  );
}

HomeScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeScreen);