import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ChannelService from "./ChannelService";
import Table from "./Table";

const channelService = new ChannelService();

export default function Channels() {

    const [activeChannel, setActiveChannel] = useState(0);
    const [aChannels, setAChannels] = useState([]);
    const [dChannels, setDChannels] = useState([]);

    useEffect(() => {
        channelService.getChannels()
            .then((res) => {
                setAChannels(res.data.active);
                setDChannels(res.data.inactive)
            })
    }, [])

    const navigate = useNavigate();

    const selectAll = (e) => {
        let tbody = document.getElementById('channelTableBody')
        for (let iter = 0; iter< tbody.children.length; iter++){
            let eachCheckBox = tbody.children[iter].children[0].children[0]
            eachCheckBox.checked = e.target.checked ? true : false
        }
    }

    const tableHeaders = <>
        <th><input type="checkbox" className="d-block m-auto" onClick={selectAll}/></th>
        <th>S.No</th>
        <th>Channel Name</th>
        <th>Channel Description</th>
        <th>Topics List</th>
    </>

    const activeChannelRows = aChannels.map((channel) => {
        return(
            <tr key={channel.id}>
                <td className="text-center" ><input type="checkbox"  value={channel.id}/></td>
                <td>{channel.id}</td>
                <td>{channel.name}</td>
                <td>{channel.description}</td>
                <td>{channel.topics.join(', ')}</td>
            </tr>
        )
    })

    const deActiveChannelRows = dChannels.map((channel) => {
        return(
            <tr key={channel.id}>
                <td className="text-center"><input type="checkbox"  value={channel.id}/></td>
                <td>{channel.id}</td>
                <td>{channel.name}</td>
                <td>{channel.description}</td>
                <td>{channel.topics.join(', ')}</td>
            </tr>
        )
    })

    return (
        <>
            <div className="d-flex justify-content-between m-2">
                <h2>Channel Component</h2>
                <button className="btn btn-primary" onClick={() => navigate('addChannel')}>Add Channel</button>
            </div>
            <Table
                heading={activeChannel === 0 ? 'Active Channels' : 'Inactive Channels'}
                active={activeChannel}
                setActive={setActiveChannel} 
                thead={tableHeaders}
                tdata={activeChannel === 0 ? activeChannelRows : deActiveChannelRows } 
            />
        </>
    )
}
