import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import '../CssFiles/OrderCreation.css';
import OrderCard from './OrderCard';
import PointsCard from './PointsCard';

export default function ShowOrder() {
    const [order, setOrder] = useState("");
    const [pickUps, setPickUps] = useState([]);
    const [pointsCard, setCard] = useState("");
    const [button, setButton] = useState("");


    const { state } = useLocation();
    let orderNumber = state;
    const apiUrl = 'https://proj.ruppin.ac.il/bgroup93/prod/api/Orders/' + orderNumber;
    const apiUrl2 = 'https://proj.ruppin.ac.il/bgroup93/prod/api/PickUp/'+ orderNumber;

    const getOrderDetails = () => {

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

    const getPickUpsDetails = () => {

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

    const ShowPoints = () => {
        let strCard = pickUps.map((p, ind) => (<PointsCard key={ind} num={p.PickUpNumber} cPoint={p.CollectionPoint} cTime={p.CollectionTime} des={p.Destination} />));
        setCard(strCard);

        let button = <button className='buttonClose' onClick={Close} >סגור</button>
        setButton(button);
    }
const Close = ()=>{
    setCard("");
    setButton("");
}
    let strCard = <OrderCard order={order.OrderNumber} cNumber={order.ContactNumber}
        cName={order.ContactName} date={order.Date} type={order.Type} passengers={order.Passengers} length={pickUps.length} />;




    useEffect(() => getOrderDetails(), []);
    useEffect(() => getPickUpsDetails(), []);

    return (
        <div>
            <Navbar />
            <div className='orderPage' >
                <h3 className='header'>הזמנה חדשה נוצרה במערכת</h3>
                <div className='row'>
                    <div className='col'>
                        <img className='imageBig2' src='https://cdn-icons-png.flaticon.com/512/543/543885.png' />
                    </div>
                    <div className='col'>
                        <div style={{ marginLeft: '120px' }} className='card'>
                            <div className='container'>
                                {strCard}
                                <br />
                                <button className='buttonView' onClick={ShowPoints}> צפה בפירוט נקודות הנסיעה</button>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <img className='imageBig' src='https://cdn-icons-png.flaticon.com/512/543/543885.png' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        {pointsCard}
                        {button}
                    </div>

                </div>
            </div>

        </div>



    )
}
