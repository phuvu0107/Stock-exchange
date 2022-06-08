import React, { useEffect, useState } from "react";
import NewRow from "./NewRow";

function ResultTable(props) {
  //fetch API
  const apiKey = "cag26fqad3i28b9p2jt0";
  const url = `https://finnhub.io/api/v1/quote?symbol=${props.symbols}&token=${apiKey}`;

  const [flag, updateFlag] = useState(true);
  const [data, setData] = useState([
    {
      key: 1,
      openPrice: 0,
      highPrice: 0,
      lowPrice: 0,
      closePrice: 0,
      currentPrice: 0,
      currentDate: "",
    }])
  
  const totalTime = props.minutes * 60000 + props.seconds * 1000;

  
  // function handleData(){
  //   console.log("hello")
  //   useEffect(()=>{
  //     fetch(url)
  //     .then((response) => response.json())
  //     .then((d) => {
  //       const date = new Date()
  //       const time = date.toLocaleString();
  //       const updateData =[
  //         ...data,
  //         {
  //           key: data.length + 1,
  //           openPrice: d.o,
  //           highPrice: d.h,
  //           lowPrice: d.l,
  //           closePrice: d.pc,
  //           currentPrice: d.c,
  //           currentDate: time,
  //         }
  //       ]

  //       setData(updateData);
  //     })
  //     .catch((error) => console.log(error));
  //   }, [])
    
  // }
  useEffect(()=>{
    const abortController = new AbortController();
    fetch(url)
    .then((response) => response.json())
    .then((d) => {
      const date = new Date()
      const time = date.toLocaleString();
      const updateData =[
        ...data,
        {
          key: data.length + 1,
          openPrice: d.o,
          highPrice: d.h,
          lowPrice: d.l,
          closePrice: d.pc,
          currentPrice: d.c,
          currentDate: time,
        }
      ]
      console.log(data);
      setData(updateData);
    })
    .catch((error) => console.log(error));
    return () => {
      // this will cancel the fetch request when the effect is unmounted
      abortController.abort();
    }
  }, [flag])

  const rows = data.slice(1).map((item)=>{
    return (
      <NewRow
        key={item.key}
        openPrice={item.openPrice}
        highPrice={item.highPrice}
        lowPrice={item.lowPrice}
        currentPrice={item.currentPrice}
        closePrice={item.closePrice}
        currentDate={item.currentDate}
      />
    )
  })

  setInterval(()=>{
    updateFlag(!flag)
  }, totalTime)
  
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
        {rows}
      </tbody>
    </table>
  );
}

export default ResultTable;
