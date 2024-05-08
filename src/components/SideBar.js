import { useState } from "react";
import { Link } from "react-router-dom";
import './SideBar.css'

export default function SideBar() {

    const [activeLink, setActiveLink] = useState(0);
    
    return (
        <div className="overflow-auto">
            <ul className="side">
                <Link to='channels' className={`text-decoration-none text-black ${activeLink === 1 ? 'activelink' : ''}`} >
                    <li onClick={() => setActiveLink(1)}> Channels</li>
                </Link>
                <Link to='topics' className={`text-decoration-none text-black ${activeLink === 2 ? 'activelink' : ''}`} >
                    <li onClick={() => setActiveLink(2)}>Topics</li>
                </Link>
                <Link to='users' className={`text-decoration-none text-black ${activeLink === 3 ? 'activelink' : ''}`} >
                    <li onClick={() => setActiveLink(3)}>Users</li>
                </Link>
            </ul>
        </div>
    )
}