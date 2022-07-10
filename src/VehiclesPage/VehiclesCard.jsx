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
        let buttonType=<button onClick={()=>(navigate('/VehiclesPage'))} style={{ margin: 5, borderRadius: '2mm', backgroundColor: '#f95844' }}>רכב חדש נכנס למערכת! לחץ חזרה למסך הרכבים</button>;
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

        navigate('/VehiclesRemove', {state: vehicleObj});

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
            <div style={{ width: "15rem", color: 'grey', margin: 10, direction: 'rtl', fontSize:15, border: '2px solid #8f9fae', borderRadius: 30, backgroundColor: '#8f9fae' }} class="card">
                <img style={
                    {alignSelf:'center' ,height:'100px', width:'100px'}} src={props.img} class="card-img-top" alt="..." />
                <div class="card-body">
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text"><u>מספר רכב:</u></p>
                    <p style={{ margin: 0 ,color:'black' }}>{props.number}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">יצרן:</p>
                    <p style={{ margin: 0 ,color:'black' }}>{props.manufacturer}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">סוג :</p>
                    <p style={{ margin: 0 ,color:'black' }}>{props.vtype}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">תוקף טסט :</p>
                    <p style={{ margin: 0,  color:'black'}}>{props.test}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">נכנס לחברה בתאריך :</p>
                    <p style={{ margin: 0,  color:'black'}}>{props.entry}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color:'black' }} class="card-text">הערות מיוחדות :</p>
                    <p style={{ margin: 0, color:'black' }}>{props.remarks}</p>
                    {buttonT}
                </div>
            </div>

        </div>
    )
}
