import React, { useEffect, useState } from "react";

import UserService from "../modules/users/UserService";

const userService = new UserService();

export default function Profile() {

    const [profileDetails, setProfileDetails] = useState({});

    useEffect(() => {
        let payload = { user_id: localStorage.getItem('userid') }
        userService.getUserInfo(payload)
            .then((res) => {
                if(res.status === 202){
                    setProfileDetails(res.data)
                }
                else{
                    alert(res.data)
                }
            })
            .catch((err) => alert(err))
    }, [])

    return (
        <div className="modal fade" id="myProfileModal" tabIndex="-1" role="dialog" >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">My Profile</h5>
                        <button type="button" className="close btn btn-primary" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="userName">Username:</label>
                                <input type="text" className="form-control" id="userName" defaultValue={profileDetails.username} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name:</label>
                                <input type="text" className="form-control" id="firstName" defaultValue={profileDetails.firstname} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name:</label>
                                <input type="text" className="form-control" id="lastName" defaultValue={profileDetails.lastname} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Role:</label>
                                <input type="text" className="form-control" id="role" defaultValue={profileDetails.role} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>

    )
}