import React, { useEffect, useState } from "react";
import UserService from "../modules/users/UserService";

const userService = new UserService();

export default function History() {

    const [historyDetails, setHistoryDetails] = useState([]);
    const [noHistory, setNoHistory] = useState(null);

    useEffect(() => {
        let payload = {user_id : localStorage.getItem('userid')}
        userService.getHistoryInfo(payload)
            .then((res) => {
                if(res.data !== 'No History Found.' ){
                    setHistoryDetails(res.data)
                }
                else{
                    setNoHistory(res.data)
                }
            })
    }, []);

    const eachHistoryRow = historyDetails.map((row, ind) => {
        return(
            <li key={ind} className="alert alert-success d-flex justify-content-between" >
                <span>{row.action}</span>
                <span>{row.time.slice(0, 5)}</span>
            </li>
        )
    });

    const noHistoryTemplate = <p className="alert alert-warning">{noHistory}</p>

    return (
        <div className="modal fade" id="myHistoryModal" tabIndex="-1" role="dialog" aria-hidden="true" >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">My History</h5>
                        <button type="button" className="close btn btn-primary" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ul className="list-group">
                            {noHistory === null ? eachHistoryRow : noHistoryTemplate}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}