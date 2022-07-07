import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import '../CssFiles/OrderCreation.css';

export default function ShowOrder() {
    const [order, setOrder]=useState();
    const [pickUps, setPickUps]= useState([]);
    const [pointsStr, setPointsStr]=useState();
    

    const { state } = useLocation();
    let orderNumber = state;
    const apiUrl = 'https://proj.ruppin.ac.il/bgroup93/prod/api/Orders/78';
    const apiUrl2 = 'https://proj.ruppin.ac.il/bgroup93/prod/api/PickUp/78' ;

const getOrderDetails = ()=>{

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
                console.log("fetch order by order number= ", result);
                setOrder(result);
        


              
            },
            (error) => {
                console.log("err get order by number=", error);
            });


}

const getPickUpsDetails =()=>{

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
                console.log("fetch pick up by order number= ", result);
                setPickUps(result);
               
              
            },
            (error) => {
                console.log("err get pickups order by number=", error);
            });
}
const pickUpsStr = () =>{

    let str = pickUps.map((point, i)=>(<h5 key={i}> נקודת עצירה {point.PickUpNumber}</h5>));
    setPointsStr(str);


}
 useEffect(() => getOrderDetails(), []);
 useEffect(() => getPickUpsDetails(), []);
return (


        <div>
            <Navbar />
            <div className='orderPage' >
                <h3 className='header'>הזמנה חדשה נוצרה במערכת</h3>
                <div className='card'>
                    <div className='container'>
                   
                     <h5></h5>
                    </div>
                </div>
            </div>
        </div>



    )
}
