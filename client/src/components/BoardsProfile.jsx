import React, { useEffect, useState } from 'react';
import movieFunctions from "../api/index.js";
import { Link } from 'react-router-dom';

export const BoardsProfile = (props) => {
    const userid = props.data;
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        movieFunctions
          .getProfileBoards(userid)
          .then((response) => {
            console.log('promise fulfilled')
            return response.data
          })
          .then((response) => {
            setBoards(response)
          })
    }, []);
    
    console.log(boards)
    const allBoards = boards.map((i) => {
        return (
            <div className='board-contianer-profile'>
                <Link to={`/profile/${userid}/board/${i._id}`}>
                    <h3>{ i.title }</h3>
                </Link>
            </div>)
      });

    return (
        <div>
            <div>
                {allBoards}
            </div>
        </div>
    )
}
