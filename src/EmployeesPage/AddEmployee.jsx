import { React, useState } from 'react';
import Navbar from '../Navbar';
import EmployeeCard from './EmployeeCard';

export default function AddEmployee() {

    const apiUrl = 'http://localhost:57268/api/Employees';
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [id, setId] = useState();
    const [mail, setMail] = useState();
    const [phone, setPhone] = useState();
    const [date, setDate] = useState();
    const [access, setAccess] = useState();
    const [img, setImg] = useState('https://media.istockphoto.com/vectors/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-vector-id1087531642?k=20&m=1087531642&s=170667a&w=0&h=ge3fq1Dw0-J2FoW96c8klSiHyOnitVhReUUuIIYqtvw=');
    const [card, setCard] = useState(<EmployeeCard img={'https://media.istockphoto.com/vectors/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-vector-id1087531642?k=20&m=1087531642&s=170667a&w=0&h=ge3fq1Dw0-J2FoW96c8klSiHyOnitVhReUUuIIYqtvw='} />);

    const txtchgName = (e) => { setFirstName(e.target.value) };
    const txtchgLast = (e) => { setLastName(e.target.value) };
    const txtchgId = (e) => { setId(e.target.value) };
    const txtchgMail = (e) => { setMail(e.target.value) };
    const txtchgPhone = (e) => { setPhone(e.target.value) }
    const txtchgDate = (e) => { setDate(e.target.value) };
    const txtchgImg = (e) => {
        console.log(e.target.files);
        let imgPath  = URL.createObjectURL(e.target.files[0]);
        console.log(imgPath);
        setImg(imgPath);
    }

    const editData = () => {
        let employee = { Id: id, FirstName: firstName, LastName: lastName, Mail: mail, PhoneNumber: phone, StartWorking: date, Img: img, ManagerAccess:access };
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
        const card = <EmployeeCard type='new' id={id} firstName={firstName} lastName={lastName} phone={phone} mail={mail} date={date} img={img} access={access} />
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


    return (
        <div>
            <Navbar />
            <div className='pageEmp'>
                <h3 className='header'>הוספת עובד חדש למערכת</h3>
                <div className='container'>
                    <div className='row'>
                        <div style={{marginLeft:'20%'}} className='col'>
                            {card}
                        </div>
                        <div style={{marginRight:'17%', marginTop:'3mm'}} className='col'>
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
                            <div style={{ width: '266.8px', height: '40.64px', marginLeft: 61 }} class="mb-3">
                                <label style={{margin:0, color:'grey'}} for="formFileSm" class="form-label">:הוסף תמונת פרופיל</label>
                                <input  onChange={txtchgImg} class="form-control form-control-sm" id="formFileSm" type="file"/>
                            </div>
                            <br/>
                            <div style={{color:'grey'}} onChange={onChangeValue}>
                                <input type="radio" value="m" name="gender" /> עובד
                                <input type="radio" value="e" name="gender" /> מנהל
                            </div>
                            
                            <button className='buttonOk' style={{ margin: 5 }} type="button" class="btn btn-outline-light" onClick={editData} >הוסף</button>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}
