import React, { RefObject, useState } from "react";
import "./input.css";

type Props = {
  numberLength: number;
  onSubmit: (e: number[]) => void;
};

const NumberInput: React.FC<Props> = ({ numberLength, onSubmit }) => {
  const [focusingInputIndex, setFocusingInputIndex] = useState(0);
  const [inputtedNumbers, setInputtedNumbers] = useState<(number | null)[]>(Array(numberLength).fill(null));
  const setInputtedNumbersByIndex = (value: null | number, index: number) => {
    setInputtedNumbers([...inputtedNumbers.slice(0, index), value, ...inputtedNumbers.slice(index + 1)]);
  };

  const controlFocus = (index: number) => {
    inputRef[index].current?.focus();
    setFocusingInputIndex(index);
  };

  const managementInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key >= "0" && event.key <= "9") {
      setInputtedNumbersByIndex(Number(event.key), focusingInputIndex);
      if (focusingInputIndex < numberLength - 1 && inputtedNumbers[focusingInputIndex + 1] == null) controlFocus(focusingInputIndex + 1);
      return;
    }
    if (event.key === "Backspace") {
      setInputtedNumbersByIndex(null, focusingInputIndex);
      if (focusingInputIndex > 0 && inputtedNumbers[focusingInputIndex - 1] !== null) controlFocus(focusingInputIndex - 1);
      return;
    }
    if (event.key === "Enter") {
      submit();
      return;
    }

    const nextFocusingInputIndex = event.key === "ArrowRight" ? Math.min(focusingInputIndex + 1, numberLength - 1) : event.key === "ArrowLeft" ? Math.max(focusingInputIndex - 1, 0) : focusingInputIndex;
    controlFocus(nextFocusingInputIndex);
  };
  const nullCheckFilter = <T,>(n: T | null): n is T => {
    return n !== null;
  };

  const isCollectInput = (numbers: (number | null)[]): numbers is number[] => {
    if (!numbers.every(nullCheckFilter)) return false;
    if (new Set(numbers).size < 4) return false;
    return true;
  };

  const submit = () => {
    if (!isCollectInput(inputtedNumbers)) return;
    onSubmit(inputtedNumbers);
    setInputtedNumbers(Array(numberLength).fill(null));
    controlFocus(0);
  };

  const inputRef: RefObject<HTMLInputElement>[] = [];
  inputtedNumbers.forEach((_, i) => (inputRef[i] = React.createRef<HTMLInputElement>()));
  return (
    <>
      <div className="input-container">
        {inputtedNumbers.map((number, i) => (
          <input className="input" key={"input" + i} id={"input" + i} type="text" value={number ?? ""} autoFocus={i === 0} onKeyDown={managementInput} onClick={() => setFocusingInputIndex(i)} ref={inputRef[i]} readOnly />
        ))}
      </div>
      <div className={"submit-button" + (isCollectInput(inputtedNumbers) ? "" : " disabled")} onClick={submit}>
        submit
      </div>
    </>
  );
};

export default NumberInput;
