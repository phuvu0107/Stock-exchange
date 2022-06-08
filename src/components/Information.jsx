import React, { useState, useEffect } from "react";
import ResultTable from "./ResultTable";

function Information() {
  const [minutes, updateMinute] = useState("");
  const [seconds, updateSeconds] = useState("");
  const [symbols, updateSymbols] = useState("");
  const [isSubmitted, updateSubmit] = useState(false);
  const [currentDate, setCurrentDate] = useState({});
  const [openPrice, setOpenPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [closePrice, setClosePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  const apiKey = "caeoijqad3i9ra0rcbpg";
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbols}&token=${apiKey}`;

  const d = new Date();

  function handlingMinute(event) {
    updateMinute(event.target.value);
  }

  function handlingSeconds(event) {
    updateSeconds(event.target.value);
  }

  function handlingSymbol(event) {
    updateSymbols(event.target.value);
  }

  function handlingSubmit(event) {
    event.preventDefault();
    updateSubmit(true);
    setCurrentDate(d)
  }

  return (
    <div>
      <form className="input-div" onSubmit={handlingSubmit}>
        <input
          type="number"
          placeholder="MIN"
          onChange={handlingMinute}
          value={minutes}
        />
        <input
          type="number"
          placeholder="SEC"
          onChange={handlingSeconds}
          value={seconds}
        />
        <input
          type="text"
          placeholder="SYMBOL"
          onChange={handlingSymbol}
          value={symbols}
        />
        <button type="submit">SUBMIT</button>
      </form>
      {isSubmitted && (
        <div>
          <ResultTable
            symbols={symbols}
            minutes={minutes}
            seconds={seconds}
            currentDate={currentDate}
          />
        </div>
      )}
    </div>
  );
}

export default Information;
