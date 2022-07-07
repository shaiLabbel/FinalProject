import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './CssFiles/signIn.css';

export default function SignInWorker() {
    const styles = ({ txtBox: { border: '1px solid white', borderRadius: 15, textAlign: 'center', fontWeight: 'lighter' } })

    const navigate = useNavigate();
    const [inputNumber, setInputNumber] = useState();
    const [inputId, setInputId] = useState();
    const [employee, setEmployee] = useState();
    const [message, setMessage] = useState();

    const txtchgEmpNum = (e) => { setInputNumber(e.target.value) };
    const txtchgEmpId = (e) => { setInputId(e.target.value) };
    const getEmployee = () => {
        const apiUrl = 'https://proj.ruppin.ac.il/bgroup93/prod/api/Employees/' + inputNumber;
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
                if (res.ok === false) {
                    setMessage(<div class="alert alert-primary d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <div>
                            מספר עובד זה לא נמצא במערכת
                        </div>
                    </div>)
                }

                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetchgettEmployee= ", result);
                    setEmployee({ Id: result.Id, num: result.EmployeeNumber, access:result.ManagerAccess });

                },
                (error) => {
                    console.log("err post=", error);


                });

    }
    const check = () => {
        getEmployee();
        if(employee.access!=='כן'){
            console.log('אין גישת מנהל')
            setMessage(<div class="alert alert-primary d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <div>
                למספר עובד זה אין גישת מנהל
            </div>
        </div>) 
        }
        else if (employee.Id !== inputId) {
            setMessage(<div class="alert alert-primary d-flex align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div>
                    תעודת זהות אינה תואמת את מספר העובד
                </div>
            </div>)
        }
        else if (employee.Id === inputId) { navigate('/HomeManager') };

    }

    return (
        <div className='App-header'>
            <div style={{ border: '3px solid white', padding: 30, borderRadius: 15, backgroundColor:'#778899'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                </svg>
                <h1 style={{ margin: 20 }}>כניסת מנהל למערכת</h1>
                <input onChange={txtchgEmpNum} style={styles.txtBox} type='text' placeholder='מספר עובד'></input>
                <br />
                <br />
                <input onChange={txtchgEmpId} style={styles.txtBox} type='text' placeholder='תעודת זהות'></input>
                <br />
                <br />
                <button style={{ margin: 10 }} type="button" class="btn btn-outline-light" onClick={check}>כניסה</button>
                <div>{message}</div>
            </div>
            <button className='back' onClick={()=>navigate('/')}>חזור לשינוי גישה </button>
        </div>


    )

}


