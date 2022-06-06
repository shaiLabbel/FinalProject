import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import '../CssFiles/OrderCreation.css';
import * as Icon from 'react-icons/fa';
import * as Icon2 from 'react-icons/ai';
import * as Icon3 from 'react-icons/bs';
import * as Icon4 from 'react-icons/fi';
import Pickup from './Pickup';

export default function OrderCreation() {

    const navigate = useNavigate();
    const [type, setType] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [passengers, setPassengers] = useState('');
    const [date, setDate] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [alert, setAlert] = useState('');
    const [isAlert,setIsAlert]=useState('false');
    const apiUrl = 'https://localhost:44388/api/Orders';

    const btnSelect = (e) => {
        setType(e.target.value);
        console.log(type);
    }

    const btnSave = () => {
        if (type !== '' && contactName !== '' && contactNumber !== '' && passengers !== '' && date !== '') {
            let order = {
                ContactName: contactName,
                ContactNumber: contactNumber,
                Date: date,
                Passengers: passengers,
                Type: type,
                OrderStatus: '1'
            }

            postData(order);
        }
        else {
            let alertShow = <div style={{ fontSize: '17px', marginTop: '10px', backgroundColor: 'red', color: 'white', direction: 'rtl', borderRadius: '5mm', width: '400px' }}>
                <h3> <Icon4.FiAlertTriangle style={{ fontSize: '25px', margin: '5px' }} /> שגיאה </h3>
                יש להזין את כל פרטי ההזמנה לפני מעבר לשלב הבא.
            </div>;
            setAlert(alertShow);
            setIsAlert('true');
        }


    }
    const postData = (order) => {
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('res=', res);
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch POST order= ", result);
                    setOrderNumber(result.OrderNumber);
                    navigate('/PickUp', { state: result.OrderNumber });
                },
                (error) => {
                    console.log("err post order=", error);
                });

    }
   const checkAlert=()=>{
   
    if(isAlert==='true')
    {

        setAlert('');
        setIsAlert('false');
    }
   }
const txtChgCoNumber=(e)=>{

    let num=e.target.value;
    
}
    return (


        <div >
            <Navbar />
            <div className='orderPage' >
                <h3 className='header'> יצירת הזמנה חדש</h3>
                <div className='card'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <br />
                                <h4 className='step'>שלב 1: ערוך את פרטי ההזמנה</h4>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col' style={{ marginRight: '15px' }}>
                                <br />
                                <Icon.FaAsterisk className='ast' />
                                בחר את סוג הנסיעה:
                                <div class="btn-group" role="group" aria-label="Basic example ">
                                    <button onClick={btnSelect} style={{ marginRight: '10px', borderRadius: '10px', margin: '2px', fontSize: '12px', height: '28px' }} value='כיוון אחד' type="button" class="btn btn-secondary" checked>כיוון אחד</button>
                                    <button onClick={btnSelect} style={{ borderRadius: '10px', margin: '2px', fontSize: '12px', height: '28px' }} value='הלוך חזור' type="button" class="btn btn-secondary">הלוך חזור</button>

                                </div>

                            </div>
                            <div className='row'>
                                <p style={{ margin: '10px' }}>{type}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>

                                <Icon.FaAsterisk className='ast' />
                                שם איש קשר:
                                <input className='txt' type='text' onClick={checkAlert}onChange={(e) => setContactName(e.target.value)}></input>
                                <Icon2.AiOutlineUser style={{ margin: '5px', fontSize: '16px' }} />
                            </div>
                            <div className='col' style={{ marginTop: '10px', marginRight: '12px' }}>

                                <Icon.FaAsterisk className='ast' />
                                טלפון איש קשר:
                                <input className='txt' type='text' onClick={checkAlert} onChange={(e) => setContactNumber(e.target.value)}></input>
                                <Icon2.AiOutlinePhone style={{ margin: '5px', fontSize: '16px' }} />
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col' style={{ marginTop: '10px', marginLeft: '40px' }} >
                                <Icon.FaAsterisk className='ast' />
                                תאריך:
                                <input className='txt' type='text' placeholder='00/00/0000' onClick={checkAlert} onChange={(e) => setDate(e.target.value)}></input>
                                <Icon2.AiOutlineCalendar style={{ margin: '5px', fontSize: '16px' }} />

                            </div>
                            <div className='col' style={{ marginLeft: '124px', marginTop: '10px' }}>
                                <Icon.FaAsterisk className='ast' />
                                מספר נוסעים:
                                <input style={{ width: '40px' }} className='txt' type='text' placeholder='0' onClick={checkAlert} onChange={(e) => setPassengers(e.target.value)}></input>
                                <Icon3.BsPeople style={{ margin: '5px', fontSize: '16px' }} />
                            </div>

                        </div>
                        <br />
                    </div>
                </div>
                <div className='row'>
                    <button style={{ marginRight: '0px' }} className='done' onClick={btnSave}>
                        שמירה ומעבר לשלב הבא</button>
                </div>
                <div className='row'>
                    {alert}
                </div>
            </div>
        </div>



    )
}
