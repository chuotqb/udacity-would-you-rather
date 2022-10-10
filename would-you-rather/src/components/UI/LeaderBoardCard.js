import React from "react";
import Card from 'react-bootstrap/Card';
import { useSelector } from "react-redux";

const LeaderBoardCard = () => {
    const users = useSelector((state) => state.users.listUser);
    
    const handleListBoard = () => {
        const leaderBoardSort = Object.values(users).map(user => ({
            ...user,
            questionCount: Object.values(user.questions).length,
            answerCount: Object.values(user.answers).length,
        })).sort((a, b) => (a.questionCount + a.answerCount) - (b.questionCount + b.answerCount))
            .reverse()
        return leaderBoardSort;
    }

    return (
        <>
            {
                handleListBoard().map((user) => (
                    <Card key={user.id} >
                        <Card.Body className="row" key={user.id}>
                            <div className="col-3 d-flex justify-content-center">
                                <Card.Img variant="top" src={user.avatarURL === undefined ? '' : user.avatarURL} className="rounded-circle" style={{ width: '140px' }} alt="Avatar" />
                            </div>
                            <div className="vertical-line col-7">
                                <div className="row">
                                    <Card.Title className="row fs-2">{user.name === undefined ? '' : user.name}</Card.Title>
                                    <div className="row">
                                        <div className="row">
                                            <Card.Text className="col">
                                                Answered question
                                            </Card.Text>
                                            <Card.Text className="col text-end">
                                                {user.answers === undefined ? '' : Object.keys(user.answers).length}
                                            </Card.Text>
                                        </div>
                                        <hr></hr>
                                        <div className="row">
                                            <Card.Text className="col">
                                                Created question
                                            </Card.Text>
                                            <Card.Text className="col text-end">
                                                {user.questions === undefined ? '' : user.questions.length}
                                            </Card.Text>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <Card className="row h-100">
                                    <Card.Header className="col fs-5 text-center">Score</Card.Header>
                                    <Card.Body className="col d-flex justify-content-center">
                                        <Card.Text className="h-100 rounded-circle text-center pt-3" style={{ backgroundColor: '#50a79b', width: '60px', color: 'white' }}>
                                            {(user.questions === undefined && user.answers === undefined) ? '' : (Object.keys(user.answers).length + user.questions.length)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
        </>
    )
}

export default LeaderBoardCard;