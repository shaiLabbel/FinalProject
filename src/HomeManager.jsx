import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';
import './CssFiles/HomeManager.css'
import './App.css'


export default function HomeManager() {

  const [sidur, setSidur] = useState([])

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
          },
          (error) => {
              console.log("err post=", error);
          });

  })


  return (

    <div >
      <Navbar />
      <div className='page' >
        <div className='left'>
          <div>סידור עבודה לתאריך {new Date().toLocaleDateString()}</div>
          {sidur.map((s,i)=> <div className='oneRow' style={{backgroundColor: i%2 ? "#fff":"#525252" }}>
            <p>{s.ContactName}</p>
            <p>{s?.Points[0]?.CollectionPoint}</p>
            <p>{s?.Points[0]?.CollectionTime} --{'>'} {s?.Points[1]?.CollectionTime}</p>
            <p>{s.driver}</p>
          </div>)}

        </div>
      </div>
    </div>



  )
}
