import React from 'react';
import * as Icon from 'react-icons/fa';
export default function Point(props) {

  return (
    <div>
              <div className='row'>
                <div className='col'>
                  <Icon.FaAsterisk className='ast' />
                  נקודת איסוף {props.number}:
                  <input style={{ marginLeft: '10px' }} className='txt' type='text'></input>
                  שעת איסוף:
                  <input style={{ width: '50px' }} className='txt' type='text' placeholder='00:00'></input>
                  <Icon.FaLongArrowAltLeft className='arrow' />
                  יעד:
                  <input className='txt' type='text'></input>
                </div>
              </div>           
    </div>



  )
}
