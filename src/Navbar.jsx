import React from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-icons/fa';
import './CssFiles/Navbar.css';
import { Button } from 'bootstrap';

export default function Navbar() {
  return (
    
    <div>
        <nav className='navbar'>
            <Link to='/HomeManager' className='navbar-logo'>
            <Icon.FaBusAlt style={{margin:5}}/>
               דף הבית 
            </Link >
            <Link to='' className='navbar-logo'>
               התראות
            </Link>
            <Link to='' className='navbar-logo'>
               סידור עבודה
            </Link>
            <Link to='' className='navbar-logo'>
               לקוחות
            </Link>
            <Link to='/EmployeesPage' className='navbar-logo'>
               נהגים
            </Link>
            <Link to='/VehiclesPage' className='navbar-logo'>
               רכבים
            </Link>
            <Link to='/OrderCreation' className='navbar-logo'>
               הזמנה חדשה
            </Link>
            
        </nav>
        
    </div>
  )
}
