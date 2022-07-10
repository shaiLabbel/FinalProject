import React, {useEffect} from 'react';
import Navbar from './Navbar';
import './CssFiles/HomeManager.css'
import './App.css'


export default function HomeManager() {

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
          },
          (error) => {
              console.log("err post=", error);
          });

  })


  const sidur =[ {
    place: "sosanim",
    from: {
      cityStart: "nbetanya",
      timeStart:"11",
      cityEnd: "haifa",
      timeEnd:"12"
    },
    to: {
      cityStart: "haifa",
      timeStart:"15",
      cityEnd: "netanya",
      timeEnd:"16"
    },
    driver: "yossi"
    
  },{
    place: "sosanim",
    from: {
      cityStart: "nbetanya",
      timeStart:"11",
      cityEnd: "haifa",
      timeEnd:"12"
    },
    to: {
      cityStart: "haifa",
      timeStart:"15",
      cityEnd: "netanya",
      timeEnd:"16"
    },
    driver: "yossi"
}]

  return (

    <div >
      <Navbar />
      <div className='page' >
        <div className='left'>
          <div>סידור עבודה לתאריך {new Date().toLocaleDateString()}</div>
          {sidur.map((s,i)=> <div style={{backgroundColor: i%2 ? "pink":"purple"}}>
            <p>{s.name}</p>
            <br />
            <p>{s.place}</p>
            <br />
            <p>{s.from.cityStart} - {s.from.timeStart} --> {s.from.cityEnd} - {s.from.timeEnd}</p>
            <br />
            <p>{s.driver}</p>
          </div>)}

        </div>
        <div className='right'>
          <div>
            עדכונים מה24 שעות
          </div>
          <div style={{display:"flex", justifyContent:"space-around"}}>
            <div style={{marginRight: "5px"}}>
              סגירת הזמנה 
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}
