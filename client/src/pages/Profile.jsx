import React, { useEffect, useState } from 'react'
import movieFunctions from "../api/index.js"
import { UserProfile } from '../components/UserProfile.jsx';

function Profile() {
  
    return (
        <div className="profile">
          <a href="/home">link to home</a>
          <h1>I am profile</h1>
          <UserProfile />
        </div>
      );
}
  
export default Profile;
  
