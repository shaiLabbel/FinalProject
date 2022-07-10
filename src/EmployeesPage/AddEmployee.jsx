import { React, useState } from 'react';
import Navbar from '../Navbar';
import EmployeeCard from './EmployeeCard';

export default function AddEmployee() {

    const img = "https://cdn-icons-png.flaticon.com/512/305/305982.png"
    const apiUrl = 'https://proj.ruppin.ac.il/bgroup93/prod/api/Employees';
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [id, setId] = useState();
    const [mail, setMail] = useState();
    const [phone, setPhone] = useState();
    const [date, setDate] = useState();
    const [card, setCard] = useState(<EmployeeCard img={img} />);
    const [alert, setAlert] = useState('');
    const [isAlert, setIsAlert] = useState('false');

    const txtchgName = (e) => { setFirstName(e.target.value) };
    const txtchgLast = (e) => { setLastName(e.target.value) };
    const txtchgId = (e) => { setId(e.target.value) };
    const txtchgMail = (e) => { setMail(e.target.value) };
    const txtchgPhone = (e) => { setPhone(e.target.value) }
    const txtchgDate = (e) => { setDate(e.target.value) };

    
    const editData = () => {
        const access = "a";
        let employee = { Id: id, FirstName: firstName, LastName: lastName, Mail: mail, PhoneNumber: phone, StartWorking: date, Img: img, ManagerAccess: access };
        postData(employee);
    }
    const postData = (employee) => {
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(employee),
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
                    console.log("fetch POST= ", result);
                    newCard();


                },
                (error) => {
                    console.log("err post=", error);
                });

    }
    const newCard = () => {
        const access="k";
        const card = <EmployeeCard type='new' id={id} firstName={firstName} lastName={lastName} phone={phone} mail={mail} date={date} img={img} access={access} />
        setCard(card);

    }



    return (
        <div>
            <Navbar />
            <div className='pageEmp'>
                <h3 className='header'>הוספת עובד חדש למערכת</h3>
                <div className='container'>
                    <div className='row'>
                        <div style={{ marginLeft: '20%' }} className='col'>
                            {card}
                        </div>
                        <div style={{ marginRight: '17%', marginTop: '3mm' }} className='col'>
                            <input className='txtBox' type='text' placeholder='שם הנהג' onChange={txtchgName}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='שם משפחה' onChange={txtchgLast}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='תעודת זהות' onChange={txtchgId}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='מייל' onChange={txtchgMail}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='טלפון' onChange={txtchgPhone}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='כתובת'></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='תאריך תחילת עבודה' onChange={txtchgDate}></input>
                            <br />
                            <button className='buttonOk' style={{ margin: 5 }} type="button" class="btn btn-outline-light" onClick={editData} >הוסף</button>
                            <div className='row'>
                                {alert}
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}
