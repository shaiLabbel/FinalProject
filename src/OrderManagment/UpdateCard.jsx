import { React, useState, useEffect } from 'react';
import OrderManagment from '../CssFiles/OrderManagment.css';
import * as Icon from 'react-icons/bs';

export default function UpdateCard(props) {


    console.log(props.statusNumber);
    return (
        <div className='row'>
            <div className='cardU'>
                <div style={{backgroundColor:'gray', borderRadius:'20px', marginTop:'5px'}} className='row'>
                    <span>{props.date.substring(0, 10)} {props.time.substring(0, 5)} </span>
                </div>
                <div className='row'>
                   <div style={{marginTop:'3px'}} className='col'>
                    <button className={props.statusNumber}> {props.status}</button>
                   </div>

                </div>

            </div>
        </div>
    )
}
