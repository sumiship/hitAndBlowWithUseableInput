import "./LogTable.css";

type Props = {
  numbersLog: number[][];
};

const LogTable: React.FC<Props> = ({ numbersLog }) => {
  return (
    <div className="log-table">
      <div className="log-header">
        <div className="log-numbers">Number</div>
        <div className="log-hit">Hit</div>
        <div className="log-blow">Blow</div>
      </div>
      <div className="log-data">
        {numbersLog.map((numbers, i) => (
          <div className="log-row" key={"log-row" + i}>
            <div className="log-numbers">{numbers.slice(0, 4).join(" ")}</div>
            <div className="log-hit">{numbers[4]}</div>
            <div className="log-blow">{numbers[5]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogTable;
