import React from 'react'
import * as Icon from 'react-icons/fa';

export default function WorkSchedule() {

    return (
        <div
            style={{ border: '3px solid white', padding: 30, borderRadius: 15, backgroundColor: '#d38218', direction: 'rtl', margin:40 }}>
            סידור עבודה שבועי:
           <br/>
           
           <button style={{margin:5}} type="button" class="btn btn-outline-light">ראשון</button>
           <button style={{margin:5}} type="button" class="btn btn-outline-light">שני</button>
           <button style={{margin:5}} type="button" class="btn btn-outline-light">שלישי</button>
           <button style={{margin:5}} type="button" class="btn btn-outline-light">רביעי</button>
           <button style={{margin:5}} type="button" class="btn btn-outline-light">חמישי</button>
           <button style={{margin:5}} type="button" class="btn btn-outline-light">שישי</button>
           <button style={{margin:5}} type="button" class="btn btn-outline-light">שבת</button>
          
          
        </div>
    )
}
