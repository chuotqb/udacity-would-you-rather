import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from "react-redux";
import { saveQuestion } from "../../slices/questionSlice";
import { useNavigate } from "react-router-dom";

const FormAddQuestion = () => {
    const users = useSelector((state) => state.users);
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeOptionOne = (e) => {
        setOptionOne(e.target.value);
    }

    const changeOptionTwo = (e) => {
        setOptionTwo(e.target.value);
    }

    const addQuestion = async(e) => {
        e.preventDefault()
        const optionOneText = optionOne;
        const optionTwoText = optionTwo;
        const question = {
            optionOneText,
            optionTwoText,
            author: users.receiveUser.id,
        }
        await dispatch(
            saveQuestion(question)
        )
        navigate("/home")
    }


    return (
        <Card className="container mx-auto mt-5" style={{ width: '50rem' }}>
            <Card.Header className="row fs-2 fw-bold justify-content-center">Create New Question</Card.Header>
            <Card.Body className="row justify-content-center">
                <Card.Text className="row">
                    Complete the question:
                </Card.Text>
                <div className="row">
                    <Card.Title className="row fw-bold">Would you rather ...</Card.Title>
                    <Form className="mt-2">
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Enter Option One Text Here" onChange={changeOptionOne} value={optionOne}/>
                        </Form.Group>
                        <Card.Text className="row fw-bold justify-content-center">
                            OR
                        </Card.Text>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Enter Option Two Text Here"  onChange={changeOptionTwo} value={optionTwo}/>
                        </Form.Group>
                        <Button variant="outline-success w-100 mt-2" type="submit" onClick={addQuestion} disabled={!optionTwo}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </Card.Body>
        </Card>
    )
}

export default FormAddQuestion;