import { updateTime } from '../../helpers';
import Button from '../Button/Button';
import styles from './buttons.module.scss';
import { useEffect, useState } from 'react';

const Buttons = () => {
  const [time, setTime] = useState(0); //eslint-disable-line
  const [timer, setTimer] = useState();

  const start = () => {
    if (!timer) {
      setTimer(setInterval(() => {
        setTime(prevValue => {
          const newTime = parseInt(prevValue) + 1
          updateTime(newTime);
          return newTime;
        });
        
      }, 1));
    }
  };

  const stop = () => {
    clearInterval(timer);
    setTimer(undefined);
  };

  const reset = () => {
    stop();
    setTime(0);
    updateTime(0);
  }

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    }
  }, []); //eslint-disable-line

  return (
    <div className={styles.buttons}>
      <Button onClick={start}>Start</Button>
      <Button onClick={stop}>Stop</Button>
      <Button onClick={reset}>Reset</Button>
    </div>
  );
};
export default Buttons;