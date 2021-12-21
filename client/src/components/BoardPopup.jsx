import React from 'react'

export const BoardPopup = (props) => {
    if (props.value) {
        return (
            <div>
                <h1>I am popup</h1>
                <p>{props.value}</p>
            </div>
        )
    }
    else { 
        return (
            <div></div>
        )
    }
}
