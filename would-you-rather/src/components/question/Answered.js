import React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import ListAnswered from "./ListAnswered";

const Answered = () => {
    const receiveUser = useSelector((state) => state.users.receiveUser);
    const listQuestion = useSelector((state) => state.questions.listQuestion);
    const ListAnsweredQuestion = useMemo(() => {
        return listQuestion && Object.values(listQuestion).sort((a, b) => b.timestamp - a.timestamp).filter((question) =>
            [...question.optionOne.votes, ...question.optionTwo.votes].includes(
                receiveUser.id
            )
        )
    }, [listQuestion]);

    return (
        <div>
            {
                ListAnsweredQuestion && ListAnsweredQuestion.map((question) => (
                    <div key={question.id} >
                        <ListAnswered {...question} />
                    </div>
                ))
            }
        </div>
    )
}

export default Answered;
