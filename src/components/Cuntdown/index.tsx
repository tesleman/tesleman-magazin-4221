import { Container, Grid } from '@material-ui/core';
import moment, { Moment } from 'moment';
import React from 'react';
import { useStyles, useStylesType } from './countdown.style';

const CountDown = () => {
  const style: useStylesType = useStyles();
  const [state, setState] = React.useState({
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
  });
  React.useEffect(() => {
    const date = new Date();
    console.log(moment(date, 'MM DD YYYY, h:mm a'));
    const timeTillDate = '05 1 2021, 6:00 am';
    const timeFormat = 'MM DD YYYY, h:mm a';
    const interval = setInterval(() => {
      const then = moment(timeTillDate, timeFormat);
      const now = moment();
      const countdown = moment.duration(moment(then).diff(moment(now, 'DD/MM/YYYY HH:mm')));
      const days = countdown.days();
      console.log(days);
      const hours = countdown.hours();
      const minutes = countdown.minutes();
      const seconds = countdown.seconds();

      setState({ days, hours, minutes, seconds });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const { days, hours, minutes, seconds } = state;
  const daysRadius = mapNumber(days, 30, 0, 0, 360);
  const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
  const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
  const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

  const SVGCircle = ({ radius }) => (
    <svg className={style.countdownSvg}>
      <path fill="none" stroke="#333" stroke-width="4" d={describeArc(50, 50, 48, 0, radius)} />
    </svg>
  );
  return (
    <div className={style.root}>
      <div className={style.rootBg}>
        <Container>
          <div>
            <h1>FR CHAIR BY FRITZ HANSEN</h1>
            <p>
              Fri™ is designed to create a cosy feel in any setting. Of course, it takes more than a
              chair to create that ambience
            </p>
          </div>
          <Grid container direction="row">
            <div className={style.countdownWrapper}>
              {
                <div className={style.countdownItem}>
                  <SVGCircle radius={daysRadius} />
                  {days}
                  <span>days</span>
                </div>
              }
              {
                <div className={style.countdownItem}>
                  <SVGCircle radius={hoursRadius} />
                  {hours}
                  <span>hours</span>
                </div>
              }
              {
                <div className={style.countdownItem}>
                  <SVGCircle radius={minutesRadius} />
                  {minutes}
                  <span>minutes</span>
                </div>
              }
              {
                <div className={style.countdownItem}>
                  <SVGCircle radius={secondsRadius} />
                  {seconds}
                  <span>seconds</span>
                </div>
              }
            </div>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default CountDown;

// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');

  return d;
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
  return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
