import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar';
import '../CssFiles/EmployeesPage.css'
import * as Icon from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import VehiclesShow from './VehiclesShow';


export default function VehiclesPage() {
    

    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className='pageEmp'>
                <h3 className='header'>רכבים </h3>
                <button onClick={() => { navigate('/VehiclesAdd') }} className='button'>  הוסף רכב
                    <Icon.RiCarLine style={{ fontSize: 22, color: 'white', marginLeft:'5px', marginBottom:'3px' }}
                    /> 
                   
                </button>
                <VehiclesShow/>
                

            </div>
        </div>
    )

}