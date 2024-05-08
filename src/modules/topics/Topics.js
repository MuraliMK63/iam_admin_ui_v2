import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TopicService from "./TopicService";
import TopicTable from "./TopicTable";

const topicService = new TopicService();

export default function Topics() {

    const [activeTopics, setActiveTopics] = useState(0);
    const [aTopics, setATopics] = useState([]);
    const [dTopics, setDTopics] = useState([]);


    useEffect(() => {
        topicService.getTopics()
            .then((res) => {
                setATopics(res.data.active);
                setDTopics(res.data.inactive);
            })
    }, [])

    const navigate = useNavigate();

    const activeTopicRows = aTopics.map((topic) => {
        return (
            <tr key={topic.id}>
                <td className="text-center" ><input type="checkbox" value={topic.id} /></td>
                <td>{topic.id}</td>
                <td>{topic.name}</td>
                <td>{topic.description}</td>
                <td>{topic.contents}</td>
            </tr>
        )
    })

    const deactiveTopicRows = dTopics.map((topic) => {
        return(
        <tr key={topic.id}>
            <td className="text-center" ><input type="checkbox" value={topic.id} /></td>
            <td>{topic.id}</td>
            <td>{topic.name}</td>
            <td>{topic.description}</td>
            <td>{topic.contents}</td>
        </tr>
        )
    });

    const selectAll = (e) => {
        let tbody = document.getElementById('topicTableBody')
       for (let iter = 0; iter< tbody.children.length; iter++){
            let eachCheckBox = tbody.children[iter].children[0].children[0]
             eachCheckBox.checked = e.target.checked ? true : false
        }
    }

    const tableHeaders = <>
        <th><input type="checkbox" className="d-block m-auto" onClick={selectAll}/></th>
        <th>S.No</th>
        <th>Topic Name</th>
        <th>Topic Description</th>
        <th>Content Id</th>

    </>


    return (
        <>
            <div className="d-flex justify-content-between m-2">
                <h2>Topic Component</h2>
                <button className="btn btn-primary" onClick={() => navigate('addTopic')}>Add Topic</button>
            </div>
            <TopicTable
                heading={activeTopics === 0 ? 'Active Topics' : 'Inactive Topics'}
                thead={tableHeaders}
                tdata={activeTopics === 0 ? activeTopicRows : deactiveTopicRows}
                active={activeTopics}
                setActive={setActiveTopics} />
        </>
    )
}
