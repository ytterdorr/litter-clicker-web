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
            {isLoading
                ? <h3>Loading...</h3>
                : <div>
                    <h3>{sessionData.session_name}</h3>
                    <MapDisplay
                        data={sessionData.items}
                    ></MapDisplay>
                    <SummaryVisual sumObject={sessionData.itemSum}></SummaryVisual>
                    {/* <div>{JSON.stringify(sessionData)}</div> */}
                </div>}
        </div>
    )
}

export default SessionDataView