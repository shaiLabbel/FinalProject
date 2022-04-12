import { React, useState, useEffect } from 'react';
import * as Icon from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function VehiclesCard(props) {
const [buttonT, setButtonT]=useState("");

const typeButton =()=>{

    if(props.type==='show'){
        let buttonType=<div><button className='cardButtons' onClick={btnRemove}><Icon.AiTwotoneDelete />מחיקה</button>
         <button onClick={btnEdit} className='cardButtons'><Icon.AiFillEdit />עריכה</button></div> ;
        setButtonT(buttonType);
    }
    if(props.type==='delete'){
      let buttonType = "";
      setButtonT(buttonType);  
    }
    if(props.type==='new'){
        let buttonType=<button onClick={()=>(navigate('/VehicleדPage'))} style={{ margin: 5, borderRadius: '2mm', backgroundColor: '#f95844' }}>רכב חדש נכנס למערכת! לחץ חזרה למסך הרכבים</button>;
        setButtonT(buttonType);
    }
   

}
    const navigate = useNavigate();
    const btnRemove = () => {
        var vehicleObj={
           number:props.number,
           manufacturer:props.manufacturer,
           vtype:props.vtype,
           test:props.test,
           entry:props.entry,
           remarks:props.remarks,
           img:props.img
           

        };

        navigate('/VehicleRemove', {state: vehicleObj});

    }
    const btnEdit = () => {
        var vehicleObj={
            number:props.number,
            manufacturer:props.manufacturer,
            vtype:props.vtype,
            test:props.test,
            entry:props.entry,
            remarks:props.remarks,
            img:props.img

        };

        navigate('/VehiclesEdit', {state: vehicleObj});

    }
    useEffect(() => typeButton(), [props.type]);
   
    return (
        <div className='col'>
            <div style={{ width: "15rem", color: 'grey', margin: 10, direction: 'rtl', fontSize:15, border: '2px solid #fbab3e', borderRadius: 30, backgroundColor: 'white' }} class="card">
                <img style={
                    {alignSelf:'center' ,height:'100px', width:'100px'}} src={props.img} class="card-img-top" alt="..." />
                <div class="card-body">
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">מספר רכב:</p>
                    <p style={{ margin: 0 }}>{props.number}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">יצרן:</p>
                    <p style={{ margin: 0 }}>{props.manufacturer}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">סוג :</p>
                    <p style={{ margin: 0 }}>{props.vtype}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">תוקף טסט :</p>
                    <p style={{ margin: 0 }}>{props.test}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">נכנס לחברה בתאריך :</p>
                    <p style={{ margin: 0 }}>{props.entry}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">הערות מיוחדות :</p>
                    <p style={{ margin: 0 }}>{props.remarks}</p>
                    {buttonT}
                </div>
            </div>

        </div>
    )
}
