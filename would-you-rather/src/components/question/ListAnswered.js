import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal';

const ListAnswered = (props) => {
    const [show, setShow] = useState(false);
    const { author, optionOne, optionTwo } = props;
    const users = useSelector((state) => state.users);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    const sumVote = optionOne.votes.length + optionTwo.votes.length

    const percentVoteOne = (optionOne.votes.length / (sumVote)) * 100;
    const perventVoteTwo = 100 - percentVoteOne;


    return (
        <>
            <Card className="container">
                <Card.Header className="row fs-5">{users.listUser[author] === undefined ? '' : users.listUser[author].name} asks</Card.Header>
                <Card.Body className="row">
                    <div className="col-3 d-flex justify-content-center">
                        <Card.Img variant="top" src={users.listUser[author] === undefined ? '' : users.listUser[author].avatarURL} className="rounded-circle" style={{ width: '140px' }} alt="Avatar" />
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <Card.Title className="row">Would you rather</Card.Title>
                            <Card.Text className="row">
                                {optionOne === undefined ? '' : optionOne.text} Or ...
                            </Card.Text>
                            <Button variant="outline-success" className="row mx-auto" onClick={handleShow}>View Poll</Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Asked by {users.listUser[author] === undefined ? '' : users.listUser[author].name}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Card className="container">
                        <div className="row">
                            <div className="col-4 d-flex justify-content-center align-items-center">
                                <Card.Img variant="top" src={users.listUser[author] === undefined ? '' : users.listUser[author].avatarURL} className="rounded-circle m-2" style={{ width: '100px', height: '100px' }} alt="Avatar" />
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <h3 className="row">Results</h3>
                                    <div className="row border border-primary rounded">
                                        <h5 className="row text-success mt-2">
                                            {optionOne === undefined ? '' : optionOne.text}
                                        </h5>
                                        <div className="progress p-0 mt-2">
                                            <div className="progress-bar bg-info" style={{ width: '65%' }}>{percentVoteOne}%</div>
                                        </div>
                                        <p className="fw-bold text-center mt-2">{optionOne.votes.length} out of {sumVote} votes</p>
                                    </div>
                                    <div className="row border border-primary rounded mt-3 mb-2">
                                        <h5 className="row text-success mt-2">
                                            {optionTwo === undefined ? '' : optionTwo.text}
                                        </h5>
                                        <div className="progress p-0 mt-2">
                                            <div className="progress-bar bg-info" style={{ width: '65%' }}>{perventVoteTwo}%</div>
                                        </div>
                                        <p className="fw-bold text-center mt-2">{optionTwo.votes.length} out of {sumVote} votes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ListAnswered;