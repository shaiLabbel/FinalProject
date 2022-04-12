import React from 'react';
import Navbar from './Navbar';
import WorkSchedule from './HomeManagerPage/WorkSchedule'
import './CssFiles/HomeManager.css'
import './App.css'
import Transportation from './HomeManagerPage/Transportation';

export default function HomeManager() {
  return (

    <div >
      <Navbar />
      <div className='page' >
        <WorkSchedule/>
        <Transportation/>
      </div>
    </div>



  )
}
