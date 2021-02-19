import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

import SectionTitle from './SectionTitle';
import HowToUseItem from './HowToUseItem';

import howToUse1 from './images/how-to-use-1.png';
import howToUse2 from './images/how-to-use-2.png';
import howToUse3 from './images/how-to-use-3.png';
import plane1 from './images/plane-1.png';
import plane2 from './images/plane-2.png';
import arrow from './images/arrow.svg';

const useStyles = makeStyles(theme => ({
  howToUse: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#ff9900',
    padding: '43px 0 54px',

    [theme.breakpoints.down('sm')]: {
      padding: '20px 0 90px',
    },

    '& h3': {
      color: 'white',
    },
  },
  itemWrapper: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    maxWidth: 1020,
    margin: '40px auto 56px',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexDirection: 'column',
      padding: '0 40px',
      margin: '20px auto 35px',
    },

    '& > div': {
      margin: '0 25px',

      [theme.breakpoints.down('md')]: {
        margin: '0 12px',
      },

      [theme.breakpoints.down('sm')]: {
        margin: '40px 0 0',
      },
    },
  },
  plane1: {
    position: 'absolute',
    top: -80,
    left: -200,
    width: 240,

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },

    '& > img': {
      width: '100%',
    },
  },
  plane2: {
    position: 'absolute',
    top: -80,
    left: -40,
    width: 140,

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },

    '& > img': {
      width: '100%',
    },
  },
  plane3: {
    position: 'absolute',
    bottom: -220,
    left: -40,

    [theme.breakpoints.down('sm')]: {
      width: 88,
      bottom: -220,
      left: 20,
    },

    '& > img': {
      width: '100%',
    },
  },
  button: {
    border: '3px solid white',
    borderRadius: 41,
    padding: '20px 20px 20px 25px',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
    color: 'white',

    [theme.breakpoints.down('sm')]: {
      padding: '8px 16px 8px 20px',
      fontSize: 18,
    },

    '& img': {
      marginLeft: 16,

      [theme.breakpoints.down('sm')]: {
        height: 17,
        marginLeft: 8,
      },
    },
  },
}));

const SectionHowToUse = () => {
  const classes = useStyles();

  return (
    <section className={classes.howToUse}>
      <SectionTitle>參與超簡單</SectionTitle>
      <div className={classes.itemWrapper}>
        <div className={classes.plane1}>
          <img src={plane1} />
        </div>
        <div className={classes.plane2}>
          <img src={plane1} />
        </div>
        <HowToUseItem image={howToUse1} text="收到可疑訊息" />
        <HowToUseItem image={howToUse2} text="發送給聊天機器人" />
        <HowToUseItem
          image={howToUse3}
          text={`他將自動判讀 \n 協助你得到查核報告。`}
        />
        <div className={classes.plane3}>
          <img src={plane2} />
        </div>
      </div>
      <Link href="/about" passHref>
        <Button variant="outlined" className={classes.button}>
          了解更多
          <img src={arrow} />
        </Button>
      </Link>
    </section>
  );
};

export default SectionHowToUse;