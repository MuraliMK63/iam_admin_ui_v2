import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Profile from "./Profile";
import History from "./History";

export default function Header() {

    const navigate = useNavigate();

    return (
        <div className="p-1 d-flex justify-content-between" style={{ backgroundColor: '#52a6c4' }}>
            <h2><Link to='/admin' className="text-decoration-none text-black">Iam Admin</Link></h2>
            <div>
                <button className="btn btn-primary me-2" data-toggle="modal" data-target="#myProfileModal">My Profile</button>
                <Profile />
                <button className="btn btn-primary me-2" data-toggle="modal" data-target="#myHistoryModal">History</button>
                <History />
                <button className="btn btn-primary me-2" onClick={() => {navigate('/'); localStorage.removeItem('userid')}}>Logout</button>
            </div>
        </div>
    )
}