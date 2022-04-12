import { React, useState, useEffect } from 'react';
import '../CssFiles/EmployeesPage.css';
import VehiclesCard from './VehiclesCard';

export default function VehiclesShow() {
    const [vehicles, setVehicles] = useState([]);

    const apiUrl = 'http://localhost:57268/api/Vehicles';

    const getAll = () => {
        fetch(apiUrl, {
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
                    result.map(v => console.log(v.VehicleNumber));
                    setVehicles(result);

                },
                (error) => {
                    console.log("err post=", error);
                });

    }
    let CardStr = vehicles.map((v, ind) => (<VehiclesCard type='show'key={ind} number={v.VehicleNumber} manufacturer={v.Manufacturer} vtype={v.Type} test={v.TestValidityDate} entry={v.EntryCompany} remarks={v.Remarks} img={v.Img}  />));
    useEffect(() => getAll(), []);



    return (
        <div >
            <div className='container'>
                <div className='row'>
                {CardStr}
                </div>
            </div>
        </div>

    )
}
