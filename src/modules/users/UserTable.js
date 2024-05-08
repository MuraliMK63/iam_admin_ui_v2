import React from "react";

import UserService from "./UserService";

const userService = new UserService();

export default function UserTable({ heading, thead, tdata, active, setActive }) {

    const deActivateUser = () => {
        let tbody = document.getElementById('userTableBody')
        let selectedRows = []

        for (let iter = 0; iter < tbody.children.length; iter++) {
            let currentRow = tbody.children[iter].children[0].children[0];
            if (currentRow.checked) {
                selectedRows.push(parseInt(currentRow.value))
            };
        };

        let payload = { user_id: selectedRows }
        userService.deactivateUsers(payload)
            .then((res) => {
                if (res.data === 'Deactivated Sucessfully.') {
                    window.location.reload(false)
                }
                else {
                    alert(res.data)
                }
            })
            .catch((err) => alert(err))
    }

    const activateUser = () => {
        let tbody = document.getElementById('userTableBody')
        let selectedRows = []

        for (let iter = 0; iter < tbody.children.length; iter++) {
            let currentRow = tbody.children[iter].children[0].children[0];
            if (currentRow.checked) {
                selectedRows.push(parseInt(currentRow.value))
            };
        };

        let payload = { user_id: selectedRows }
        userService.activateUsers(payload)
            .then((res) => {
                if (res.data === 'Activated Sucessfully.') {
                    window.location.reload(false)
                }
                else {
                    alert(res.data)
                }
            })
            .catch((err) => alert(err))
    }

    return (
        <>
            <div className="bg-white h-75 mb-2 mt-3 overflow-auto p-2 rounded">
                <div className="row p-1 topnav m-1 rounded" >
                    <li className={`col rounded ${active === 0 ? 'selected' : ''}`} onClick={() => setActive(0)}>Active Users</li>
                    <li className={`col rounded ${active === 1 ? 'selected' : ''}`} onClick={() => setActive(1)}>Inactive Users</li>
                </div>
                <div className="m-1 rounded" style={{ backgroundColor: '#c5cbd4' }}>
                    <div className="d-flex justify-content-between m-2 p-2">
                        <h5>{heading}</h5>
                        <button className="btn btn-primary" onClick={active === 0 ? deActivateUser : activateUser}>{active === 0 ? 'Deactivate' : 'Activate'}</button>
                    </div>
                    <table className="table table-sm table-bordered table-hover overflow-auto">
                        <thead>
                            <tr>
                                {thead}
                            </tr>
                        </thead>
                        <tbody id="userTableBody">
                            {tdata}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}