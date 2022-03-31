import React from 'react';
import { useParams } from 'react-router-dom';

const SessionDataView = ({ route, navigation }) => {

    const { sessionId } = useParams()
    console.log(sessionId)


    return (
        <div>
            <h2>
                Session Data View
            </h2>
            <div>sessionId: {sessionId}</div>
        </div>
    )
}

export default SessionDataView