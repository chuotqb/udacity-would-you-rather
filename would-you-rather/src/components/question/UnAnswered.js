import { useMemo } from "react";
import { useSelector } from "react-redux";
import ListUnAnswered from "./ListUnAnswered";

const UnAnswered = () => {
    const receiveUser = useSelector((state) => state.users.receiveUser);
    const listQuestion = useSelector((state) => state.questions.listQuestion);
    const ListUnAnsweredQuestion = useMemo(() => {
        return Object.values(listQuestion).filter((question) =>
            ![...question.optionOne.votes, ...question.optionTwo.votes].includes(
                receiveUser.id
            )
        )
    }, [listQuestion]);

    return (
        <div>
            {
                ListUnAnsweredQuestion.map((question) => (
                    <div key={question.id} >
                        <ListUnAnswered {...question} />
                    </div>
                ))
            }
        </div>
    )
}

export default UnAnswered;
