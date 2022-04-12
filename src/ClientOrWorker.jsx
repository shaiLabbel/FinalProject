import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';


export default function ClientOrDriver() {

    const navigate = useNavigate();

    return (
        <div className='App-header'>
            <div style={{ border: '3px solid white', padding: 30, borderRadius: 15, backgroundColor:'#fbab3e'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                </svg>
                <h1 style={{ margin: 20 }}>כניסה למערכת</h1>
                <button onClick={() => { navigate('SignInClient') }} style={{ margin: 10 }} type="button" class="btn btn-outline-light">אני לקוח</button>
                <button onClick={() => { navigate('SignInWorker') }} type="button" class="btn btn-outline-light">אני עובד</button>
            </div>
        </div>

    )
}
