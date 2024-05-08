import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TopicService from "./TopicService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const topicService = new TopicService();


function ImagePreview({ image }) {
    return (
        <div className="modal modal-md fade" id="myModal" role="dialog" >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Image Preview</h5>
                        <button type="button" className="close btn btn-primary" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <img src={image} alt="No Media Found." className="w-100 h-auto"></img>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function AddTopic() {

    const [topiclist, setTopicList] = useState([]);
    const [dcDocument, setDcDocument] = useState([]);
    const [image, setImage] = useState('');

    useEffect(() => {
        topicService.getTopicsFromDC()
            .then((res) => { setTopicList(res.data) })
            .catch((err) => alert(err))
    }, [])

    const navigate = useNavigate();


    const topicOptionList = topiclist.map((topic) => {
        return (
            <option key={topic.doccodeid} value={[topic.doccodeid, topic.doccodename]}>{topic.doccodename}</option>
        )
    })

    const documentList = dcDocument.map((document) => {
        return (
            <option key={document.id} value={document.id}>{document.documenttitle}</option>
        )
    });

    // function for preview image
    const onSelected = (e) => {
        e.target.size = 1
        e.target.blur()
        let payload = { designProductid: e.target.value };
        console.log(payload)
        topicService.getDocumentImage(payload)
            .then((res) => {
                if (res.data === 'wrong dpid') {
                    alert(res.data);
                }
                else {
                    setImage(res.data.imageB64);
                }
            })
            .catch((err) => {
                if (err.response.status === 500) {
                    alert('An Error Occurred!')
                }
            })
    };


    const formSubmission = (e) => {
        e.preventDefault();
        let topicDetails = e.target.elements[0].value.split(',');
        let topicId = topicDetails[0];
        let topicName = topicDetails[1];
        let description = e.target.elements[1].value;
        let content = e.target.elements[2].value;

        let payload = {id: topicId, name: topicName, description: description, contents: content, userid: localStorage.getItem('userid') };
        topicService.addTopic(payload)
            .then((res) => {
                if (res.data === 'Topic Created.') {
                    navigate('/admin/topics')
                    window.location.reload(false)
                }
            })
            .catch((err) =>{
                if (err.response.status === 400){
                    toast.error("Topic Already Exists")
                }
            })
    };

    const onTopicChanged = (e) => {
        let topic_id = e.target.value.split(',')[0];
        let payload = { topic_id: topic_id };
        topicService.getDcDocuments(payload)
            .then((res) => {
                setDcDocument(res.data)
            })
            .catch((err) => alert(err))

    };


    return (
        <>
            <ToastContainer />
            <div className="m-2 d-flex justify-content-between">
                <h2>Add Topic Component</h2>
                <button className="btn btn-primary" onClick={() => navigate('/admin/topics')}>Back to Topics</button>
            </div>
            <div className="bg-white rounded mt-3 mb-3">
                <form className="p-3 addTopic" onSubmit={formSubmission}>
                    <h4 className="mb-2">Add Topic:</h4>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="topicName" className="mb-2 mt-1">Topic Name</label>
                            <select id="topicName" className="form-select" onClick={onTopicChanged} onFocus={() => {document.getElementById('topicInitialOption').disabled = true}}>
                                <option id='topicInitialOption'>Select Topic Here..</option>
                                {topicOptionList}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="topicDescription" className="mb-1 mt-1">Topic Description</label>
                        <textarea id="topicDescription" className="form-control" placeholder="Enter Topic Description..."></textarea>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="selectContentId" className="mb-1 mt-1">Select Items</label>
                            <select id='selectContentId' className="form-select" onClick={onSelected} onFocus={() => {document.getElementById('contentInitialOption').disabled = true}}>
                                <option id='contentInitialOption'>Select Content Document Here...</option>
                                {documentList}
                            </select>
                        </div>
                    </div>
                    <div className="form-check mt-2">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" data-toggle="modal" data-target="#myModal" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Show Preview</label>
                        <ImagePreview image={image} />
                    </div>
                    <div className="d-grid mt-4">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}