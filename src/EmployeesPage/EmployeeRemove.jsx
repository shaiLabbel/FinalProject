import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import EmployeeCard from './EmployeeCard';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton'


export default function EmployeeRemove() {
    const [reasons, setReasons] = useState([]);
    const [reasonStr, setReasonStr] = useState();
    const [selected, setSelected] = useState('בחר את סיבת המחיקה');
    const[reasonForDelete, setReasonForDelete]=useState();
    const [details, setDetails] = useState();
    const [alertMessage, setAlertMessage]=useState("");
    const navigate = useNavigate();
    const { state } = useLocation();
    let userObj = state;
    const apiUrl3='http://localhost:57268/api/DeletedEmployees/';
    const apiUrl1 = 'http://localhost:57268/api/Employees/' + userObj.num;
    const apiUrl2 = 'http://localhost:57268/api/ReasonsForLeaving/';

    const insert2DeletedEmployees = (emp)=>{
        fetch(apiUrl3, {
            method: 'POST',
            body: JSON.stringify(emp),
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
                    setAlertMessage("עובד נמחק מרשימת העובדים במערכת והועבר לארכיון בהצלחה!")
                    remove();

                },
                (error) => {
                    console.log("err post=", error);
                });
    }
    const remove = () => {

        fetch(apiUrl1, {
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
                    console.log("fetch POST= ", result);
                    

                },
                (error) => {
                    console.log("err post=", error);
                });
    }
    const getReasons = () => {
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
                    console.log("fetchgettAll= ", result);
                    setReasons(result);
                   
                },
                (error) => {
                    console.log("err post=", error);
                });

    }
    const btnSave=()=>{
        let deletedEmployee={
            Id:userObj.id,
            EmployeeNumber:userObj.num,
            FirstName:userObj.firstName,
            LastName:userObj.lastName,
            PhoneNumber:userObj.phone,
            Mail:userObj.mail,
            StartWorking:userObj.date,
            Img:userObj.img,
            ManagerAccess:userObj.access,
            Reason:reasonForDelete,
            Details:details
            
        }
        insert2DeletedEmployees(deletedEmployee);
        
       
    }
    const setAllReasons = () => {
        let str = reasons.map((re, ind) => (<Dropdown.Item key={ind} eventKey={re.Reason}  >{re.Reason}</Dropdown.Item>))
        setReasonStr(str);
    }
    const showSelected = (e) => {
        setSelected('סיבת המחיקה:  ' + e + '  '); 
        setReasonForDelete(e);       

    }
    const txtchg = (e) => {
        setDetails(e.target.value);
    }

    useEffect(() => getReasons(), []);
    useEffect(() => setAllReasons(), [reasons]);

    return (
        <div>
            <Navbar />
            <div className='pageEmp'>
                <h3 className='header'>מחיקת עובד</h3>
                <div>
                {alertMessage}
                </div>
                <div>
                    <DropdownButton style={{ direction: 'rtl', margin: 5 }} variant="success" title={selected} onSelect={showSelected}>
                        {reasonStr}
                    </DropdownButton>
                    <div class="input-group">
                        <textarea class="form-control" aria-label="With textarea" placeholder='הוסף פירוט' onChange={ txtchg } ></textarea>
                    </div>
                    <button type="button" class="btn btn-outline-light" onClick={btnSave}>מחק עובד זה מהמערכת </button>
                </div>
                <div className='col'>
                    <EmployeeCard type='delete' id={userObj.id} num={userObj.num} firstName={userObj.firstName} lastName={userObj.lastName} phone={userObj.phone} mail={userObj.mail} date={userObj.date} img={userObj.img} access={userObj.access} />
                </div >

            </div>

        </div>




    )
}
