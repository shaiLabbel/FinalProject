import {React,useEffect,useState} from 'react';
import OrderCreation from '../CssFiles/OrderCreation.css';
import * as Icon from 'react-icons/fc';
import * as Icon2 from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Point from './Point';
import { useNavigate } from 'react-router-dom';

export default function Pickup(props) {

  const navigate = useNavigate();
  const [pointsArr, setPointsArr] = useState([{ number: 2 }]);
  const [counter, setCounter] = useState(2);
  const [pointsStr, setPointsStr] = useState('')
  const [alert,setAlert]=useState('');
  const { state } = useLocation();
  const apiUrl = 'https://proj.ruppin.ac.il/bgroup93/prod/api/OrderUpdates';


  const orderNumber = state;
  console.log(orderNumber);

  const btnAdd = () => {
    if(counter>4){setAlert('לא ניתן להוסיף יותר מ-4 נקודות עצירה')}
    else{
      let c = counter + 1;
      setCounter(c);
      let pointsAr = [...pointsArr, { number: c }];
      setPointsArr(pointsAr);
      let str = pointsArr.map((p) => (<Point number={p.number} order={orderNumber} />));
      setPointsStr(str);
    }
 
  }

 const CheckAllPoints = ()=>{
  let alert = <div style={{ fontSize: '12px', marginTop: '10px', backgroundColor: 'orange', color: 'white', direction: 'rtl', borderRadius: '5mm', width: '320px' , height:'90px'}}>
  <Icon.FcIdea style={{ fontSize: '15px' }} /><br/> אנא וודא כי שמרת את כל נקודות האיסוף
  <button className='check' onClick={btnSave} > שמרתי, אפשר להמשיך</button>
</div>;
setAlert(alert);
 }

 const btnSave = () =>{
let update={OrderNumber:orderNumber};
  postDataUpdate(update);
  navigate('/ShowOrder', {state:orderNumber});   
                  
 }
 const postDataUpdate = (update) => {
  fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(update),
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
              console.log("fetch POST order update= ", result);

          },
          (error) => {
              console.log("err post order update=", error);
          });



}
  return (
    <div>
      <Navbar />
      <div className='orderPage' >
        <h3 className='header'> יצירת הזמנה חדש</h3>
        <div className='card2'>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <br />
                <h4 className='step'> שלב 2: ערוך את פרטי הנסיעה {orderNumber}</h4>
              </div>
            </div>
            
            <div className='row'>
              <div className='col'>
                <Point number='1' order={orderNumber}/>
                {pointsStr}
              </div>
            </div>

            <div className='row'>
              <div className='col'>
                <button className='add' onClick={btnAdd}>לחץ להוספת נקודת עצירה נוספת</button>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
              <img className='image' src='https://cdn-icons-png.flaticon.com/512/2554/2554922.png' />
              </div>

            </div>
          </div>
        </div>
        <div className='row'>
          <button style={{ marginRight: '0px' }} onClick={CheckAllPoints}className='done2' >
            שמירה וצפייה בפרטי ההזמנה</button>
        </div>
        <div className='row'>
          <div className='col' style={{color:'white'}}>
            {alert}
          </div>

        </div>
      </div>



    </div>



  )
}
