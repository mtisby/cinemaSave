import React, { useEffect } from 'react';
import movieFunctions from "../api/index.js";

export const BoardsProfile = (props) => {
    const userid = props.data

    useEffect(() => {
        movieFunctions
          .getProfileBoards(userid)
          .then((response) => {
            console.log('promise fulfilled')
            return response.data
          })
          .then((response) => {
           console.log('RESPONSE', response)
          })
      }, []);

    return (
        <div>
            <h1>Hi love!</h1>
        </div>
    )
}
