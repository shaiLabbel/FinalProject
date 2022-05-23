import { React, useState, useEffect } from 'react';
import * as Icon from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function EmployeeCard(props) {
const [buttonT, setButtonT]=useState("");

const typeButton =()=>{

    if(props.type==='show'){
        let buttonType=<div><button className='cardButtons' onClick={btnRemove}><Icon.FaUserAltSlash />מחיקה</button>
         <button onClick={btnEdit} className='cardButtons'><Icon.FaUserCog />עריכה</button></div> ;
        setButtonT(buttonType);
    }
    if(props.type==='delete'){
      let buttonType = "";
      setButtonT(buttonType);  
    }
    if(props.type==='new'){
        let buttonType=<button onClick={()=>(navigate('/EmployeesPage'))} style={{ margin: 5, borderRadius: '2mm', backgroundColor: '#f95844' }}><Icon.FaUserCheck />עובד חדש נוסף למערכת! לחץ חזרה למסך הנהגים</button>;
        setButtonT(buttonType);
    }
   

}
    const navigate = useNavigate();
    const btnRemove = () => {
        var userObj={
           num:props.num,
           id:props.id,
           firstName:props.firstName,
           lastName:props.lastName,
           mail:props.mail,
           phone:props.phone,
           date:props.date,
           img:props.img,
           access:props.access

        };

        navigate('/EmployeeRemove', {state: userObj});

    }
    const btnEdit = () => {
        var userObj={
           num:props.num,
           id:props.id,
           firstName:props.firstName,
           lastName:props.lastName,
           mail:props.mail,
           phone:props.phone,
           date:props.date,
           img:props.img,
           access:props.access

        };

        navigate('/EmployeeEdit', {state: userObj});

    }
    useEffect(() => typeButton(), [props.type]);
   
    return (
        <div className='col'>
            <div style={{ width: "15rem", color: 'grey', margin: 10, direction: 'rtl', fontSize:15, border: '2px solid #fbab3e', borderRadius: 30, backgroundColor: 'white' }} class="card">
                <img style={
                    {alignSelf:'center' ,height:'100px', width:'100px'}} src={props.img} class="card-img-top" alt="..." />
                <div class="card-body">
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">מספר עובד:</p>
                    <p style={{ margin: 0 }}>{props.num}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">תעודת זהות:</p>
                    <p style={{ margin: 0 }}>{props.id}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">שם פרטי:</p>
                    <p style={{ margin: 0 }}>{props.firstName}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">שם משפחה:</p>
                    <p style={{ margin: 0 }}>{props.lastName}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">מייל:</p>
                    <p style={{ margin: 0 }}>{props.mail}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">טלפון:</p>
                    <p style={{ margin: 0 }}>{props.phone}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">תאריך תחילת עבודה:</p>
                    <p style={{ margin: 0 }}>{props.date}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">גישת מנהל למערכת:</p>
                    <p style={{ margin: 0 }}>{props.access}</p>
                    {buttonT}
                </div>
            </div>

        </div>
    )
}
