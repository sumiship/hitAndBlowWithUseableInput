import { useEffect, useState } from "react";
import Input from "./Input";
import LogTable from "./LogTable";
import "./App.css";

function App() {
  const NUMBER_LENGTH = 4;

  const [answerNumbers, setAnswerNumbers] = useState<number[]>([]);
  const [inputtedNumbersLog, setInputtedNumbersLog] = useState<number[][]>([]);
  const [isEnd, setIsEnd] = useState(false);

  const setRandomAnswerNumbers = () => {
    const answerNumbers = [...Array(10)].reduce((acc, _, i) => {
      acc.splice(Math.floor(Math.random() * i), 0, i);
      return acc;
    }, []);
    setAnswerNumbers(answerNumbers.slice(0, 4));
  };

  const submit = (numberList: number[]) => {
    const hitCount = [...Array(NUMBER_LENGTH)].reduce((acc, _, i) => acc + (numberList[i] === answerNumbers[i] ? 1 : 0), 0);
    const blowCount = numberList.reduce((acc, v) => acc + (answerNumbers.includes(v) ? 1 : 0), 0) - hitCount;
    setInputtedNumbersLog([...inputtedNumbersLog, [...numberList, hitCount, blowCount]]);
    if (hitCount === NUMBER_LENGTH || inputtedNumbersLog.length >= 5) setIsEnd(true);
  };

  const restart = () => {
    setRandomAnswerNumbers();
    setInputtedNumbersLog([]);
    setIsEnd(false);
  };

  useEffect(() => {
    setRandomAnswerNumbers();
  }, []);

  return (
    <div className="main">
      <div className="answer-container">
        {answerNumbers.map((number, i) => (
          <div className="answer" key={"answer" + i}>
            {isEnd ? number : ""}
          </div>
        ))}
      </div>
      <div className="log-table-container">
        <LogTable numbersLog={inputtedNumbersLog} />
      </div>
      {isEnd ? (
        <div className="restart-button" onClick={restart}>
          RESTART
        </div>
      ) : (
        <Input numberLength={NUMBER_LENGTH} onSubmit={submit} />
      )}
    </div>
  );
}

export default App;
