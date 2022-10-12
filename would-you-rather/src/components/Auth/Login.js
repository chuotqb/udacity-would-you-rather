import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../../logo.svg';
import { useDispatch, useSelector } from "react-redux";
import { getUsers, authedUser } from "../../slices/usersSlice";
import { useNavigate, useLocation } from 'react-router-dom';
import { getQuestions } from "../../slices/questionSlice";



const Login = () => {
    const [id, setID] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.users);
    const questions = useSelector((state) => state.questions);
    const {state} = useLocation();

    useEffect(() => {
        if (!users.listUser) {
            dispatch(getUsers());
        }

        if (!questions.listQuestion) {
            dispatch(getQuestions());
        }
    }, []);

    const handleSelectUser = (e) => {
        setID(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authedUser(id));
        navigate(state.path || "/");
    }



    return (
        <Card className="col-md-5 mx-auto mt-5" border="info" style={{ width: '30rem', height: 'auto' }}>
            <Card.Header className="my-auto">
                <h4 className="text-center">Welcome to the Would You Rather App!</h4>
                <p className="text-center">Please sign in to countinue </p>
            </Card.Header>
            <Card.Body>
                <Card.Img variant="top" src={logo} className="App-logo" alt="logo" />
                <Card.Title className="text-center fs-2 text-success">Sign In</Card.Title>
                <Card.Text className="text-center w-100">
                    <Form.Select aria-label="Default select example"
                        value={id}
                        onChange={handleSelectUser}
                        as="select"
                        label="Choose your account"
                    >
                        <option value="">Select User</option>
                        {
                            users.listUser && Object.values(users.listUser).map(user => {
                                return (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                )
                            })
                        }
                    </Form.Select>
                    <Button className="mt-2 w-100" variant="success" onClick={handleSubmit} >Sign In</Button>
                </Card.Text>
            </Card.Body>
        </Card >
    )
}

export default Login;

