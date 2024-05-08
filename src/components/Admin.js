import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import SideBar from "./SideBar";

export default function Admin() {
    return (
        <>
            <Header />
                <div className="row">
                    <div className="col-2 position-absolute bottom-0 start-0 overflow-auto p-0 m-1" style={{top: '55px' }}>
                        <SideBar />
                    </div>
                    <div className="col-10 position-absolute  bottom-0 end-0 overflow-auto" style={{ backgroundColor: '#c5cbd4', top: '55px'}} >
                        <Outlet />
                    </div>
                </div>
        </>
    )
}