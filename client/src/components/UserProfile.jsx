import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import movieFunctions from "../api/index"

export const UserProfile = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Profile babes { id }</h1>
        </div>
    );
}
