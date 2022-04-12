import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar';
import EmployeesShow from './EmployeesShow';
import '../CssFiles/EmployeesPage.css'
import * as Icon from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


export default function EmployeesPage() {

    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className='pageEmp'>

                <h3 className='header'>עובדי המערכת </h3>
                <button onClick={() => { navigate('/AddEmployee') }} className='button'>  הוסף עובד
                    <Icon.BsPersonPlus style={{ fontSize: 22, color: 'white', marginLeft:'5px', marginBottom:'3px' }}
                    /> 
                </button>
                <EmployeesShow />

            </div>
        </div>
    )

}

