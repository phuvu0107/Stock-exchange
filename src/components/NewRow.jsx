import React, { useState } from "react";
function NewRow(props) {
  return (
    <tr>
      <td>${props.openPrice}</td>
      <td>${props.highPrice}</td>
      <td>${props.lowPrice}</td>
      <td>${props.currentPrice}</td>
      <td>${props.closePrice}</td>
      <td>
        {props.currentDate}
      </td>
    </tr>
  );
}

export default NewRow
