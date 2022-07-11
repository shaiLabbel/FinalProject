import { React, useState, useEffect } from 'react';
import Navbar from '../Navbar';
import VehiclesCard from './VehiclesCard';
import { Dropdown } from 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton'
import '../CssFiles/EmployeesPage.css';
import Calendar from 'react-calendar';
import * as Icon from 'react-icons/fi';
export default function VehiclesAdd() {

    const apiUrl = 'https://proj.ruppin.ac.il/bgroup93/prod/api/Vehicles';
    const apiUrl2 = 'https://proj.ruppin.ac.il/bgroup93/prod/Manufacturers';
    const apiUrl3 = 'https://proj.ruppin.ac.il/bgroup93/prod/api/VehiclesTypes';
    const [number, setNumber] = useState();
    const [manufacturer, setManufacturer] = useState();
    const [allTypes, setAllTypes] = useState([]);
    const [allManu, setAllManu] = useState([]);
    const [allManuStr, setAllManuStr] = useState("");
    const [allTypeStr, setAllTypeStr] = useState("");
    const [selected, setSelected] = useState('יצרן');
    const [selected1, setSelected1] = useState('סוג');
    const [type, setType] = useState();
    const [test, setTest] = useState();
    const [entry, setEntry] = useState();
    const [remarks, setRemarks] = useState();
    const [img, setImg] = useState('https://previews.123rf.com/images/jovanas/jovanas1602/jovanas160201079/52031569-%EB%B2%84%EC%8A%A4-%EC%9B%90%ED%98%95-%EC%95%84%EC%9D%B4%EC%BD%98.jpg');
    const [card, setCard] = useState(<VehiclesCard img={'https://previews.123rf.com/images/jovanas/jovanas1602/jovanas160201079/52031569-%EB%B2%84%EC%8A%A4-%EC%9B%90%ED%98%95-%EC%95%84%EC%9D%B4%EC%BD%98.jpg'} />);
    const [alert, setAlert] = useState('');
    const [isAlert, setIsAlert] = useState('false');

    const txtchgNumber = (e) => { setNumber(e.target.value) };
    const txtchgTest = (e) => { setTest(e.target.value) };
    const txtchgEntry = (e) => { setEntry(e.target.value) }
    const txtchgRemarks = (e) => { setRemarks(e.target.value) };


    const checkAlert = () => {

        if (isAlert === 'true') {

            setAlert('');
            setIsAlert('false');
        }
    }

    const MakeMessage = (m) => {
        let alertShow = <div style={{ fontSize: '17px', marginTop: '10px', backgroundColor: 'red', color: 'white', direction: 'rtl', borderRadius: '5mm', width: '400px' }}>
            <h3> <Icon.FiAlertTriangle style={{ fontSize: '25px', margin: '5px' }} /> שגיאה </h3>
            {m}

        </div>;
        setAlert(alertShow);
        setIsAlert('true');
    }
    const editData = () => {

        if (number !== '' && manufacturer !== '' && type !== '' && test !== '' && entry !== '' && remarks !== '') {

            if (number.match(/^[0-9]+$/) === null) {
                MakeMessage('מספר רכב חייב להכיל מספרים בלבד')
            }
            else {

                let vehicle = { VehicleNumber: number, Manufacturer: manufacturer, Type: type, TestValidityDate: test, EntryCompany: entry, Remarks: remarks, Img: img };
                postData(vehicle);
            }

        }
        else {
            let alertShow = <div style={{ fontSize: '17px', marginTop: '10px', backgroundColor: 'red', color: 'white', direction: 'rtl', borderRadius: '5mm', width: '400px' }}>
                <h3> <Icon.FiAlertTriangle style={{ fontSize: '25px', margin: '5px' }} /> שגיאה </h3>
                יש להזין את כל פרטי הרכב במערכת.
            </div>;
            setAlert(alertShow);
            setIsAlert('true');
        }
    }



    const postData = (vehicle) => {
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(vehicle),
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
                    newCard();


                },
                (error) => {
                    console.log("err post=", error);
                });

    }
    const newCard = () => {
        const card = <VehiclesCard type='new' number={number} manufacturer={manufacturer} vtype={type} test={test} entry={entry} remarks={remarks} img={img} />
        setCard(card);
    }
    const getManufacturers = () => {
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
                    console.log("fetch gett All Manu= ", result);
                    setAllManu(result);

                },
                (error) => {
                    console.log("err post=", error);
                });

    }
    const getTypes = () => {
        fetch(apiUrl3, {
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
                    console.log("fetch gett All Types= ", result);
                    setAllTypes(result);

                },
                (error) => {
                    console.log("err post=", error);
                });

    }
    const manu2str = () => {
        let str = allManu.map((m, ind) => (<Dropdown.Item key={ind} eventKey={m.Manufacturer}>{m.Manufacturer}</Dropdown.Item>))
        setAllManuStr(str);
    }
    const type2str = () => {
        let str = allTypes.map((t, ind) => (<Dropdown.Item key={ind} eventKey={t.Type}>{t.Type}</Dropdown.Item>))
        setAllTypeStr(str);
    }
    const showSelected = (e) => {
        setSelected(e);
        setManufacturer(e);


    }
    const showSelected1 = (e) => {
        setSelected1(e);
        setType(e);


    }

    useEffect(() => getManufacturers(), []);
    useEffect(() => getTypes(), []);
    useEffect(() => manu2str(), [allManu]);
    useEffect(() => type2str(), [allTypes]);
    return (
        <div>
            <Navbar />
            <div className='pageEmp'>
                <h3 className='header'>הוספת רכב חדש למערכת</h3>
                <br/>
                <div className='container'>
                    <div className='row'>
                        <div style={{ marginLeft: '20%' }} className='col'>
                            {card}
                        </div>
                        <div style={{ marginRight: '17%', marginTop: '3mm' }} className='col'>
                            <input className='txtBox' type='text' placeholder='מספר רכב' onClick={checkAlert} onChange={txtchgNumber}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='תאריך תוקף טסט' onClick={checkAlert} onChange={txtchgTest}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='תאריך כניסה לחברה' onClick={checkAlert} onChange={txtchgEntry}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='הערות מיוחדות' onClick={checkAlert} onChange={txtchgRemarks}></input>
                            <br />

                            <div className='row'>
                                <div className='col' >
                                    <DropdownButton style={{ textAlign: 'center', direction: 'rtl', marginTop: '50px', marginLeft: '50px' }} variant="success" title={selected} onSelect={showSelected}>
                                        {allManuStr}
                                    </DropdownButton>
                                </div>
                                <div className='col'>
                                    <DropdownButton style={{ textAlign: 'center', direction: 'rtl', marginTop: '50px', marginRight: '50px' }} variant="success" title={selected1} onSelect={showSelected1}>
                                        {allTypeStr}
                                    </DropdownButton>
                                </div>


                            </div>

                            <button style={{ marginTop: '50px' }} className='buttonOk' type="button" class="btn btn-outline-light" onClick={editData} > הוסף רכב</button>
                        </div>
                    </div>
                    <div style={{justifyContent:'right', marginRight:'220px', marginTop:'10px'}} className='row'>
                        {alert}
                    </div>

                </div>


            </div>
        </div>
    )
}
