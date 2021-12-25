import React, { useState } from 'react';
import { ReactSession } from 'react-client-session';

export const EditBoardPopup = (props) => {
    const [boardname, setBoardName] = useState('');
    const [boarddescrip, setBoardDescrip] = useState('');
    const [boardID, setBoardID] = useState('');
    const userid = ReactSession.get("userid");

    let showPopup = props.value;
    let data = props.data;

    if (showPopup) {
        const handleSaveButton = () => { 
            const data = {
                'userID': userid,
                'boardID': boardID,
                'title': boardname,
                'description': boarddescrip
            }
    
            fetch('http://localhost:3060/authentication/profile/editboard/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then((response) => {
                return response.json()
            }).then((response) => { 
                setBoardID(response)
            })
        }

        const handleDelete = () => { 
            const data = {
                'userID': userid,
                'boardID': boardID,
            }
    
            fetch('http://localhost:3060/authentication/profile/editboard/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then((response) => {
                return response.json()
            }).then((response) => { 
                setBoardID(response)
            })
        }
    
        return (
            <div>
                <div><button onClick={handleDelete}>delete board</button></div>
                <div>
                    <label htmlFor="boardname">Change your board's name</label>
                    <br />
                    <input
                        type="text"
                        id='boardname'
                        onChange={(e) => setBoardName(e.target.value)}
                    />
                    <br />
                    <br />
                    <label htmlFor="boarddescrip">Change your board's a description</label>
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
            </div>
        )
    } else { 
        return (
            <div>
            </div>
        )
    }
}
