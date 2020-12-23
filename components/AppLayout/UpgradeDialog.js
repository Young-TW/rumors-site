import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'clsx';
import { Dialog } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { animated, useSpring } from 'react-spring';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { c } from 'ttag';

import { CloseIcon } from 'components/icons';
import LevelIcon from 'components/LevelIcon';

import LEVEL_NAMES from 'constants/levelNames';

import upgradeImage from './images/upgrade.png';

const getConicGradient = (color1, color2, startAngle) => {
  return `repeating-conic-gradient( 
      from ${startAngle}deg, 
      ${color1} ${startAngle}deg ${startAngle + 15}deg, 
      ${color2} ${startAngle + 15}deg ${startAngle + 30}deg
)`;
};

const useStyles = makeStyles(theme => ({
  '@keyframes spin': {
    '0%': {
      background: getConicGradient(
        theme.palette.common.yellow,
        theme.palette.common.orange2,
        0
      ),
    },
    '10%': {
      background: getConicGradient(
        theme.palette.common.yellow,
        theme.palette.common.orange2,
        1.5
      ),
    },
    '20%': {
      background: getConicGradient(
        theme.palette.common.yellow,
        theme.palette.common.orange2,
        3
      ),
    },
    '30%': {
      background: getConicGradient(
        theme.palette.common.yellow,
        theme.palette.common.orange2,
        4.5
      ),
    },
    '40%': {
      background: getConicGradient(
        theme.palette.common.yellow,
        theme.palette.common.orange2,
        6
      ),
    },
    '50%': {
      background: getConicGradient(
        theme.palette.common.yellow,
        theme.palette.common.orange2,
        7.5
      ),
    },
    '60%': {
      background: getConicGradient(
        theme.palette.common.yellow,
        theme.palette.common.orange2,
        9
      ),
    },
    '70%': {
      background: getConicGradient(
        theme.palette.common.yellow,
        theme.palette.common.orange2,
        10.5
      ),
    },
    '80%': {
      background: getConicGradient(
        theme.palette.common.yellow,
        theme.palette.common.orange2,
        12
      ),
    },
    '90%': {
      background: getConicGradient(
        theme.palette.common.yellow,
        theme.palette.common.orange2,
        13.5
      ),
    },
    '100%': {
      background: getConicGradient(
        theme.palette.common.yellow,
        theme.palette.common.orange2,
        15
      ),
    },
  },

  root: {
    overflow: 'hidden',
  },
  dialogContent: {
    MsOverflowStyle: 'none' /* IE and Edge */,
    scrollbarWidth: 'none' /* Firefox */,

    '&::WebkitScrollbar': {
      display: 'none',
    },
  },
  paper: {
    width: 300,
    maxWidth: 'unset !important',
    margin: '32px 0',
  },
  top: {
    position: 'relative',
    height: 0,
    paddingBottom: '100%',
    background: theme.palette.common.yellow,
    backgroundImage: ({ stage }) => (stage <= 2 ? `url(${upgradeImage})` : ''),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  spinBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    paddingBottom: '100%',
    animation: '$spin 1.3s infinite',
    animationTimingFunction: 'linear',
  },
  bottom: {
    position: 'relative',
    width: '100%',
    paddingBottom: '50%',
  },
  close: {
    position: 'absolute',
    width: '4%',
    height: '8%',
    top: '8%',
    right: '4%',
    cursor: 'pointer',
    zIndex: 100,
    color: '#ADADAD',

    '& > svg': {
      display: 'block',
      width: '100%',
      height: '100%',
    },
  },
  bottomContent: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: '4%',
    overflow: 'hidden',
  },
  titleLg: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 1.46,
    textAlign: 'center',
    margin: '0 0 8px 0',
  },
  titleMd: {
    fontSize: 21,
    fontWeight: 'bold',
    lineHeight: 1.46,
    textAlign: 'center',
    margin: '0 0 8px 0',
  },
  contentText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.45,
    textAlign: 'center',
    margin: 0,
  },
  levelContainer: {
    display: 'flex',
    marginTop: process.env.LOCALE === 'en_US' ? 7 : 23,
    width: '100%',
    padding: '0 8px',
    justifyContent: 'space-between',
  },
  level: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: 9,
    fontWeight: 'bold',
    lineHeight: 1.55,
    whiteSpace: 'nowrap',
  },
  levelIcon: {
    width: 23,
    height: 23,
    marginBottom: 2.5,

    '& > svg': {
      width: '100%',
      height: '100%',
    },
  },
  progress: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  progressBarContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 'calc(100% - 16px)',
    height: 14,
    borderRadius: 13,
    border: `2px solid ${theme.palette.primary.main}`,
    padding: '0 2.5px',
    marginBottom: 6,
  },
  progressBar: {
    position: 'relative',
    height: 6,
    borderRadius: 12,
    background: theme.palette.primary.main,
  },
  progressText: {
    fontSize: 9,
    fontWeight: 500,
    lineHeight: 1.55,

    '& > span:first-child': {
      marginRight: 4,
    },
  },
  dynamticNextLevel: {
    position: 'absolute',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.primary.main,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1,
    color: 'white',
    marginTop: process.env.LOCALE === 'en_US' ? 10 : 18,
    cursor: 'pointer',
    padding: '6px 32px',
  },
}));

