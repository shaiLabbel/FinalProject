import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import '../CssFiles/OrderManagment.css';
import OrderCard from '../OrderCreation/OrderCard';
import { useLocation } from 'react-router-dom';
import * as Icon from 'react-icons/fi';
import * as Icon1 from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';


export default function PickDriver() {

    const [bid, setBid] = useState();
    const [alert, setAlert] = useState();
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();
    const { state } = useLocation();
    let order = state;

    const apiUrl = 'https://proj.ruppin.ac.il/bgroup93/prod/api/Orders/PutBidAndStatus/' + order.oNumber;
    const apiUrl2 = 'https://proj.ruppin.ac.il/bgroup93/prod/api/OrderUpdates';
    const apiUrl3 = 'https://proj.ruppin.ac.il/bgroup93/prod/api/OrderUpdates/' + order.uNumber;

    const btnSave = () => {

     
            let update = { OrderStatus: '4' };
            let insert = { OrderNumber: order.oNumber };
            UpdateOrderData(update);
            PostUpdate(insert);
            DeleteUpdate();
        
    }
    const PostUpdate = (insert) => {

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
    const UpdateOrderData = (update) => {

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
                        <div className='editAlert' style={{ marginTop: '10px' }}>
                          נהג נשמר בהצלחה עבור הזמנה זו
                            <br />
                            <button onClick={() => (navigate('/ManagmentPage'))} className='backButton'><Icon1.RiArrowGoBackLine /> חזור לדף ניהול ההזמנות</button>

                        </div>);




                },
                (error) => {
                    console.log("err put order=", error);

                });


    }
    const DeleteUpdate = () => {
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
    useEffect(() => {
        const apiUrl4 = 'https://proj.ruppin.ac.il/bgroup93/prod/api/Employees';
        fetch(apiUrl4, {
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
                    console.log("fetchgettEmployee= ", result);
                    setEmployees(result)
                },
                (error) => {
                    console.log("err get all employees=", error);
                });
    }, [])

    return (

        <div >
            <Navbar />
            <div className='orderPage' >
                <h3 className='header'>שבץ נהג לנסיעה</h3>
                <div className='row'>
                    <div className='col'>
                        <img className='imageBid' src='https://cdn-icons-png.flaticon.com/512/1039/1039356.png' />
                    </div>
                    <div className='col'>
                        <div style={{ marginLeft: '120px' }} className='card'>
                            <p style={{ margin: 0, fontSize: '30px', color: 'black' }} >  <Icon.FiInfo /> הזמנה מספר {order.oNumber}</p>
                            <p style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: 'black' }} > <Icon.FiUser />  <u>עבור:</u> {order.cName}</p>
                            <p style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: 'black' }} ><Icon.FiCalendar />  <u>תאריך:</u> {order.date.substring(0, 10)}</p>
<br/>
                            <div style={{ marginBottom: "13px" }}><select name="" id="">\
                                <option value=""> בחר נהג עבור הנסיעה</option>
                                {employees.map(e => <option value={e.FirstName + " " + e.LastName}>{e.FirstName + " " + e.LastName}</option>)}
                            </select></div>

<br/>
<br/>
<br/>
                            <button className='buttonBid' onClick={btnSave}>שמור נהג עבור הנסיעה</button>
                        </div>
                    </div>
                    <div className='col'>
                        <img className='imageBid2' src='https://cdn-icons-png.flaticon.com/512/1039/1039356.png' />
                    </div>
                </div>
                <div className='row'>
                    {alert}
                </div>

            </div>
        </div>



    )
}
