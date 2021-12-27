import React, { useEffect, useState } from 'react';
import movieFunctions from "../api/index.js";
import { Link } from 'react-router-dom';
import {images} from '../scripts/image.js'

export const BoardsProfile = (props) => {
    const userid = props.data;
    const [boards, setBoards] = useState([]);

    console.log('am i even working?')

    useEffect(() => {
        movieFunctions
          .getProfileBoards(userid)
          .then((response) => {
            console.log('promise fulfilled')
            return response.data
          })
        .then((response) => {
            setBoards(response.boards)
            console.log(response)
          })
    }, []);
    
    const allBoards = boards.map((i) => {
        let bkImg = false;
        console.log('zoo tycoon', i.pins)
        if (i.pins[0].poster != '') { 
            bkImg = true;
        }
        
        return (
            <div className='board-contianer-profile'>
                <Link to={`/profile/${userid}/board/${i._id}`}>
                    <div style={bkImg ? { backgroundImage: `url(${i.pins[0].poster})` } : { backgroundImage: `url(${images[0]})` }}>
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
