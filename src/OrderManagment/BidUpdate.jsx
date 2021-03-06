import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import '../CssFiles/OrderManagment.css';
import OrderCard from '../OrderCreation/OrderCard';
import { useLocation } from 'react-router-dom';
import * as Icon from 'react-icons/fi';
import * as Icon1 from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';


export default function BidUpdate() {

    const [bid, setBid] = useState();
    const [alert, setAlert] = useState();
    const [isAlert, setIsAlert] = useState('false');
    const navigate = useNavigate();
    const { state } = useLocation();
    let order = state;

    const apiUrl = 'https://proj.ruppin.ac.il/bgroup93/prod/api/Orders/PutBidAndStatus/' + order.oNumber;
    const apiUrl2 = 'https://proj.ruppin.ac.il/bgroup93/prod/api/OrderUpdates';
    const apiUrl3 = 'https://proj.ruppin.ac.il/bgroup93/prod/api/OrderUpdates/'+ order.uNumber;

    const btnSave = () => {

        if (bid.match(/^[0-9]+$/) === null) {
            let alertShow = <div style={{ fontSize: '17px', marginTop: '10px', backgroundColor: 'red', color: 'white', direction: 'rtl', borderRadius: '5mm', width: '400px' }}>
                <h3> <Icon.FiAlertTriangle style={{ fontSize: '25px', margin: '5px' }} /> שגיאה </h3>

                הצעת מחיר יכולה לכלול מספרים בלבד.
            </div>;
            setAlert(alertShow);
            setIsAlert('true');
          
        }
        else{
            let update = {Bid:bid, OrderStatus:'2'};
            let insert={OrderNumber:order.oNumber};
            UpdateOrderData(update);
            PostUpdate(insert);
            DeleteUpdate();
        }
    }
    const PostUpdate = (insert) =>{

        fetch(apiUrl2, {
            method: 'POST',
            body: JSON.stringify(insert),
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
                    console.log("fetch POST order update= ", result);
      
                },
                (error) => {
                    console.log("err Post order update=", error);
                });
      
      

    }
    const UpdateOrderData = (update) =>{

        fetch(apiUrl, {
            method: 'PUT',
            body: JSON.stringify(update),
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
                    console.log("fetch Put order= ", result);
                    setAlert(
                    <div className='editAlert' style={{marginTop: '10px'}}>
                    הצעת המחיר עודכנה בהצלחה עבור הזמנה זו
                    <br/>
                    <button onClick={()=>(navigate('/ManagmentPage'))} className='backButton'><Icon1.RiArrowGoBackLine/> חזור לדף ניהול ההזמנות</button>

                    </div>);




                },
                (error) => {
                    console.log("err put order=", error);
                   
                });


    }
    const DeleteUpdate = ()=>{
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


                },
                (error) => {
                    console.log("err Delete order update=", error);
                });
    }
    const checkAlert = () => {

        if (isAlert === 'true') {

            setAlert('');
            setIsAlert('false');
        }
    }

    return (

        <div >
            <Navbar />
            <div className='orderPage' >
                <h3 className='header'>ערוך הצעת מחיר</h3>
                <div className='row'>
                    <div className='col'>
                        <img className='imageBid' src='https://cdn-icons-png.flaticon.com/512/1573/1573420.png' />
                    </div>
                    <div className='col'>
                        <div style={{ marginLeft: '120px' }} className='card'>
                            <p style={{ margin: 0, fontSize: '30px', color: 'black' }} >  <Icon.FiInfo /> הזמנה מספר {order.oNumber}</p>
                            <p style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: 'black' }} > <Icon.FiUser />  <u>עבור:</u> {order.cName}</p>
                            <p style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: 'black' }} ><Icon.FiCalendar />  <u>תאריך:</u> {order.date.substring(0, 10)}</p>
                            <br />
                            <p style={{ margin: 0, fontSize: '30px', color: 'black' }} > הקלד את הצעת המחיר שנשלחה ללקוח</p>
                            <input className='txtInput' type='text' onClick={checkAlert} onChange={(e) => setBid(e.target.value)}></input>

                            <button className='buttonBid' onClick={btnSave}> שמור הצעת מחיר </button>
                        </div>
                    </div>
                    <div className='col'>
                        <img className='imageBid2' src='https://cdn-icons-png.flaticon.com/512/1573/1573420.png' />
                    </div>
                </div>
                <div className='row'>
                    {alert}
                </div>

            </div>
        </div>



    )
}
