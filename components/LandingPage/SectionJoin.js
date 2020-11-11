import { useState, useEffect, useRef } from 'react';
import cx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { animated, useSpring } from 'react-spring';

import leftImage from './images/join-left.png';
import rightImage from './images/join-right.png';

const buttonLink = {
  en_US:
    'https://hackmd.io/@mrorz/SklM4dV9m/https%3A%2F%2Fg0v.hackmd.io%2Fz7PY2mQeSMyWBoZpaVhAPg?type=book',
  zh_TW:
    'https://beta.hackfoldr.org/1yXwRJwFNFHNJibKENnLCAV5xB8jnUvEwY_oUq-KcETU/https%253A%252F%252Fhackmd.io%252Fs%252FSyMRyrfEl',
}[process.env.LOCALE];

const useStyles = makeStyles(theme => ({
  sectionJoin: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 40px',
    background: theme.palette.common.red1,
    width: '100%',
    overflow: 'hidden',

    [theme.breakpoints.only('md')]: {
      alignItems: 'flex-end',
    },

    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      padding: 0,
    },
  },
  image: {
    [theme.breakpoints.only('md')]: {
      height: 360,
      marginBottom: -43,

      '& > img': {
        height: '100%',
      },
    },

    [theme.breakpoints.down('sm')]: {
      order: -1,
      height: 170,
      marginTop: 30,

      '& > img': {
        height: '100%',
      },
    },
  },
  container: {
    color: 'white',
    padding: '0 14px 0 60px',
    flexShrink: 0,

    [theme.breakpoints.only('md')]: {
      width: 956,
      padding: 0,
      margin: '0 -200px 0 -240px',
    },

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '0 30px 30px',
    },

    '& > h3': {
      fontWeight: 'bold',
      fontSize: 48,
      lineHeight: '70px',
      marginBottom: 22,

      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
      },

      [theme.breakpoints.down('sm')]: {
        marginTop: 24,
        fontSize: 24,
        lineHeight: '35px',
        fontWeight: 'normal',
      },
    },

    '& > h4': {
      fontWeight: 500,
      fontSize: 34,
      lineHeight: '49px',
      letterSpacing: 0.25,
      marginBottom: 36,
      whiteSpace: 'pre-line',

      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        marginBottom: 60,
      },

      [theme.breakpoints.down('sm')]: {
        fontSize: 18,
        lineHeight: '26px',
        letterSpacing: 0.15,
        fontWeight: 'normal',
        marginBottom: 28,
      },
    },

    '& > p': {
      fontSize: 24,
      lineHeight: '35px',
      marginBottom: 46,

      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        marginBottom: 60,
      },

      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
        lineHeight: '26px',
        letterSpacing: 0.25,
        fontWeight: 'normal',
        marginBottom: 28,
      },
    },
  },
  button: {
    display: 'inline-flex',
    fontWeight: 500,
    fontSize: 34,
    lineHeight: '49px',
    letterSpacing: 0.25,
    padding: '10px 30px 10px 40px',
    border: '3px solid white',
    borderRadius: 40,
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'none',

    '&:hover': {
      color: 'white',
      textDecoration: 'none',
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
      lineHeight: '26px',
      letterSpacing: 0.15,
      fontWeight: 'normal',
      padding: '1px 35px 1px 45px',
    },
  },
}));

const SectionJoin = ({ className }) => {
  const classes = useStyles();

  const theme = useTheme();
  const isBreakpointMd = useMediaQuery(theme.breakpoints.only('md'));

  const [showImage, setShowImage] = useState(false);

  const ref = useRef();
  const { offset, opacity } = useSpring({
    offset: showImage ? 0 : 200,
    opacity: showImage ? 1 : 0,
  });

  const handleScroll = () => {
    if (ref.current) {
      const imageBottom = ref.current.getBoundingClientRect().bottom;
      const imageHeight = ref.current.getBoundingClientRect().height;

      if (imageBottom - imageHeight / 3 <= window.innerHeight) {
        setShowImage(true);
      } else {
        setShowImage(false);
      }
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return (
    <section className={cx(className, classes.sectionJoin)}>
      <animated.div
        ref={ref}
        className={classes.image}
        style={{
          opacity,
          transform: offset.interpolate(value => `translateX(${-value}px)`),
        }}
      >
        <img src={leftImage} />
      </animated.div>
      <div className={classes.container}>
        {/* TODO: translate*/}
        <h3>想成為闢謠戰士嗎？</h3>
        <h4>{`現在就加入闢謠者聯盟，${
          isBreakpointMd ? '' : '\n'
        }真真假假的世界需要你來拯救！`}</h4>
        <p>
          無論你覺得別人的回應回得不夠好、 <br />
          想知道的事情還沒有人查證過， <br />
          或是純粹充滿正義感與好奇心， <br />
          都非常有潛力成為一名傑出的闢謠戰士喔！
        </p>
        <a
          className={classes.button}
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          算我一個！
        </a>
      </div>
      <animated.div
        className={classes.image}
        style={{
          opacity,
          transform: offset.interpolate(value => `translateX(${value}px)`),
        }}
      >
        <img src={rightImage} />
      </animated.div>
    </section>
  );
};

export default SectionJoin;
