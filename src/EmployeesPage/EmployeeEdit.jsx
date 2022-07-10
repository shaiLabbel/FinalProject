import { React, useState } from 'react';
import Navbar from '../Navbar';
import EmployeeCard from './EmployeeCard';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as Icon from 'react-icons/fi';
import * as Icon1 from 'react-icons/ri'

export default function EmployeeEdit() {
    const navigate = useNavigate();
    const { state } = useLocation();
    let userObj = state;
    const apiUrl = 'https://proj.ruppin.ac.il/bgroup93/prod/api/Employees/' + userObj.num
    const [alertMessage, setAlertMessage] = useState("");
    const [num, setNum] = useState(userObj.num);
    const [firstName, setFirstName] = useState(userObj.firstName);
    const [lastName, setLastName] = useState(userObj.lastName);
    const [id, setId] = useState(userObj.id);
    const [mail, setMail] = useState(userObj.mail);
    const [phone, setPhone] = useState(userObj.phone);
    const [date, setDate] = useState(userObj.date);
    const [img, setImg] = useState(userObj.img);
    const [card, setCard] = useState(<EmployeeCard id={userObj.id} num={userObj.num} firstName={userObj.firstName} lastName={userObj.lastName} phone={userObj.phone} mail={userObj.mail} date={userObj.date} img={userObj.img}  />);
    const [alert, setAlert] = useState('');
    const [isAlert, setIsAlert] = useState('false');


    const txtchgName = (e) => { setFirstName(e.target.value) };
    const txtchgLast = (e) => { setLastName(e.target.value) };
    const txtchgId = (e) => { setId(e.target.value) };
    const txtchgMail = (e) => { setMail(e.target.value) };
    const txtchgPhone = (e) => { setPhone(e.target.value) }
    const txtchgDate = (e) => { setDate(e.target.value) };


    const MakeMessage = (m) => {
        let alertShow = <div style={{ fontSize: '17px', marginTop: '10px', backgroundColor: 'red', color: 'white', direction: 'rtl', borderRadius: '5mm', width: '400px' }}>
            <h3> <Icon.FiAlertTriangle style={{ fontSize: '25px', margin: '5px' }} /> שגיאה </h3>
            {m}

        </div>;
        setAlert(alertShow);
        setIsAlert('true');
    }

    const newCard = () => {

            if (phone.match(/^[0-9]+$/) === null) {
                MakeMessage('מספר טלפון חייב להכיל מספרים בלבד')
                setPhone(userObj.phone);
            }
            else if (id.match(/^[0-9]+$/) === null) {
                MakeMessage('תעודת זהות חייבת להכיל מספרים בלבד')
                setId(userObj.id);
            }
            else if (firstName.match(/^[A-Z a-z א-ת ]+$/) === null) {

                MakeMessage('שם העובד חייב להכיל תווים בלבד')
                setFirstName(userObj.firstName);
            }
            else if (lastName.match(/^[A-Z a-z א-ת ]+$/) === null) {

                MakeMessage('שם המשפחה של העובד חייב להכיל תווים בלבד')
                setLastName(userObj.lastName);
            }
            else if (date.match(/^[0-9 -]+$/) === null) {
                MakeMessage('תאריך חייב להיות כתוב בפורמט הבא 22-07-2022')
                setDate(userObj.date);
            }
            else{
                const card = <EmployeeCard type='edit' num={num} id={id} firstName={firstName} lastName={lastName} phone={phone} mail={mail} date={date} img={img}  />
                setCard(card);

            }
        
         
     
    }
 
    const btnOk = () => {
        let employee = { EmployeeNumber: num, Id: id, FirstName: firstName, LastName: lastName, Mail: mail, PhoneNumber: phone, StartWorking: date, Img: img};
        insert2Db(employee);
    }
    const insert2Db = (e) => {
        fetch(apiUrl, {
            method: 'PUT',
            body: JSON.stringify(e),
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
                    console.log("fetch Put= ", result);
                    setAlertMessage(
                    <div className='editAlert'>
                    כרטיס עובד התעדכן בהצלחה!
                    <br/>
                    <button onClick={()=>(navigate('/EmployeesPage'))} className='backButton'><Icon1.RiArrowGoBackLine/> חזור לדף הנהגים</button>

                    </div>);




                },
                (error) => {
                    console.log("err post=", error);
                    setAlertMessage(<div className='editAlert'>
                    שגיאה, נסה שנית!
                    </div>);
                });

    }
    const checkAlert = () => {

        if (isAlert === 'true') {

            setAlert('');
            setIsAlert('false');
        }
    }


    return (
        <div>
            <Navbar />
            <div className='pageEmp'>
                <h3 className='header'>עריכת עובד <img className='imageDriver' src='https://cdn-icons-png.flaticon.com/512/138/138849.png' /></h3>
                <div className='container'>
                    <div className='row'>
                        <div className='col' >
                            <button onClick={btnOk} className='editButtonOk'><Icon.FiUserCheck style={{ margin: 10 }} />לחץ לאישור סופי</button>
                            <button className='editButtonCancel'><Icon.FiUserX style={{ margin: 10 }} />לחץ לביטול כל השינויים</button>
                            {alertMessage}
                        </div>
                        <div style={{ marginLeft: '200px' }} className='col'>
                            {card}
                        </div>
                        <div style={{ marginRight: '150px' }} className='col'>
                            <p>שם פרטי:</p>
                            <input className='txtBoxE' type='text' placeholder={userObj.firstName}  onClick={checkAlert} onChange={txtchgName}></input>
                            <p>שם משפחה:</p>
                            <input className='txtBoxE' type='text' placeholder={userObj.lastName}  onClick={checkAlert} onChange={txtchgLast}></input>
                            <p>תעודת זהות:</p>
                            <input className='txtBoxE' type='text' placeholder={userObj.id}  onClick={checkAlert} onChange={txtchgId}></input>
                            <p>מייל:</p>
                            <input className='txtBoxE' type='text' placeholder={userObj.mail}  onClick={checkAlert} onChange={txtchgMail}></input>
                            <p>מספר טלפון:</p>
                            <input className='txtBoxE' type='text' placeholder={userObj.phone}  onClick={checkAlert} onChange={txtchgPhone}></input>
                            <p>תאריך תחילת עבודה:</p>
                            <input className='txtBoxE' type='text' placeholder={userObj.date} onClick={checkAlert}  onChange={txtchgDate}></input>

                            <button style={{ margin: 5 }} type="button" class="btn btn-outline-light" onClick={newCard} >ערוך לתצוגה</button>

                          
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                        {alert}
                        </div>
                    
                    </div>

                </div>


            </div>
        </div>
    )
}