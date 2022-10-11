import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import AnsweredItem from "../components/question/AnsweredItem";
import ChooseAnswered from "../components/question/ChooseAnswered";

const PollPage = () => {
    const params = useParams();
    const users = useSelector((state) => state.users);
    return (
        <>
         {
            users.receiveUser.answers[params.question_id] ? (
                <AnsweredItem/>
            ):
            (
                <ChooseAnswered/>
            )
        }
        </>
       
    )
}

export default PollPage;