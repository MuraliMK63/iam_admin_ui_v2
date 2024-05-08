import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ChannelService from "./ChannelService";
import LeftArrow from '../../assets/icons/leftsidearrow.png';
import RightArrow from '../../assets/icons/rightsidearrow.png';



const channelService = new ChannelService();

export default function AddChannel() {

    const [businessUnit, setBusinessUnit] = useState([]);
    const [docCode, setDocCode] = useState([]);
    const [selectedDocCode, setSelectedDocCode] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        channelService.getBusinessUnitList()
            .then((res) => {
                setBusinessUnit(res.data);
            })
            .catch((err) => alert(err))
    }, []);

    const channelList = businessUnit.map((bu) => {
        return (
            <option key={bu.id} value={[bu.id, bu.name]}>{bu.name}</option>
        )
    });

    const topicList = docCode.map((doccode) => {
        return (
            <option key={doccode.doccodeid} value={doccode.doccodeid}>{doccode.doccodename}</option>
        )
    });

    const selectedTopicList = selectedDocCode.map((sdoccode) => {
        return (
            <option key={sdoccode.doccodeid} value={sdoccode.doccodeid}>{sdoccode.doccodename}</option>
        )
    })



    const formHandler = (e) => {
        e.preventDefault();
        let channelDetails = e.target.elements[0].value.split(',')
        let channelId = channelDetails[0]
        let channelName = channelDetails[1]
        let channelDesc = e.target.elements[1].value;
        let topicList = []
        let topics = e.target.elements[3]
        for(let iter = 0; iter<topics.length; iter++){
            topicList.push(parseInt(topics[iter].value))
        }
        let payload = { id: channelId, name: channelName, description: channelDesc, topics: topicList, userid: localStorage.getItem('userid') };
        channelService.addChannel(payload)
            .then((res) => {
                if (res.data === 'Channel Created.') {
                    navigate('/admin/channels')
                    window.location.reload(false)
                }
                else {
                    alert(res.data);
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    toast.error('Channel Already Exists.')
                };
            })
    };

    const getTopics = (e) => {
        let channel_id = e.target.value.split(',')[0];
        let payload = { channel_id: channel_id }
        channelService.getTopicsFromDc(payload)
            .then((res) => {setDocCode(res.data); setSelectedDocCode([])})
            .catch((err) => toast.error(err))

    }

    const selectItems = () => {
        let selections = document.getElementById('selectedTopics').selectedOptions;
        let selectValues = []
        let selectedIds = []
        for (let iter = 0; iter < selections.length; iter++) {
            selectedIds.push(parseInt(selections[iter].value))
            selectValues.push({ doccodeid: selections[iter].value, doccodename: selections[iter].text });
        }

        setDocCode(docCode.filter((doccode) => {
            if (selectedIds.includes(parseInt(doccode.doccodeid))) { return null }
            else { return doccode }
        }))

        setSelectedDocCode(selectedDocCode.concat(selectValues))
    }

    const deSelectItems = () => {
        let deselections = document.getElementById('deselectedTopics').selectedOptions;
        let deselectValues = []
        let deselectedIds = []
        for (let iter = 0; iter < deselections.length; iter++) {
            deselectedIds.push(parseInt(deselections[iter].value))
            deselectValues.push({ doccodeid: deselections[iter].value, doccodename: deselections[iter].text });
        }
        setSelectedDocCode(selectedDocCode.filter((sdoccode) => {
            if (deselectedIds.includes(parseInt(sdoccode.doccodeid))) {return null}
            else {return sdoccode}
        }));

        setDocCode(docCode.concat(deselectValues));
    };


    const disableDefault = () => {
        let channelSelect = document.getElementById('initialOption')
        channelSelect.disabled = true
    }

    return (
        <>
            <ToastContainer />
            <div className="m-2 d-flex justify-content-between">
                <h2>Add Channel Component</h2>
                <button className="btn btn-primary" onClick={() => navigate('/admin/channels')}>Back to Channels</button>
            </div>
            <div className="bg-white m-auto mt-3 rounded ">
                <form className="p-3" onSubmit={formHandler}>
                    <h4 className="mb-2">Add Channel:</h4>
                    <div className="row mb-2">
                        <div className="form-group ">
                            <label htmlFor='channelName' className="mb-2">Channel Name:</label>
                            <select id="channelName" className="form-select" onClick={getTopics} onFocus={disableDefault}>
                                <option className="text-muted"  id='initialOption'>Select Channel Here..</option>
                                {channelList}
                            </select>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="form-group ">
                            <label htmlFor='channelDesc' className="mb-2" >Description:</label>
                            <textarea id='channelDesc' placeholder="Enter Description.." className="form-control" required></textarea>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="form-group col-sm-5">
                            <label htmlFor='selectedTopics' className="mb-2" >Select Topics:</label>
                            <select id="selectedTopics" className="form-select" multiple>
                                {topicList}
                            </select>
                        </div>
                        <div className="col-sm-1 mt-5 text-center">
                            <img src={RightArrow} alt="rightArrow" className="mb-2 ms-2 d-block" width={30} style={{ cursor: 'pointer' }} onClick={selectItems}></img>
                            <img src={LeftArrow} alt="leftArrow" className="mb-2 ms-2 d-block" width={30} style={{ cursor: 'pointer' }} onClick={deSelectItems}></img>
                        </div>
                        <div className="form-group col-sm-5">
                            <label htmlFor='deselectedTopics' className="mb-2" >Deselect Topics:</label>
                            <select id="deselectedTopics" className="form-select" multiple>
                                {selectedTopicList}
                            </select>
                        </div>
                    </div>
                    <div className="d-grid mt-3">
                        <button type="submit" className="btn btn-primary">Add Channel</button>
                    </div>
                </form>
            </div>
        </>
    )
}