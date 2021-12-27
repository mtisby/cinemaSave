import React, { useEffect, useState } from 'react';
import movieFunctions from "../api/index.js";
import { Link } from 'react-router-dom';
import {images} from '../scripts/image.js'

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
    
    const allBoards = boards.map((i) => {
        let bkImg = false;
        console.log(i.pins[0])
        if (i.pins[0].poster) { 
            bkImg = true;
        }

        console.log(bkImg)
        return (
            <div className='board-contianer-profile'>
                <Link to={`/profile/${userid}/board/${i._id}`}>
                    <div style={bkImg ? { backgroundImage: i.pins[0].poster } : {}}>
                        <h3>{ i.title }</h3>
                    </div>
                </Link>
            </div>)
      });

    return (
        <div className='boards-container'>
            {allBoards}
        </div>
    )
}
