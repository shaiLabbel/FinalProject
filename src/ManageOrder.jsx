import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './CssFiles/HomeManager.css'

export default function ManageOrder(props) {

  const headers = {
    cName: "לקוח",
    date: "תאריך",
    exitHour: "שעת יציאה",
    from:"מוצא",
    to:"יעד",
    timeArriveHour:"שעת הגעה ליעד",
    price:"מחיר",
  }
  const location = useLocation();
  console.log(location);
  const [inputs, setInputs] = useState(location.state || [])
  return <div className="page">
    <form dir="rtl" className="ManageOrderForm">
      {Object.keys(headers).map((header)=> 
        <div>
          <label htmlFor={header}>{headers[header]}</label>
          <input type="text" id={header} value={inputs[header]} onChange={e => setInputs({...inputs,[e.target.id]: e.target.value})} />
         
        </div>
      )}
      <button type="submit">עדכן שינויים</button>
    </form>
  </div>
}