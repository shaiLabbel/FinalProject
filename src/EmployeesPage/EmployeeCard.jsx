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
            <div style={{ width: "15rem", color: 'grey', margin: 10, direction: 'rtl', fontSize:15, border: '2px solid #8f9fae', borderRadius: 30, backgroundColor: '#8f9fae' }} class="card">
                <img style={
                    {alignSelf:'center' ,height:'100px', width:'100px'}} src={props.img} class="card-img-top" alt="..." />
                <div class="card-body">
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} > <u>מספר עובד: </u></p>
                    <p style={{ margin: 0, fontWeight: 'normal', color:'black' }}>{props.num}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} ><u>תעודת זהות:</u></p>
                    <p style={{ margin: 0 , fontWeight: 'normal', color:'black'}}>{props.id}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} ><u>שם פרטי:</u></p>
                    <p style={{ margin: 0 , fontWeight: 'normal', color:'black'}}>{props.firstName}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }}><u>שם משפחה:</u></p>
                    <p style={{ margin: 0 , fontWeight: 'normal', color:'black'}}>{props.lastName}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }}><u>מייל:</u></p>
                    <p style={{ margin: 0 , fontWeight: 'normal', color:'black'}}>{props.mail}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} ><u>טלפון:</u></p>
                    <p style={{ margin: 0 , fontWeight: 'normal', color:'black'}}>{props.phone}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }}><u>תאריך תחילת עבודה:</u></p>
                    <p style={{ margin: 0, fontWeight: 'normal' , color:'black'}}>{props.date}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }}><u>גישת מנהל למערכת:</u></p>
                    <p style={{ margin: 0 , fontWeight: 'normal', color:'black'}}>{props.access}</p>
                    {buttonT}
                </div>
            </div>

        </div>
    )
}
