import React from "react";
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UnAnswered from "../components/question/UnAnswered";
import Answered from "../components/question/Answered";
import { useSelector } from "react-redux";


const HomePage = () => {
    const users = useSelector((state) => state.users);
    return (
        <Card style={{ width: '50rem' }} className="mx-auto mt-5">
            <Tabs
                defaultActiveKey="unAnsweredQuestion"
                id="uncontrolled-tab-example"
                className="mb-3 nav-justified"
            >
                <Tab eventKey="unAnsweredQuestion" title="UnAnswered Question">
                    <div className="mx-3 my-3">
                        <UnAnswered />
                    </div>

                </Tab>
                <Tab eventKey="answeredQuestion" title="Answered Question">
                    <div className="mx-3 my-3">
                        <Answered />
                    </div>
                </Tab>
            </Tabs>
        </Card>
    )
}

export default HomePage;