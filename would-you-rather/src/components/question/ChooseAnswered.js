import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux'
import { saveQuestionAnswer } from "../../slices/questionSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const ChooseAnswered = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const listQuestion = useSelector((state) => state.questions.listQuestion);
    const thisQuestion = listQuestion[params.question_id]
    const [answer, setAnswer] = useState({ typeAnswer: "", another: "another" });
    const navigate = useNavigate();
    const { typeAnswer } = answer;


    const handleChange = e => {
        e.persist();
        setAnswer(prevState => ({
            ...prevState,
            typeAnswer: e.target.value
        }));
    };

    const onSubmit = () => {
        dispatch(
            saveQuestionAnswer({ authedUser: users.receiveUser.id, qid: params.question_id, answer: typeAnswer })
        )
        navigate("/home")
    }


    return (
        <Card className="container mt-5" style={{ width: '50rem' }}>
            <Card.Header className="row fs-5">{users.listUser[thisQuestion.author] === undefined ? '' : users.listUser[thisQuestion.author].name} asks:</Card.Header>
            <div className="row my-3">
                <div className="col-3 d-flex justify-content-center">
                    <Card.Img variant="top" src={users.listUser[thisQuestion.author] === undefined ? '' : users.listUser[thisQuestion.author].avatarURL} className="rounded-circle m-2" style={{ width: '120px', height: '120px' }} alt="Avatar" />
                </div>
                <div className="col-9">
                    <div className="row">
                        <Card.Title className="row ">Would you rather</Card.Title>
                        <Form.Group controlId="typeAnswer">
                            <Form.Check
                                value="optionOne"
                                label={thisQuestion.optionOne === undefined ? '' : thisQuestion.optionOne.text}
                                type='radio'
                                onChange={handleChange}
                                checked={typeAnswer === "optionOne"}

                            />
                            <Form.Check
                                value="optionTwo"
                                label={thisQuestion.optionTwo === undefined ? '' : thisQuestion.optionTwo.text}
                                type='radio'
                                onChange={handleChange}
                                checked={typeAnswer === "optionTwo"}
                            />
                        </Form.Group>
                    </div>
                    <div>
                    <Button variant="outline-success" className="row w-100" onClick={onSubmit} disabled={!answer}>Submit</Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ChooseAnswered;