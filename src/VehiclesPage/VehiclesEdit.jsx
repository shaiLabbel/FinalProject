import { React, useState } from 'react';
import Navbar from '../Navbar';
import VehiclesCard from './VehiclesCard';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as Icon from 'react-icons/fi';
import * as Icon1 from 'react-icons/ri';


export default function VehiclesEdit() {
    const navigate = useNavigate();
    const { state } = useLocation();
    let vObj = state;
    const apiUrl = 'http://localhost:57268/api/Vehicles/' + vObj.number
    const [alertMessage, setAlertMessage] = useState("");
    const [test, setTest] = useState(vObj.test);
    const [entry, setEntry] = useState(vObj.entry);
    const [remarks, setRemarks] = useState(vObj.remarks);
    const [img, setImg] = useState(vObj.img);
    const [card, setCard] = useState(<VehiclesCard number={vObj.number} manufacturer={vObj.manufacturer}
        vtype={vObj.vtype} test={vObj.test} entry={vObj.entry} remarks={vObj.remarks} img={vObj.img} />);

    const txtchgEntry = (e) => { setEntry(e.target.value) };
    const txtchgTest = (e) => { setTest(e.target.value) };
    const txtchgRemarks = (e) => { setRemarks(e.target.value) };
    const txtchgImg = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImg(URL.createObjectURL(img))
        }

    };

    const newCard = () => {
        const card = <VehiclesCard type='edit' number={vObj.number} manufacturer={vObj.manufacturer}
            vtype={vObj.vtype} test={test} entry={entry} remarks={remarks} img={img} />
        setCard(card);
    }

    const btnOk = () => {
        let vehicle = {
            TestValidityDate: test,
            EntryCompany: entry,
            Remarks: remarks,
            Img: img
        };
        insert2Db(vehicle);
    }
    const insert2Db = (v) => {
        fetch(apiUrl, {
            method: 'PUT',
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
                    console.log("fetch vehicles Put= ", result);
                    setAlertMessage(
                        <div className='editAlert'>
                            רכב התעדכן בהצלחה!
                            <br />
                            <button onClick={() => (navigate('/VehiclesPage'))} className='backButton'><Icon1.RiArrowGoBackLine /> חזור לדף הרכבים</button>

                        </div>);




                },
                (error) => {
                    console.log("err vehicles Put=", error);
                    setAlertMessage(<div className='editAlert'>
                        שגיאה, נסה שנית!
                    </div>);
                });

    }

    const btnCancel = () => {
        const card = <VehiclesCard type='edit' number={vObj.number} manufacturer={vObj.manufacturer}
            vtype={vObj.vtype} test={vObj.test} entry={vObj.entry} remarks={vObj.remarks} img={vObj.img} />
        setCard(card);
        setAlertMessage(<div className='editAlert'>
            כרטיס הרכב אופס ללא כל שינויים
            <br />
            <button onClick={() => (navigate('/VehiclesPage'))} className='backButton'><Icon1.RiArrowGoBackLine /> חזור לדף הרכבים</button>

        </div>)
    }

    return (
        <div>
            <Navbar />
            <div className='pageEmp'>
                <h3 className='header'>עריכת רכב</h3>
                <div className='container'>
                    <div className='row'>
                        <div className='col' >
                            <button onClick={btnOk} className='editButtonOk'><Icon.FiUserCheck style={{ margin: 10 }} />לחץ לאישור סופי</button>
                            <button onClick={btnCancel} className='editButtonCancel'><Icon.FiUserX style={{ margin: 10 }} />לחץ לביטול כל השינויים</button>
                            {alertMessage}
                        </div>
                        <div style={{ marginLeft: '200px' }} className='col'>
                            {card}
                        </div>
                        <div style={{ marginRight: '150px' }} className='col'>
                            <p>מספר רכב:</p>
                            <input className='txtBoxE' type='text' placeholder={vObj.number} readOnly={true}></input>
                            <p>יצרן:</p>
                            <input className='txtBoxE' type='text' placeholder={vObj.manufacturer} readOnly={true} ></input>
                            <p>סוג הרכב: </p>
                            <input className='txtBoxE' type='text' placeholder={vObj.vtype} readOnly={true} ></input>
                            <p>תוקף טסט: </p>
                            <input className='txtBoxE' type='text' placeholder={vObj.test} onChange={txtchgTest}></input>
                            <p>תאריך כניסה לחברה:</p>
                            <input className='txtBoxE' type='text' placeholder={vObj.entry} onChange={txtchgEntry}></input>
                            <p>הערות:</p>
                            <input className='txtBoxE' type='text' placeholder={vObj.remarks} onChange={txtchgRemarks}></input>
                            <div style={{ width: '219.6px', height: '34px', marginLeft: 40 }} class="mb-3">
                                <label style={{ margin: 0, fontSize: '15px' }} for="formFileSm" class="form-label">: תמונת רכב</label>
                                <input onChange={txtchgImg} class="form-control form-control-sm" id="formFileSm" type="file" />
                            </div>

                            <button style={{ marginTop: '50px' }} type="button" class="btn btn-outline-light" onClick={newCard} >ערוך לתצוגה</button>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}