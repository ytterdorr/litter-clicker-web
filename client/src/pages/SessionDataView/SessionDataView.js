import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MockSingleSession } from '../../assets/MockData';
import SummaryVisual from '../../components/SummaryVisual';
import MapDisplay from '../../components/MapDisplay';


const useMock = true;

const SessionDataView = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [sessionData, setSessionData] = useState({});
    const { sessionId } = useParams()
    console.log(sessionId)

    useEffect(() => {
        const getSessionDataById = async (sessionId) => {
            if (useMock) {
                setSessionData(MockSingleSession);
                setIsLoading(false);
                return
            }
            // TODO: Call server



        }
        getSessionDataById(sessionId);
    })

    return (
        <div>
            <h2>
                Session Data View
            </h2>
            <div>sessionId: {sessionId}</div>
            {isLoading
                ? <h3>Loading...</h3>
                : <div>
                    <MapDisplay
                        data={sessionData.items}
                    ></MapDisplay>
                    <SummaryVisual sumObject={sessionData.itemSum}></SummaryVisual>
                    <div>{JSON.stringify(sessionData)}</div>
                </div>}
        </div>
    )
}

export default SessionDataView