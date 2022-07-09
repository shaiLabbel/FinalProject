import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar';
import '../CssFiles/OrderManagment.css';


export default function SchedulePage() {
const[orders, setOrders]=useState();
const[employees, setEmployees]=useState();
    const apiUrl = 'https://proj.ruppin.ac.il/bgroup93/prod/api/Orders/GetFilterOrders';
    const apiUrl2 = 'https://proj.ruppin.ac.il/bgroup93/prod/api/Employees';
    

    const getAllOrders = () => {
        fetch(apiUrl, {
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
                    console.log("fetch get All filter orders= ", result)
                   setOrders(result);
                },
                (error) => {
                    console.log("err get all filter orders =", error);
                });

    }
    const getAllEmployees = () => {
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
                    console.log("fetch get All Employees= ", result)
                   setEmployees(result);
                },
                (error) => {
                    console.log("err get all Employees =", error);
                });

    }

    useEffect(() => getAllOrders(), []);
    useEffect(() => getAllEmployees(), []);
    return (
        <div>
            <Navbar />
            <div className='pageOM'>
                <h3 className='header'>סידור עבודה</h3>

            </div>
        </div>
    )

}
