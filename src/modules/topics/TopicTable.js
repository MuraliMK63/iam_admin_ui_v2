import React, { useEffect, useState } from "react";

import TopicService from "./TopicService";

const topicService = new TopicService();

export default function TopicTable({ heading, thead, tdata, active, setActive }) {

    
    const [pageItems, setPageItems] = useState(5);
    const [currentRows, setCurrentRows] = useState([]);
    const [pageNumberList, setPageNumberList] = useState([])

    useEffect(() => {
        setCurrentRows(tdata.slice(0 * pageItems, 0 + pageItems))

        let pageNumberList = [];
        for (let iter = 0; iter < Math.ceil(tdata.length / pageItems); iter++) {
            pageNumberList.push(iter);
        }

        setPageNumberList(pageNumberList);


    }, [tdata, pageItems]);


    const pageChanger = (page) => {
        // setPageNo(page);
        setCurrentRows(tdata.slice(page * pageItems, page * pageItems + pageItems))
    }


    const requiredButtons = pageNumberList.map((pageNo) => {
        return (
            <button key={pageNo} className="btn btn-primary m-1" value={pageNo} onClick={() => pageChanger(pageNo)}>
                {pageNo + 1}
            </button>
        )
    })


    const deActivateTopic = () => {
        let tbody = document.getElementById('topicTableBody')
        let selectedRows = []

        for (let iter = 0; iter < tbody.children.length; iter++) {
            let currentRow = tbody.children[iter].children[0].children[0];
            if (currentRow.checked) {
                selectedRows.push(parseInt(currentRow.value))
            };
        };

        let payload = { topic_id: selectedRows }
        topicService.deactivateTopic(payload)
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

    const activateTopic = () => {
        let tbody = document.getElementById('topicTableBody')
        let selectedRows = []

        for (let iter = 0; iter < tbody.children.length; iter++) {
            let currentRow = tbody.children[iter].children[0].children[0];
            if (currentRow.checked) {
                selectedRows.push(parseInt(currentRow.value))
            };
        };

        let payload = { topic_id: selectedRows }
        topicService.activateTopics(payload)
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
                    <li className={`col rounded ${active === 0 ? 'selected' : ''}`} onClick={() => setActive(0)}>Active Topics</li>
                    <li className={`col rounded ${active === 1 ? 'selected' : ''}`} onClick={() => setActive(1)}>Inactive Topics</li>
                </div>
                <div className="m-1 rounded" style={{ backgroundColor: '#c5cbd4' }}>
                    <div className="d-flex justify-content-between m-2 p-2">
                        <h5>{heading}</h5>
                        <button className="btn btn-primary" onClick={active === 0 ? deActivateTopic : activateTopic}>{active === 0 ? 'Deactivate' : 'Activate'}</button>
                    </div>
                    <table className="table table-sm table-bordered table-hover overflow-auto">
                        <thead>
                            <tr>
                                {thead}
                            </tr>
                        </thead>
                        <tbody id="topicTableBody">
                            {currentRows}
                        </tbody>
                    </table>
                </div>
                    {requiredButtons}
            </div>
        </>
    )
}