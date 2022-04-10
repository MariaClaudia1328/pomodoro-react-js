import { useState, useRef, useEffect } from "react";
import "./Timer.css";

const Timer = ({ onTimerEnd, interval }) => {
  const ref = useRef(null);

  interval = interval * 60;

  const [timeLeft, setTimeLeft] = useState(interval);

  useEffect(() => {
    setTimeLeft(interval);
  }, [interval]);

  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Acabou o tempo!");
      clearInterval(ref.current);
      setTimeLeft(onTimerEnd());
    }
  }, [timeLeft, onTimerEnd]);

  const formatNumber = (n) => Math.floor(n).toString().padStart(2, "0");

  const formatTimeLeft = () => {
    const seconds = formatNumber(timeLeft % 60);
    const minutes = formatNumber((timeLeft / 60) % 60);
    const hours = formatNumber(timeLeft / 3600);
    // template string
    return `${hours}:${minutes}:${seconds}`;
  };

  const startTimer = () => {
    if (ref.current) clearInterval(ref.current);
    const id = setInterval(() => {
      setTimeLeft((curTimeLeft) => curTimeLeft - 1);
    }, 1000);
    ref.current = id;
  };

  const onClickStart = () => {
    setTimeLeft(interval);
    startTimer(interval);
  };

  const onClickPause = () => {
    clearInterval(ref.current);
  };

  const onClickResume = () => {
    startTimer(timeLeft);
  };

  return (
    <div className="timer">
      <h2>{formatTimeLeft()}</h2>
      <div className="buttons">
        <button onClick={onClickStart}>Start</button>
        <button onClick={onClickPause}>Pause</button>
        <button onClick={onClickResume}>Resume</button>
      </div>
    </div>
  );
};

export default Timer;
