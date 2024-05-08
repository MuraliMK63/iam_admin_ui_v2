import React, { useEffect, useState } from "react";

import UserService from "./UserService";

import UserTable from "./UserTable";


const userService = new UserService();
export default function Users() {

    const [activeUsers, setActiveUsers] = useState(0);
    const [aUsers, setAUsers] = useState([]);
    const [dUsers, setDUsers] = useState([]);

    useEffect(() => {
        userService.getUser()
            .then((res) => {
                setAUsers(res.data.active);
                setDUsers(res.data.inactive);
            })
    }, []);

    const selectAll = (e) => {
        let tbody = document.getElementById('userTableBody')
       for (let iter = 0; iter< tbody.children.length; iter++){
            let eachCheckBox = tbody.children[iter].children[0].children[0]
             eachCheckBox.checked = e.target.checked ? true : false
        }
    }

    const tableHeaders = <>
        <th><input type="checkbox" className="d-block m-auto" onClick={selectAll} /></th>
        <th>S.No</th>
        <th>Username</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Role</th>
    </>

    const activeUserRows = aUsers.map((user) => {
        return (
            <tr key={user.id}>
                <td className="text-center"><input type="checkbox" value={user.id} /></td>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.role}</td>
            </tr>
        )
    });

    const deactiveUserRows = dUsers.map((user) => {
        return (
            <tr key={user.id}>
                <td className="text-center"><input type="checkbox" value={user.id} /></td>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.role}</td>
            </tr>
        )
    });


    return (
        <>
            <div className="d-flex justify-content-between m-2">
                <h2>User Component</h2>
            </div>
            <UserTable
                heading={activeUsers === 0 ? 'Active Users' : 'Inactive Users'}
                thead={tableHeaders}
                tdata={activeUsers === 0 ? activeUserRows : deactiveUserRows}
                active={activeUsers}
                setActive={setActiveUsers}
            />
        </>
    )
}