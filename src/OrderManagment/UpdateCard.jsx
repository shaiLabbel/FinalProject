import { React, useState, useEffect } from 'react';
import OrderManagment from '../CssFiles/OrderManagment.css';
import * as Icon from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function UpdateCard(props) {

    console.log(props);
    const[btnStr, setBtnStr]=useState('א');
    const apiUrl3 = 'https://proj.ruppin.ac.il/bgroup93/prod/api/OrderUpdates/' + props.uNumber;
 
    const navigate = useNavigate();

console.log(btnStr);
    const editFunc = () => {

        if (props.status === "ממתין להצעת מחיר") {
            navigate('/BidUpdate', { state: props });
        }
        else if (props.status === "ממתין לאישור מחיר") {
            navigate('/BidConfirm', { state: props });
        }
        else if (props.status === "ממתין לשיבוץ נהג") {
            navigate('/PickDriver', { state: props });
        }
        else if (props.status === "ההזמנה מוכנה") {
            let i=  {
                oNumber:props.oNumber,
                uNumber:props.uNumber

            }
            navigate('/OrderReady', { state: i});
        }
        else if (props.status === "ההזמנה הושלמה") {
Delete();
        }

    }

    const Delete = ()=>{
        fetch(apiUrl3, {
            method: 'DELETE',
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
                    console.log("fetch Delete order update= ", result);
                    props.finish();


                },
                (error) => {
                    console.log("err Delete order update=", error);
                });

    }
    const btn = () =>{
        if (props.statusNumber === 'tag4') {
            setBtnStr(' צפה בפרטי ההזמנה או עדכן סטטוס');
        }
        else if(props.statusNumber=='tag5'){
            setBtnStr('מחק את ההזמנה ממערכת ההזמנות');
        }
        else  {
            setBtnStr('עדכן');
        }
    }
    useEffect(() => btn(), []);
    return (
        <div className='row'>
            <div className='cardU'>
                <div style={{ backgroundColor: 'gray', borderRadius: '20px', marginTop: '5px' }} className='row'>
                    <span>{props.date.substring(0, 10)} {props.time.substring(0, 5)} </span>
                </div>
                <div className='row'>
                    <div style={{ marginTop: '3px', textAlign: 'right' }} className='col'>
                        <button className={props.statusNumber}> {props.status}</button>
                        <span style={{ fontWeight: 'normal' }}> הזמנה מספר:{props.oNumber}, עבור הלקוח: {props.cName}, בתאריך {props.orderDate.substring(0, 10)} </span>
                        <button className='edit' onClick={editFunc}>{btnStr}</button>
                    </div>


                </div>

            </div>
        </div>
    )
}
