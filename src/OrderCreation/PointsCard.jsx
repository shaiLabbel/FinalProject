import { React, useState, useEffect } from 'react';
import * as Icon from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import OrderCreation from '../CssFiles/OrderCreation.css';

export default function PointsCard(props) {


    return (
        <div className='row'>
            <div style={{direction:'rtl'}} className='card3'>
            <Icon.FiMapPin />
                <span  > נקודה מספר {props.num}</span>
                <Icon.FiChevronLeft />
                <span > <b>נקודת איסוף:</b> {props.cPoint},</span>
                <span> <b>שעת יציאה:</b> {props.cTime}</span>
                <span > <Icon.FiArrowLeft /> <b>יעד: </b>{props.des}</span>
            </div>

        </div>
    )
}
