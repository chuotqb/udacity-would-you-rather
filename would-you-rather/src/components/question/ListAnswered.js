import React from "react";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

const ListAnswered = (props) => {
    const { author, optionOne, id } = props;
    const users = useSelector((state) => state.users);
    const navigate = useNavigate();

    const onViewDetail = () => {
        navigate(`/questions/${id}`)
    }

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
                            <Button variant="outline-success" className="row mx-auto" onClick={onViewDetail}>View Poll</Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )

}

export default ListAnswered;