import React, { useEffect, useState } from "react";
import NewRow from "./NewRow";

function ResultTable(props) {
  //fetch API
  const apiKey = "caeoijqad3i9ra0rcbpg";
  const url = `https://finnhub.io/api/v1/quote?symbol=${props.symbols}&token=${apiKey}`;

  const [openPrice, setOpenPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const [lowPrice, setLowPrice] = useState("");
  const [closePrice, setClosePrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [isFinishedFetching, setIsFinishedFetching] = useState(false)
  const [currentDate1, setCurrentDate1] = useState({});

  
  const totalTime = props.minutes * 60000 + props.seconds * 1000;
  

  //need to work on the daley
  useEffect(()=>{
    setTimeout(()=>{
      fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setOpenPrice(data.o);
        setHighPrice(data.h);
        setLowPrice(data.l);
        setClosePrice(data.pc);
        setCurrentPrice(data.c);
        console.log(props.symbols)
        console.log(data)
      })
      .catch((error) => console.log(error));
      setIsFinishedFetching(true);
      let d1 = new Date();
      setCurrentDate1(d1)
    }, totalTime)
    
  },[])
  
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Open Price</th>
          <th>High Price</th>
          <th>Low Price</th>
          <th>Current Price</th>
          <th>Privious Close Price</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${props.openPrice}</td>
          <td>${props.highPrice}</td>
          <td>${props.lowPrice}</td>
          <td>${props.currentPrice}</td>
          <td>${props.closePrice}</td>
          <td>
            {props.currentDate.toLocaleString()}
          </td>
        </tr>
        {isFinishedFetching === true ? (
          <NewRow
            openPrice={openPrice}
            highPrice={highPrice}
            lowPrice={lowPrice}
            currentPrice={currentPrice}
            closePrice={closePrice}
            currentDate={currentDate1}
          />
        ) : null}
      </tbody>
    </table>
  );
}

export default ResultTable;
