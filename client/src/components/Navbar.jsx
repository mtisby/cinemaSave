import React from 'react'
import { Link } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

export const Navbar = () => {
    const userid = ReactSession.get("userid");
    return (
        <div className='navbar'>
            <div className='home'>
                <Link className='navbar-link' to="/home"><img src="https://res.cloudinary.com/dr0ofxgkz/image/upload/v1640657226/cinema-save/logo/266805495_593009852001789_9140452071824781120_n_obfvmh.png" alt="cinema-save-logo" /> </Link>
                <Link className='navbar-link' to="/home">
                    <p>Home</p>
                </Link>
            </div>

            <div><input type="search" /></div>

            <div>
                <Link className='navbar-link' to={`/profile/${userid}`}>Profile</Link>
            </div>
        </div>
    )
}
