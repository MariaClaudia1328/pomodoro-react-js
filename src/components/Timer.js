import { useState, useRef, useEffect } from "react";
import "./Timer.css";

const Timer = ({ onTimerEnd, interval }) => {
  const ref = useRef(null);

  const [timeLeft, setTimeLeft] = useState(interval);

  // Recebe o tempo em minutos e passa para segundos
  interval = interval * 60;

  // Atualiza o tempo a ser mostrado a cada mudança
  // no valor do intervalo de tempo do temporizador
  useEffect(() => {
    setTimeLeft(interval);
  }, [interval]);

  // Executa a cada mudança no estado de timeLeft mas
  // quando seu valor é negativo, significa que o tempo
  // acabou. Assim, abre um alerta, pausa a atualização
  // que acontece a cada 1 segundo e executa a função
  // onTimerEnd()
  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Acabou o tempo!");
      clearInterval(ref.current);
      setTimeLeft(onTimerEnd());
    }
  }, [timeLeft, onTimerEnd]);

  // Arredonda um número float, transforma-o em string
  // e adiciona '0' à frente do número caso seja de um dígito
  // simples
  const formatNumber = (n) => Math.floor(n).toString().padStart(2, "0");

  // Formata o tempo calculado no formato de 00:00:00
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
        <button onClick={onClickStart}>Começar</button>
        <button onClick={onClickPause}>Pausar</button>
        <button onClick={onClickResume}>Retomar</button>
      </div>
    </div>
  );
};

export default Timer;
