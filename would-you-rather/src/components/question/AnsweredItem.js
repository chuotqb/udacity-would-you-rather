import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";

const AnsweredItem = () => {
    const params = useParams();
    const listQuestion = useSelector((state) => state.questions.listQuestion);
    const users = useSelector((state) => state.users);
    const thisQuestion = listQuestion[params.question_id]
    const sumVote = thisQuestion.optionOne.votes.length + thisQuestion.optionTwo.votes.length;
    const percentVoteOne = (thisQuestion.optionOne.votes.length / (sumVote)) * 100;
    const percentVoteTwo = 100 - percentVoteOne;

    return (
        <Card className="container mt-5" style={{ width: '50rem' }}>
            <Card.Header className="row fs-5">{thisQuestion.author === undefined ? '' : users.listUser[thisQuestion.author].name} asks</Card.Header>
            <div className="row">
                <div className="col-4 d-flex justify-content-center align-items-center">
                    <Card.Img variant="top" src={thisQuestion.author === undefined ? '' : users.listUser[thisQuestion.author].avatarURL} className="rounded-circle m-2" style={{ width: '180px', height: '180px' }} alt="Avatar" />
                </div>
                <div className="col-8">
                    <div className="row">
                        <h3 className="row">Results</h3>
                        <div className="row border border-primary rounded" style={{ backgroundColor: thisQuestion.author !== undefined && users.receiveUser.answers[params.question_id] === 'optionOne' ? '#e3f8f9' : '#ffffff' }}>
                            <h5 className="row text-success mt-2">
                                {thisQuestion.optionOne === undefined ? '' : thisQuestion.optionOne.text}
                            </h5>
                            <div className="progress p-0 mt-2">
                                <div className="progress-bar bg-info" style={{ width: `${percentVoteOne}%` }}>{percentVoteOne}%</div>
                            </div>
                            <p className="fw-bold text-center mt-2">{thisQuestion.optionOne.votes.length} out of {sumVote} votes</p>
                        </div>
                        <div className="row border border-primary rounded mt-3 mb-2" style={{ backgroundColor: thisQuestion.author !== undefined && users.receiveUser.answers[params.question_id] === 'optionTwo' ? '#e3f8f9' : '#ffffff' }}>
                            <h5 className="row text-success mt-2">
                                {thisQuestion.optionTwo === undefined ? '' : thisQuestion.optionTwo.text}
                            </h5>
                            <div className="progress p-0 mt-2">
                                <div className="progress-bar bg-info" style={{ width: `${percentVoteTwo}%` }}>{percentVoteTwo}%</div>
                            </div>
                            <p className="fw-bold text-center mt-2">{thisQuestion.optionTwo.votes.length} out of {sumVote} votes</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )

}

export default AnsweredItem;