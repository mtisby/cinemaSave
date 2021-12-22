import React, { useState } from 'react';
import { ReactSession } from 'react-client-session';

export const BoardPopup = (props) => {
    const [boardname, setBoardName] = useState('');
    const [boarddescrip, setBoardDescrip] = useState('');
    const userid = ReactSession.get("userid");

    const handleSaveButton = () => { 
        console.log(boardname)
        const data = {
            'title': boardname,
            'description': boarddescrip,
            'userID': userid
        }

        fetch('http://localhost:3060/authentication/profile/addboard/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((response) => {
            console.log(response)
        })
    }

    if (props.value) {
        return (
            <div>
                <label htmlFor="boardname">Name your board</label>
                <br />
                <input
                    type="text"
                    id='boardname'
                    onChange={(e) => setBoardName(e.target.value)}
                />
                <br />
                <br />
                <label htmlFor="boarddescrip">Give your board a description</label>
                <br />
                <input
                    type="text"
                    id='boarddescrip'
                    onChange={(e) => setBoardDescrip(e.target.value)}
                />
                <br />
                <br />
                <button onClick={handleSaveButton}> save </button>
            </div>
        )
    }
    else { 
        return (
            <div></div>
        )
    }
}
// onChange={(e) => setPassword(e.target.value)