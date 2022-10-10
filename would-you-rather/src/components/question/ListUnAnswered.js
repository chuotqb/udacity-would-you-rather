import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { saveQuestionAnswer } from "../../slices/questionSlice";
import { useNavigate } from "react-router-dom"

const ListUnAnswered = (props) => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { id, author, optionOne, optionTwo } = props;
    const users = useSelector((state) => state.users);
    const [answer, setAnswer] = useState({ typeAnswer: "", another: "another" });
    const { typeAnswer } = answer;
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setAnswer("");
    }

    const handleChange = e => {
        e.persist();
        setAnswer(prevState => ({
            ...prevState,
            typeAnswer: e.target.value
        }));
    };

    const onSubmit = () => {
        dispatch(
            saveQuestionAnswer({ authedUser: users.receiveUser.id, qid: id, answer: typeAnswer })
        )
        navigate(`/questions/${id}`)
    }

    return (
        <>
            <Card className="container">
                <Card.Header className="row fs-5">{users.listUser[author] === undefined ? '' : users.listUser[author].name} asks:</Card.Header>
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
                    <Modal.Title>{users.listUser[author] === undefined ? '' : users.listUser[author].name}ask:</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Card className="container">
                        <div className="row">
                            <div className="col-3 d-flex justify-content-center">
                                <Card.Img variant="top" src={users.listUser[author] === undefined ? '' : users.listUser[author].avatarURL} className="rounded-circle m-2" style={{ width: '80px', height: '80px' }} alt="Avatar" />
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <Card.Title className="row">Would you rather</Card.Title>
                                    <Form.Group controlId="typeAnswer">
                                        <Form.Check
                                            value="optionOne"
                                            label={optionOne === undefined ? '' : optionOne.text}
                                            type='radio'
                                            onChange={handleChange}
                                            checked={typeAnswer === "optionOne"}

                                        />
                                        <Form.Check
                                            value="optionTwo"
                                            label={optionTwo === undefined ? '' : optionTwo.text}
                                            type='radio'
                                            onChange={handleChange}
                                            checked={typeAnswer === "optionTwo"}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit} disabled={!answer}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ListUnAnswered;