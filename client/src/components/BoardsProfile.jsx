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
        let imgsrc = null;
        let imgalt = null;
        console.log('zoo tycoon', i.pins)
        if (i.pins[0].poster != '') {
            imgsrc = i.pins[0].poster;
            imgalt = i.pins.title
        } else { 
            let index = Math.floor(Math.random() * 6)
            imgsrc = images[index];
            imgalt = 'theater image';
        }
        
        return (
            <div className='board-contianer-profile'>
                <img className="poster" src={ imgsrc } alt={ imgalt } />
                <Link to={`/profile/${userid}/board/${i._id}`}>
                    <h3>{ i.title }</h3>
                </Link>
            </div>)
      });

    return (
        <div className='boards-container'>
            {allBoards}
        </div>
    )
}
