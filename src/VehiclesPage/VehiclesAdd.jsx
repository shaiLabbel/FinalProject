import { React, useState, useEffect } from 'react';
import Navbar from '../Navbar';
import VehiclesCard from './VehiclesCard';
import { Dropdown } from 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default function VehiclesAdd() {

    const apiUrl = 'http://localhost:57268/api/Vehicles';
    const apiUrl2 = 'http://localhost:57268/api/Manufacturers';
    const [number, setNumber] = useState();
    const [manufacturer, setManufacturer] = useState();
    const[allManu, setAllManu]=useState([]);
    const[allManuStr, setAllManuStr]=useState("");
    const [selected, setSelected] = useState('יצרן');
    const [type, setType] = useState();
    const [test, setTest] = useState();
    const [entry, setEntry] = useState();
    const [remarks, setRemarks] = useState();
    const [img, setImg] = useState('https://previews.123rf.com/images/jovanas/jovanas1602/jovanas160201079/52031569-%EB%B2%84%EC%8A%A4-%EC%9B%90%ED%98%95-%EC%95%84%EC%9D%B4%EC%BD%98.jpg');
    const [card, setCard] = useState(<VehiclesCard img={'https://previews.123rf.com/images/jovanas/jovanas1602/jovanas160201079/52031569-%EB%B2%84%EC%8A%A4-%EC%9B%90%ED%98%95-%EC%95%84%EC%9D%B4%EC%BD%98.jpg'} />);

    const txtchgNumber = (e) => { setNumber(e.target.value) };
    const txtchgTest = (e) => { setTest(e.target.value) };
    const txtchgEntry = (e) => { setEntry(e.target.value) }
    const txtchgRemarks = (e) => { setRemarks(e.target.value) };
    const txtchgImg = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImg(URL.createObjectURL(img))
        }

    };

    const editData = () => {
        let vehicle = { VehicleNumber: number, Manufacturer: manufacturer, Type: type, TestValidityDate: test, EntryCompany: entry, Remarks: remarks, Img: img };
        postData(vehicle);
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
                    console.log("fetchgettAll= ", result);
                    setAllManu(result);
                    
                },
                (error) => {
                    console.log("err post=", error);
                });

    }
    const manu2str = () => {
        let str = allManu.map((m, ind) => (<Dropdown.Item key={ind} eventKey={m.Manufacturer}>{m.Manufacturer}</Dropdown.Item>))
        setAllManuStr(str);
    }
    const showSelected = (e) => {
        setSelected(e);
        setManufacturer(e); 
             

    }

    useEffect(() => getManufacturers(), []);
    useEffect(() => manu2str(), [allManu]);
    return (
        <div>
            <Navbar />
            <div className='pageEmp'>
                <h3 className='header'>הוספת רכב חדש למערכת</h3>
                <div className='container'>
                    <div className='row'>
                        <div style={{ marginLeft: '20%' }} className='col'>
                            {card}
                        </div>
                        <div style={{ marginRight: '17%', marginTop: '3mm' }} className='col'>
                            <input className='txtBox' type='text' placeholder='מספר רכב' onChange={txtchgNumber}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='תאריך תוקף טסט' onChange={txtchgTest}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='תאריך כניסה לחברה' onChange={txtchgEntry}></input>
                            <br />
                            <input className='txtBox' type='text' placeholder='הערות מיוחדות' onChange={txtchgRemarks}></input>
                            <br />
                            <div style={{ width: '266.8px', height: '40.64px', marginLeft: 61 }} class="mb-3">
                                <label style={{ margin: 0, color: 'grey' }} for="formFileSm" class="form-label">:הוסף תמונה </label>
                                <input onChange={txtchgImg} class="form-control form-control-sm" id="formFileSm" type="file" />
                            </div>
                            <DropdownButton style={{ textAlign:'center', direction: 'rtl', marginTop:'50px'}} variant="success" title={selected} onSelect={showSelected}>
                                {allManuStr}
                            </DropdownButton>
                            <div style={{ color: 'grey', fontSize:'20px', marginTop:'15px' }}>
                                <input type="radio" value="מיניבוס" name="gender" /> אוטובוס
                                <input type="radio" value="מידיבוס" name="gender" /> מיניבוס
                                <input type="radio" value="לימוזינבוס" name="gender" /> מידיבוס
                                <input type="radio" value="אוטובוס" name="gender" /> לימוזינבוס
                            </div>
                            <button style={{ margin: 5 }} type="button" class="btn btn-outline-light" onClick={editData} > הוסף רכב</button>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}
