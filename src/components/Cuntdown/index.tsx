import { Container, Grid } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { Card } from '../Card';
import { cardInterface } from '../component-types';
import { useStyles, useStylesType } from './countdown.style';

const CountDown: React.FC<{
  card: cardInterface;
  cart: Array<cardInterface>;
  addTooCartHendl: (payload: cardInterface) => void;
}> = ({ card, addTooCartHendl, cart }) => {
  const style: useStylesType = useStyles();

  return (
    <div className={style.root}>
      <div className={style.rootBg}>
        <Container>
          <div className={style.headerWraper}>
            <h1>FR CHAIR BY FRITZ HANSEN</h1>
            <p>
              Fri™ is designed to create a cosy feel in any setting. Of course, it takes more than a
              chair to create that ambience
            </p>
          </div>
          <Grid
            alignItems="center"
            className={style.rootContduwnContiner}
            container
            direction="row"
          >
            {card && <Card cart={cart} card={card} addTooCartHendl={addTooCartHendl} />}
            <Countdown style={style} />
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default CountDown;

const Countdown: React.FC<{ style: useStylesType }> = ({ style }) => {
  const [state, setState] = React.useState({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });
  React.useEffect(() => {
    const timeTillDate = '04 3 2022, 6:00 am';
    const timeFormat = 'MM DD YYYY, h:mm a';
    const interval = setInterval(() => {
      const then = moment(timeTillDate, timeFormat);
      const now = moment();
      const countdown = moment.duration(moment(then).diff(moment(now, 'MM DD YYYY, h:mm a')));
      const days = countdown.days();
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

  const SVGCircle = ({ radius }) => {
    let d = describeArc(50, 50, 48, 0, radius);
    return (
      <svg className={style.countdownSvg}>
        <path fill="none" stroke="#333" strokeWidth="4" d={d} />
      </svg>
    );
  };
  return (
    <Grid item xs={6}>
      <div className={style.countdownWrapper}>
        <div className={style.countdownItem}>
          <SVGCircle radius={daysRadius} />
          {days}
          <span>days</span>
        </div>

        <div className={style.countdownItem}>
          <SVGCircle radius={hoursRadius} />
          {hours}
          <span>hours</span>
        </div>

        <div className={style.countdownItem}>
          <SVGCircle radius={minutesRadius} />
          {minutes}
          <span>minutes</span>
        </div>

        <div className={style.countdownItem}>
          <SVGCircle radius={+secondsRadius} />
          {seconds}
          <span>seconds</span>
        </div>
      </div>
      <h3>Cкидос</h3>
      <p>
        Fri™ is designed to create a cosy feel in any setting. Of course, it takes more than a chair
        to create that ambience
      </p>
    </Grid>
  );
};

// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(
    ' ',
  );

  return d;
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
  return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
