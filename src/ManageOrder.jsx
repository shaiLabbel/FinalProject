import React from "react";
import './CssFiles/HomeManager.css'

export default function ManageOrder() {

  const headers = {
    customer: "לקוח",
    date: "תאריך",
    exitHour: "שעת יציאה",
    from:"מוצא",
    to:"יעד",
    timeArriveHour:"שעת הגעה ליעד",
    price:"מחיר",
    notes: "הערות"
  }
  return <div className="page">
    <form dir="rtl" className="bla">
      {Object.keys(headers).map((header)=> 
        <div>
          <label htmlFor={header}>{headers[header]}</label>
          <input type="text" id={header} />
        </div>
      )}
      <button type="submit">עדכן שינויים</button>
    </form>
  </div>
}