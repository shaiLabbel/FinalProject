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
    const [access, setAccess] = useState(userObj.access);
    const [img, setImg] = useState(userObj.img);
    const [card, setCard] = useState(<EmployeeCard id={userObj.id} num={userObj.num} firstName={userObj.firstName} lastName={userObj.lastName} phone={userObj.phone} mail={userObj.mail} date={userObj.date} img={userObj.img} access={userObj.access} />);

    const txtchgName = (e) => { setFirstName(e.target.value) };
    const txtchgLast = (e) => { setLastName(e.target.value) };
    const txtchgId = (e) => { setId(e.target.value) };
    const txtchgMail = (e) => { setMail(e.target.value) };
    const txtchgPhone = (e) => { setPhone(e.target.value) }
    const txtchgDate = (e) => { setDate(e.target.value) };
    const txtchgImg = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImg(URL.createObjectURL(img))
        }

    };

    const newCard = () => {
        const card = <EmployeeCard type='edit' num={num} id={id} firstName={firstName} lastName={lastName} phone={phone} mail={mail} date={date} img={img} access={access} />
        setCard(card);
    }
    const onChangeValue = (e) => {
        if (e.target.value === 'm') {
            setAccess('כן');
        }
        else {
            setAccess('לא');
        }
    }
    const btnOk = () => {
        let employee = { EmployeeNumber: num, Id: id, FirstName: firstName, LastName: lastName, Mail: mail, PhoneNumber: phone, StartWorking: date, Img: img, ManagerAccess: access };
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


    return (
        <div>
            <Navbar />
            <div className='pageEmp'>
                <h3 className='header'>עריכת עובד</h3>
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
                            <input className='txtBoxE' type='text' placeholder={userObj.firstName} onChange={txtchgName}></input>
                            <p>שם משפחה:</p>
                            <input className='txtBoxE' type='text' placeholder={userObj.lastName} onChange={txtchgLast}></input>
                            <p>תעודת זהות:</p>
                            <input className='txtBoxE' type='text' placeholder={userObj.id} onChange={txtchgId}></input>
                            <p>מייל:</p>
                            <input className='txtBoxE' type='text' placeholder={userObj.mail} onChange={txtchgMail}></input>
                            <p>מספר טלפון:</p>
                            <input className='txtBoxE' type='text' placeholder={userObj.phone} onChange={txtchgPhone}></input>
                            <p>כתובת:</p>
                            <input className='txtBoxE' type='text' placeholder={userObj.address}></input>
                            <p>תאריך תחילת עבודה:</p>
                            <input className='txtBoxE' type='text' placeholder={userObj.date} onChange={txtchgDate}></input>
                            <div style={{ width: '219.6px', height: '34px', marginLeft: 40 }} class="mb-3">
                                <label style={{ margin: 0, fontSize: '15px' }} for="formFileSm" class="form-label">: תמונת פרופיל</label>
                                <input onChange={txtchgImg} class="form-control form-control-sm" id="formFileSm" type="file" />
                            </div>

                            <div style={{ color: 'grey', fontSize: '17px' }} onChange={onChangeValue}>
                                <input style={{ marginTop: '25px' }} type="radio" value="m" name="gender" /> עובד
                                <input type="radio" value="e" name="gender" /> מנהל
                            </div>

                            <button style={{ margin: 5 }} type="button" class="btn btn-outline-light" onClick={newCard} >ערוך לתצוגה</button>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}