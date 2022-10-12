import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import AnsweredItem from "../components/question/AnsweredItem";
import ChooseAnswered from "../components/question/ChooseAnswered";
import NotFoundPage from "./NotFoundPage";

const PollPage = () => {
    const params = useParams();
    const users = useSelector((state) => state.users);
    const listQuestion = useSelector((state) => state.questions.listQuestion);
    if(!listQuestion[params.question_id]){
        return (
            <NotFoundPage/>
        )
    }
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