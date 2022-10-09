import { useMemo } from "react";
import { useSelector } from "react-redux";
import ListUnAnswered from "./ListUnAnswered";

const UnAnswered = () => {
    const receiveUser = useSelector((state) => state.users.receiveUser);
    const listQuestion = useSelector((state) => state.questions.listQuestion);
    const ListUnAnsweredQuestion = useMemo(() => {
        return listQuestion && Object.values(listQuestion).sort((a, b) => b.timestamp - a.timestamp).filter((question) =>
            ![...question.optionOne.votes, ...question.optionTwo.votes].includes(
                receiveUser.id
            )
        )
    }, [listQuestion]);

    return (
        <div>
            {
                ListUnAnsweredQuestion && ListUnAnsweredQuestion.map((question) => (
                    <div key={question.id} >
                        <ListUnAnswered {...question} />
                    </div>
                ))
            }
        </div>
    )
}

export default UnAnswered;
