import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Timer from "./components/Timer";
import "./App.css";

const App = () => {
  // Estados que recebem o conteúto de input=text
  const [inputWorkTime, setInputWorkTime] = useState(workTime); // ciclo de trabalho
  const [inputShortRest, setInputShortRest] = useState(shortRest); // descanto curto
  const [inputLongRest, setInputLongRest] = useState(longRest); // descanso longo
  const [inputNumberCicles, setInputNumberCicles] = useState(numberCicles); // número de ciclos

  // Estados que recebem o valor de input=text após confirmação
  const [workTime, setWorkTime] = useState(25);
  const [shortRest, setShortRest] = useState(5);
  const [longRest, setLongRest] = useState(25);
  const [numberCicles, setNumberCicles] = useState(4);

  // Estados auxiliares
  const [interval, setInterval] = useState(workTime);
  const [counter, setCounter] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [nameInterval, setNameInterval] = useState("Ciclo de trabalho");

  // Muda o valor do tempo (ou intervalo) a ser enviado para o temporizador além de
  // já computar se o próximo tempo será de ciclo de trabalho, descanso curto ou
  // descanso longo.
  const defineInterval = () => {
    if (isResting) {
      setInterval(workTime);
      setIsResting(false);
      setNameInterval("Ciclo de trabalho");
      return workTime;
    } else {
      setCounter(counter + 1);
      if (counter < numberCicles - 1) {
        setInterval(shortRest);
        setIsResting(true);
        setNameInterval("Descanso curto");
        return shortRest;
      } else {
        setInterval(longRest);
        setIsResting(true);
        setNameInterval("Descanso longo");
        return longRest;
      }
    }
  };

  // Repassa os valores recebidos das caixas de texto para os estados
  // que serão utilizados no cálculo do tempo do temporizador. Além
  // disso, inicializa o temporizador com o tempo de ciclo de trabalho
  const getNextInterval = () => {
    setWorkTime(inputWorkTime);
    setShortRest(inputShortRest);
    setLongRest(inputLongRest);
    setNumberCicles(inputNumberCicles);

    if (!isResting) {
      setInterval(inputWorkTime);
      setNameInterval("Ciclo de trabalho");
      return inputWorkTime;
    } else {
      if (counter < inputNumberCicles - 1) {
        setInterval(inputShortRest);
        setNameInterval("Descanso curto");
        return inputShortRest;
      } else {
        setInterval(inputLongRest);
        setNameInterval("Descanso longo");
        return inputLongRest;
      }
    }
  };

  return (
    <div className="App">
      <h1>Pomodoro</h1>

      <div className="timer">
        <h3>{nameInterval}</h3>
        <Timer onTimerEnd={defineInterval} interval={interval} />
      </div>

      <div className="form">
        <div className="listForm">
          <label>
            Tempo de trabalho:
            <input
              type="text"
              value={inputWorkTime}
              onChange={(e) => setInputWorkTime(e.target.value)}
            />
          </label>
          <label>
            Descanso Curto:
            <input
              type="text"
              value={inputShortRest}
              onChange={(e) => setInputShortRest(e.target.value)}
            />
          </label>
          <label>
            Descanso Longo:
            <input
              type="text"
              value={inputLongRest}
              onChange={(e) => setInputLongRest(e.target.value)}
            />
          </label>
          <label>
            Quantidade de ciclos:
            <input
              type="text"
              value={inputNumberCicles}
              onChange={(e) => setInputNumberCicles(e.target.value)}
            />
          </label>
        </div>

        <div className="button">
          <input type="submit" value="Trocar" onClick={getNextInterval} />
        </div>

        <div className="info">
          <ul>
            <p>Ciclo de trabalho: {workTime} min</p>
            <p>Descanso curto: {shortRest} min</p>
            <p>Descanso longo: {longRest} min</p>
            <p>Número de ciclos: {numberCicles} </p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
