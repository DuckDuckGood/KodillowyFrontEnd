import React, { useMemo, useState } from 'react';
import { render } from 'react-dom';

const App = () => {

  const [status, setStatus] = useState('off');
  const [time, setTime] = useState();
  const [timer, setTimer] = useState();

  const getTimeFormatted = () => {
    if (parseInt(time) === 0) {
      const audio = new Audio('./sounds/bell.wav');
      audio.play();
      if (status === 'work') stopTimer();
      if (status === 'rest') resetTimer();
    }

    const minute = parseInt(parseInt(time) / 60);
    const second = parseInt(parseInt(time) % 60);
    return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
  }

  const startTimer = () => {
    clearInterval();
    setTime(1200);
    setStatus('work');
    if (!timer) {
      setTimer(setInterval(() => {
        setTime(time => time - 1);
      }, 1000));
    }
  }

  const stopTimer = () => {
    clearInterval();
    setStatus('rest');
    setTime(20);
  }

  const resetTimer = () => {
    clearInterval();
    setStatus('off');
  }

  return (
    <div>
      <h1>Protect your eyes</h1>
      <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
      <p>This app will help you track your time and inform you when it's time to rest.</p>
      <img src="./images/work.png" className={`${status === 'work' ? '' : 'hide'}`} />
      <img src="./images/rest.png" className={`${status === 'rest' ? '' : 'hide'}`} />
      <div className={`timer ${status === 'off' ? 'hide' : ''}`}>
        {useMemo(() => getTimeFormatted(), [time])}
      </div>
      <button className={`btn ${status === 'off' ? '' : 'hide'}`} onClick={startTimer}>Start</button>
      <button className={`btn ${status === 'work' ? '' : 'hide'}`} onClick={stopTimer}>Stop</button>
      <button className={`btn ${status === 'rest' ? '' : 'hide'}`} onClick={resetTimer}>Reset</button>
      <button className="btn btn-close" onClick={() => window.close()}>X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