const TransitionComponent = (props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
};

const Transition = React.forwardRef(TransitionComponent);

export const UpgradeDialogLayout = ({
  open,
  onClose,
  currentLevel,
  currentLevelScore,
  nextLevel,
  nextLevelScore,
}) => {
  const [stage, setStage] = useState(0);
  const classes = useStyles({ stage });
  const timerRef = useRef(null);

  const { progress } = useSpring({
    progress:
      stage <= 1 && nextLevelScore > 0
        ? (currentLevelScore / nextLevelScore) * 100
        : 100,
  });
  const nextLevelProps = useSpring({
    scale: stage >= 3 ? 3.5 : 1,
    right: stage >= 3 ? 'calc(50% + -40px)' : 'calc(0% + 20px)',
    bottom: stage >= 3 ? 'calc(150% + -26px)' : 'calc(0% + 9px)',
  });

  useEffect(() => {
    if (open) {
      setStage(1);
    } else {
      setStage(0);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  }, [open]);

  useEffect(() => {
    if (stage < 4 && stage !== 0) {
      timerRef.current = setTimeout(() => {
        setStage(value => value + 1);
      }, 800);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [stage]);

  return (
    <>
      <Dialog
        className={classes.root}
        TransitionComponent={Transition}
        keepMounted
        open={stage > 0}
        onClose={onClose}
        scroll="body"
        fullWidth
        classes={{
          paper: classes.paper,
          paperScrollBody: classes.paper,
          paperWidthSm: classes.paper,
        }}
      >
        <div className={classes.dialogContent}>
          <div className={classes.top}>
            {stage >= 4 && <div className={classes.spinBg} />}
          </div>
          <div className={classes.bottom}>
            <div className={classes.close} onClick={onClose}>
              <CloseIcon />
            </div>
            <div className={classes.bottomContent}>
              {stage <= 3 && (
                <>
                  {/* TODO: translate */}
                  <h3 className={classes.titleLg}>
                    {c('upgrade dialog').t`Congratulations!`}
                  </h3>
                  <p className={classes.contentText}>
                    {c('upgrade dialog')
                      .t`You can keep leveling up after your level-up!`}
                  </p>
                  <div className={classes.levelContainer}>
                    <div className={classes.level}>
                      <div className={classes.levelIcon}>
                        <LevelIcon level={currentLevel} />
                      </div>
                      <div>Lv. {currentLevel}</div>
                    </div>
                    <div className={classes.progress}>
                      <div className={classes.progressBarContainer}>
                        <animated.div
                          className={classes.progressBar}
                          style={{
                            width: progress.interpolate(value => `${value}%`),
                          }}
                        />
                      </div>
                      {/* TODO: translate */}
                      <div className={classes.progressText}>
                        <span>{c('upgrade dialog').t`EXP`}</span>
                        <animated.span>
                          {progress.interpolate(
                            value =>
                              `${((value / 100) * nextLevelScore).toFixed(0)}`
                          )}
                        </animated.span>
                        <span>/{nextLevelScore}</span>
                      </div>
                    </div>
                    <div
                      className={classes.level}
                      style={{
                        opacity: stage >= 2 ? 0 : 1,
                      }}
                    >
                      <div className={classes.levelIcon}>
                        <LevelIcon level={nextLevel} />
                      </div>
                      <div>Lv. {nextLevel}</div>
                    </div>
                  </div>
                </>
              )}

              {stage >= 4 && (
                <>
                  {/* TODO: translate */}
                  <h3 className={classes.titleMd}>
                    {c('upgrade dialog').t`Cheers! ${LEVEL_NAMES[nextLevel]}`}
                  </h3>
                  <p className={classes.contentText}>
                    {c('upgrade dialog')
                      .t`Keep up the good work and save the world!`}
                  </p>
                  <div className={classes.button} onClick={onClose}>
                    {c('upgrade dialog').t`I've got your back`}
                  </div>
                </>
              )}
            </div>

            {stage >= 2 && (
              <animated.div
                className={cx(classes.level, classes.dynamticNextLevel)}
                style={{
                  right: nextLevelProps.right,
                  bottom: nextLevelProps.bottom,
                }}
              >
                <animated.div
                  className={classes.levelIcon}
                  style={{
                    width: nextLevelProps.scale.interpolate(
                      value => `${value * 23}px`
                    ),
                    height: nextLevelProps.scale.interpolate(
                      value => `${value * 23}px`
                    ),
                  }}
                >
                  <LevelIcon level={nextLevel} />
                </animated.div>
                <animated.div
                  style={{
                    fontSize: nextLevelProps.scale.interpolate(
                      value => value * 9
                    ),
                  }}
                >
                  Lv. {nextLevel}
                </animated.div>
              </animated.div>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

const USER_QUERY = gql`
  query UserForUpgradeDialog {
    GetUser {
      level
      points {
        total
        currentLevel
        nextLevel
      }
    }
  }
`;

const UpgradeDialog = () => {
  const [isActive, setIsActive] = useState(false);
  const [prevCurrentLevel, setPrevCurrentLevel] = useState(-1);
  const [prevNextLevel, setPrevNextLevel] = useState(-1);
  const [prevCurrentScore, setPrevCurrentScore] = useState(-1);
  const [prevNextScore, setPrevNextScore] = useState(-1);

  const [loadUser, { data }] = useLazyQuery(USER_QUERY);

  const closeUpgradeDialog = () => {
    setIsActive(false);

    if (data && data.GetUser) {
      const { total, currentLevel, nextLevel } = data.GetUser.points;

      setPrevCurrentLevel(currentLevel);
      setPrevNextLevel(nextLevel);
      setPrevCurrentScore(total);
    }
  };

  useEffect(() => loadUser(), [loadUser]);

  useEffect(() => {
    if (data && data.GetUser) {
      const { total, currentLevel, nextLevel } = data.GetUser.points;

      if (prevCurrentLevel === -1) {
        setPrevCurrentLevel(currentLevel);
        setPrevNextLevel(nextLevel);
        setPrevCurrentScore(total);
        setPrevNextScore(total);
      } else if (currentLevel > prevCurrentLevel) {
        setPrevNextScore(total);
        setIsActive(true);
      }
    }
  }, [data, prevCurrentLevel]);

  return (
    <UpgradeDialogLayout
      open={isActive}
      currentLevel={prevCurrentLevel || 0}
      currentLevelScore={prevCurrentScore || 0}
      nextLevel={prevNextLevel || 0}
      nextLevelScore={prevNextScore || 0}
      onClose={closeUpgradeDialog}
    />
  );
};

export default UpgradeDialog;
