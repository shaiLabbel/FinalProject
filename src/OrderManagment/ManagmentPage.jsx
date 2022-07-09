import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar';
import '../CssFiles/OrderManagment.css';
import UpdateCard from './UpdateCard';

export default function ManagmentPage() {

    const [Updates, setUpdates] = useState([]);
    const apiUrl = 'https://proj.ruppin.ac.il/bgroup93/prod/api/OrderUpdates';

    const getAll = () => {
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
                    console.log("fetch get All Updates= ", result)
                    setUpdates(result);
                },
                (error) => {
                    console.log("err get all Updates =", error);
                });

    }
    useEffect(() => getAll(), []);
    let str = Updates.map((u,ind)=>(<UpdateCard key={ind} status={u.OrderStatus} statusNumber={'tag'+u.StatusNumber}
         date={u.Date} time={u.Time} orderDate={u.OrderDate} cName={u.ContactName} bid={u.Bid} uNumber={u.UpdateId} oNumber={u.OrderNumber}/>));
    return (
        <div>
            <Navbar />
            <div className='pageOM'>
                <h3 className='header'>מערכת ניהול ההזמנות</h3>
                <div className='row'>
                    <div className='col'>
                        <div className='cardM'>
                   {str}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

