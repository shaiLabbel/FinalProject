import React from 'react';
import { useState } from 'react';
import * as Icon from 'react-icons/fa';
import * as Icon2 from 'react-icons/fi';
import '../CssFiles/OrderCreation.css'
export default function Point(props) {


  const [buttonTxt, setButtonTxt] = useState('שמור');
  const [collectionPoint, setCollectionPoint] = useState('');
  const [collectionTime, setCollectionTime] = useState('');
  const [destination, setDestinition] = useState('');
  const [buttonCheck, setButtonCheck] = useState(false);
  const [buttonColor, setButtonColor] = useState('grey');
  const [alert, setAlert] = useState('');
  const [isAlert, setIsAlert] = useState('false');
  const apiUrl = 'https://proj.ruppin.ac.il/bgroup93/prod/api/PickUp';

  const txtChgPoint = (e) => {
    setCollectionPoint(e.target.value);
  }
  const txtChgTime = (e) => {
    setCollectionTime(e.target.value);
  }
  const txtChgDes = (e) => {
    setDestinition(e.target.value);
  }
  const btnSavePoint = () => {

    if (collectionPoint !== '' && collectionTime !== '' && destination !== '') {

      if (collectionTime.match(/^[0-9 :]+$/) === null ){
        
        MakeMessage('שעת האיסוף אינה יכולה לכלול תווים')
      }

      else {
        let point = {
          PickUpNumber: props.number,
          CollectionPoint: collectionPoint,
          CollectionTime: collectionTime,
          Destination: destination,
          OrderNumber: props.order
  
        }
        postData(point);
      }
   
    }
    else {
   MakeMessage('יש להזין את כל פרטי האיסוף');
    }


  }
  const postData = (point) => {
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(point),
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
          console.log("fetch POST point= ", result);

          setButtonColor('green');
          setButtonTxt('נשמר')
        },
        (error) => {
          console.log("err post point=", error);
        });

  }
  const checkAlert = () => {

    if (isAlert === 'true') {

      setAlert('');
      setIsAlert('false');
    }
  }
  const MakeMessage=(m)=>{
    let alertShow = <div style={{ fontSize: '12px', marginTop: '10px', backgroundColor: 'red', color: 'white', direction: 'rtl', borderRadius: '5mm', width: '250px' }}>
    <h5> <Icon2.FiAlertTriangle style={{ fontSize: '20px' }} /> שגיאה </h5>
    {m}
  
</div>;
setAlert(alertShow);
setIsAlert('true');
}
  return (
    <div>
      <div className='row'>
        <div className='col'>
          <Icon.FaAsterisk className='ast' />
          נקודת איסוף {props.number}:
          <input style={{ marginLeft: '10px' }} className='txt' type='text' onClick={checkAlert} onChange={txtChgPoint}></input>
          שעת איסוף:
          <input style={{ width: '50px' }} className='txt' type='text' placeholder='00:00' onClick={checkAlert} onChange={txtChgTime}></input>
          <Icon.FaLongArrowAltLeft className='arrow' />
          יעד:
          <input className='txt' type='text' onClick={checkAlert} onChange={txtChgDes}></input>
          <button style={{ backgroundColor: buttonColor }} className='pointB' onClick={btnSavePoint}> {buttonTxt}</button>
        </div>
      </div>
      <div style={{marginRight:'260px'}} className='row'>
        {alert}
      </div>
    </div>



  )
}
