import React, { useEffect, useState } from "react";

import DashBoardService from "./DashBoardService";

const dashBoardService = new DashBoardService();

export default function DashBoard(){

    const[allCount, setAllCount] = useState([]);

    useEffect(() => {
        dashBoardService.totalEntityCount()
                        .then((res) => setAllCount(res.data))
                        .catch((err) => alert(err))
    }, []);



    return(
        <>
            <h2>DashBoard Component</h2>
            <div className="row">
                <div className="col-lg-4 col-sm-6 " >
                    <div className="m-2 p-2 rounded" style={{backgroundColor: '#548ae8'}}>
                        <h4>Channels</h4>
                        <div className="pt-4">
                            <p>No Of Active Channels: {allCount[0]}</p>
                            <p>No Of In-Active Channels: {allCount[1]}</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-sm-6" >
                    <div className="m-2 p-2 rounded" style={{backgroundColor: '#c471f5'}}>
                        <h4 >Topics</h4>
                        <div className="pt-4">
                            <p>No Of Active Topics: {allCount[2]}</p>
                            <p>No Of In-Active Topics: {allCount[3]}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6" >
                    <div className="m-2 p-2 rounded" style={{backgroundColor: '#75f07c'}}>
                        <h4>Users</h4>
                        <div className="pt-4">
                            <p>No Of Active Users: {allCount[4]}</p>
                            <p>No Of In-Active Users: {allCount[5]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}