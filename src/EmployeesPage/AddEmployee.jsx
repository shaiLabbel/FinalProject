import { React, useState } from 'react';
import Navbar from '../Navbar';
import EmployeeCard from './EmployeeCard';
import * as Icon from 'react-icons/fi';

export default function AddEmployee() {

    
    const apiUrl = 'https://proj.ruppin.ac.il/bgroup93/prod/api/Employees';

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [img, setImg]=useState('https://cdn-icons-png.flaticon.com/512/305/305982.png');
    const [card, setCard] = useState(<EmployeeCard img={'https://cdn-icons-png.flaticon.com/512/305/305982.png'} />);
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
    
    const editData = () => {
        let employee = { Id: id, FirstName: firstName, LastName: lastName, Mail: mail, PhoneNumber: phone, StartWorking: date, Img: img};
        postData(employee);
        if (firstName !== '' && lastName !== '' && id !== '' && mail !== '' && phone !== '' && date!==null) {

            if (phone.match(/^[0-9]+$/) === null) {
                MakeMessage('מספר טלפון חייב להכיל מספרים בלבד')
            }
            else if (id.match(/^[0-9]+$/) === null) {
                MakeMessage('תעודת זהות חייבת להכיל מספרים בלבד')
            }
            else if (firstName.match(/^[A-Z a-z א-ת ]+$/) === null) {

                MakeMessage('שם העובד חייב להכיל תווים בלבד')
            }
            else if (lastName.match(/^[A-Z a-z א-ת ]+$/) === null) {

                MakeMessage('שם המשפחה של העובד חייב להכיל תווים בלבד')
            }
            else if (date.match(/^[0-9 -]+$/) === null) {
                MakeMessage('תאריך חייב להיות כתוב בפורמט הבא 22-07-2022')
            }
            else{
                let employee = { Id: id, FirstName: firstName, LastName: lastName, Mail: mail, PhoneNumber: phone, StartWorking: date, Img:img};
                postData(employee);

            }
        }
            else {
                let alertShow = <div style={{ fontSize: '17px', marginTop: '10px', backgroundColor: 'red', color: 'white', direction: 'rtl', borderRadius: '5mm', width: '400px' }}>
                    <h3> <Icon.FiAlertTriangle style={{ fontSize: '25px', margin: '5px' }} /> שגיאה </h3>
                   יש להזין את כל פרטי העובד במערכת.
                </div>;
                setAlert(alertShow);
                setIsAlert('true');
            }
       
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
        const card = <EmployeeCard type='new' id={id} firstName={firstName} lastName={lastName} phone={phone} mail={mail} date={date} img={img} />

        setCard(card);

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
                <h3 className='header'>הוספת עובד חדש למערכת <img className='imageDriver' src='https://cdn-icons-png.flaticon.com/512/1219/1219018.png' /></h3>
                <div className='container'>
                    <div className='row'>
                        <div style={{ marginLeft: '20%' }} className='col'>
                            {card}
                        </div>
                        <div style={{ marginRight: '17%', marginTop: '3mm' }} className='col'>
                            <input className='txtBox' type='text' placeholder='שם הנהג' onClick={checkAlert} onChange={txtchgName}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='שם משפחה' onClick={checkAlert} onChange={txtchgLast}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='תעודת זהות' onClick={checkAlert} onChange={txtchgId}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='מייל' onClick={checkAlert} onChange={txtchgMail}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='טלפון' onClick={checkAlert}  onChange={txtchgPhone}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='תאריך תחילת עבודה' onClick={checkAlert} onChange={txtchgDate}></input>
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
