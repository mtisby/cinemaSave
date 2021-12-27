import React, { useEffect, useState } from 'react';
import movieFunctions from "../api/index.js";
import { Link } from 'react-router-dom';
import {images} from '../scripts/image.js'

export const BoardsProfile = (props) => {
    const userid = props.data;
    const [boards, setBoards] = useState([]);
    const [bkImg, setBkgImg] = useState(Boolean);

    const boardStyle = {
        backgroundImage: 'url(' + images[0] + ')',
    }

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
        if (i.pins[0]){ 
            setBkgImg(true)
        }

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
