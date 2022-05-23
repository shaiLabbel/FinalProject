import {React,useEffect,useState} from 'react';
import OrderCreation from '../CssFiles/OrderCreation.css';
import * as Icon from 'react-icons/fa';
import * as Icon2 from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Point from './Point';


export default function Pickup(props) {

  const [pointsArr, setPointsArr] = useState([{ number: 2 }]);
  const [counter, setCounter] = useState(2);
  const [pointsStr, setPointsStr] = useState('')
  const [alert,setAlert]=useState('');
  const { state } = useLocation();
  
  let orderNumber = state;
  console.log(orderNumber);

  const btnAdd = () => {
    if(counter>4){setAlert('לא ניתן להוסיף יותר מ-4 נקודות עצירה')}
    else{
      let c = counter + 1;
      setCounter(c);
      let pointsAr = [...pointsArr, { number: c }];
      setPointsArr(pointsAr);
      let str = pointsArr.map((p) => (<Point number={p.number} />));
      setPointsStr(str);
    }
 
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
                <h4 className='step'>שלב 2: ערוך את פרטי הנסיעה</h4>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <Point number='1'/>
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
                <div class="input-group" style={{ marginTop: '20px' }}>
                  <textarea class="form-control" aria-label="With textarea" placeholder='כתוב כאן הערות מיוחדות עבור הנסיעה'></textarea>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className='row'>
          <button style={{ marginRight: '0px' }} className='done2' >
            שמירה וצפייה בפרטי ההזמנה</button>
        </div>
        <div className='row'>
          <div className='col' style={{color:'black'}}>
            {alert}
          </div>

        </div>
      </div>



    </div>



  )
}
