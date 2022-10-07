import React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import ListAnswered from "./ListAnswered";

const Answered = () => {
    const receiveUser = useSelector((state) => state.users.receiveUser);
    const listQuestion = useSelector((state) => state.questions.listQuestion);
    const ListAnsweredQuestion = useMemo(() => {
        return Object.values(listQuestion).filter((question) =>
            [...question.optionOne.votes, ...question.optionTwo.votes].includes(
                receiveUser.id
            )
        )
    }, [listQuestion]);
    return (
        <div>
            {
                ListAnsweredQuestion.map((question) => (
                    <div key={question.id} >
                        <ListAnswered {...question} />
                    </div>
                ))
            }
        </div>
    )
}

export default Answered;
