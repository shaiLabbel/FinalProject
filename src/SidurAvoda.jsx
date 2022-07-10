import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import './CssFiles/HomeManager.css'

export default function ManageOrder(props) {
  const [sidur, setSidur] = useState([])
  const [orderNums, setOrderNums] = useState([])
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const apiUrl2 = 'https://proj.ruppin.ac.il/bgroup93/prod/api/Employees';
    fetch(apiUrl2, {
      method: 'GET',
      headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
      })
  })
      .then(res => {
          console.log('res=', res);
          console.log('res.status', res.status);
          console.log('res.ok', res.ok);
          return res.json()
      })
      .then(
          (result) => {
              console.log("fetchgettEmployee= ", result);
              setEmployees(result)
          },
          (error) => {
              console.log("err post=", error);
          });
  },[])
  useEffect(() => {
    fetch("https://proj.ruppin.ac.il/bgroup93/prod/api/Orders", {
      method: 'GET',
      headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
      })
  })
      .then(res => {
          console.log('res=', res);
          console.log('res.status', res.status);
          console.log('res.ok', res.ok);
          return res.json()
      })
      .then(
          (result) => {
              console.log("fetchgettEmployee= ", result);
              setSidur(result)
              setOrderNums(result.map(a => a.OrderNumber))
          },
          (error) => {
              console.log("err post=", error);
          });

  },[])

  return <div dir="ltr" className="page sidurAvodaPage">
    <div>
    <div style={{display:"flex", flexDirection:"column"}}>
      <div>הזמנות שלא שובצו</div>
      {sidur.map(s => <div>
        {s.ContactName}
      </div>)}
    </div>
    <div>  
    <div style={{marginBottom:"13px"}}><select name="" id="">
    <option value=""></option>
    {orderNums.map(a =><option value={a}>{a}</option>)}
    </select>
        
      
    </div>
    <div style={{marginBottom:"13px"}}><select name="" id="">\
        <option value=""></option>
        {employees.map(e => <option value={e.FirstName + " " + e.LastName}>{e.FirstName + " " + e.LastName}</option> )}
    </select></div>

      <button>שבץ נסיעה</button>
    </div>
    </div>
    <div dir="rtl" className="sidurAvodaTable">
        <div className="header">
          <div className="he1">ראשון</div>
          <div className="he2">שני</div>
          <div className="he3">שלישי</div>
          <div className="he4">רביעי</div>
          <div className="he5">חמישי</div>
          <div className="he6">שישי</div>
          <div className="he7">שבת</div>
        </div>
        <div className="body">
          <div className="b1">1</div>
          <div className="b2">2</div>
          <div className="b3">3</div>
          <div className="b4">4</div>
          <div className="b5">5</div>
          <div className="b6">6</div>
          <div className="b7">7</div>
        </div>
</div>
  </div>
}