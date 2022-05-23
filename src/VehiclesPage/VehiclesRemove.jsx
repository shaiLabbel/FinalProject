import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import VehiclesCard from './VehiclesCard';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton'
import * as Icon from 'react-icons/ri';



export default function VehiclesRemove() {
    const [reasons, setReasons] = useState([]);
    const [reasonStr, setReasonStr] = useState();
    const [selected, setSelected] = useState('בחר את סיבת המחיקה');
    const [reasonForDelete, setReasonForDelete] = useState();
    const [details, setDetails] = useState();

    const [btn, setBtn] = useState("")
    const navigate = useNavigate();
    const { state } = useLocation();
    let vehicleObj = state;
    const apiUrl3 = 'http://localhost:57268/api/DeletedVehicles/';
    const apiUrl1 = 'http://localhost:57268/api/Vehicles/' + vehicleObj.number;
    const apiUrl2 = 'http://localhost:57268/api/ReasonsDeleteVehicles/';

    const insert2DeletedVehicles = (v) => {
        fetch(apiUrl3, {
            method: 'POST',
            body: JSON.stringify(v),
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
                    console.log("fetch POST= ", result);
                    setBtn(
                        <div className='deleteAlert'>
                            רכב נמחק מהמערכת והועבר לארכיון בהצלחה!
                            <br />
                            <button onClick={() => (navigate('/VehiclesPage'))} className='backButton'><Icon.RiArrowGoBackLine /> חזור לדף הרכבים</button>

                        </div>)
                    remove();

                },
                (error) => {
                    console.log("err post=", error);
                });
    }
    const remove = () => {

        fetch(apiUrl1, {
            method: 'DELETE',
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
                    console.log("fetch Delete= ", result);


                },
                (error) => {
                    console.log("err delete=", error);
                });
    }
    const getReasons = () => {
        fetch(apiUrl2, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            })
        })
            .then(res => {
                console.log('res=', res);
                console.log('res.status', res.status);
                console.log('res.ok', res.ok);
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch get All Reasons= ", result);
                    setBtn(<button type="button" class="btn btn-outline-light" onClick={btnSave}>מחק רכב זה מהמערכת </button>);
                    setReasons(result);

                },
                (error) => {
                    console.log("err post=", error);
                });

    }
    const btnSave = () => {
        let deletedVehicle = {
            VehicleNumber: vehicleObj.number,
            Manufacturer: vehicleObj.manufacturer,
            Type: vehicleObj.vtype,
            TestValidityDate: vehicleObj.test,
            EntryCompany: vehicleObj.entry,
            Remarks: vehicleObj.remarks,
            Img: vehicleObj.img,
            Reason: reasonForDelete,
            Details: details
        }
        insert2DeletedVehicles(deletedVehicle);


    }
    const setAllReasons = () => {
        let str = reasons.map((re, ind) => (<Dropdown.Item key={ind} eventKey={re.Reason} >{re.Reason}</Dropdown.Item>))
        setReasonStr(str);
    }
    const showSelected = (e) => {
        setSelected('סיבת המחיקה:  ' + e + '  ');
        setReasonForDelete(e);

    }
    const txtchg = (e) => {
        setDetails(e.target.value);
    }

    useEffect(() => getReasons(), []);
    useEffect(() => setAllReasons(), [reasons]);

    return (
        <div>
            <Navbar />
            <div className='pageEmp'>
                <h3 className='header'>מחיקת רכב</h3>
                <div className='row'>
                    <div className='col'>
                        <DropdownButton style={{ direction: 'rtl', margin: 5 }} variant="success" title={selected} onSelect={showSelected}>
                            {reasonStr}
                        </DropdownButton>
                        <div class="input-group">
                            <textarea class="form-control" aria-label="With textarea" placeholder='הוסף פירוט' onChange={txtchg} ></textarea>
                        </div>
                        <VehiclesCard  number={ vehicleObj.number} manufacturer={vehicleObj.manufacturer}
                         vtype={vehicleObj.vtype} test={vehicleObj.test} entry={vehicleObj.entry} remarks={vehicleObj.remarks} img={vehicleObj.img} />
                    </div>
                </div>
                <div className='row'>
                    {btn}
                </div>
            </div>

        </div>




    )
}