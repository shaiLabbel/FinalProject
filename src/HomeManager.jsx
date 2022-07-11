import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './CssFiles/HomeManager.css'
import './App.css';
import { useNavigate } from 'react-router-dom';

export default function HomeManager() {

  const navigate = useNavigate();

  return (

    <div >
      <Navbar />
      <div className='pageM' >
        <div className='container'>
          <div className='row'>
        
            <div className='col'>
        
              <img className='imageO' src='https://cdn-icons-png.flaticon.com/512/5261/5261866.png' onClick={()=>{navigate('/ManagmentPage')}} />
            </div>

            <div className='col'>
        
              <img className='imageD' src='https://cdn-icons-png.flaticon.com/512/305/305982.png' onClick={()=>{navigate('/EmployeesPage')}} />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <h3 className='header'>ברוך הבא</h3>
              <h1 className='header'>לנוף הסעות</h1>
            </div>

          </div>
          <div className='row'>
            <div className='col'>
          
              <img className='imageV' src='https://cdn-icons-png.flaticon.com/512/568/568158.png' onClick={()=>{navigate('/VehiclesPage')}} />
            </div>
            <div className='col'>
        
              <img className='imageI' src='https://cdn-icons-png.flaticon.com/512/747/747050.png' onClick={()=>{navigate('/OrderCreation')}}/>
            </div>
          </div>
        </div>

      </div>
    </div>



  )
}
