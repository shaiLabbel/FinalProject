import { React, useState, useEffect } from 'react';
import EmployeeCard from './EmployeeCard';
import '../CssFiles/EmployeesPage.css';

export default function EmployeesShow() {
    const [Employees, setEmployees] = useState([]);
    const apiUrl = 'http://localhost:57268/api/Employees';

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
                    result.map(st => console.log(st.FirstName));
                    setEmployees(result);
                },
                (error) => {
                    console.log("err post=", error);
                });

    }

    useEffect(() => getAll(), []);
    let CardStr = Employees.map((emp, ind) => (<EmployeeCard type='show' key={ind} id={emp.Id} num={emp.EmployeeNumber} firstName={emp.FirstName} lastName={emp.LastName} phone={emp.PhoneNumber} mail={emp.Mail} date={emp.StartWorking} img={emp.Img} access={emp.ManagerAccess}/>));
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
