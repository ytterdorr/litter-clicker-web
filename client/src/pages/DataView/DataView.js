import React, { useState, useEffect } from 'react';
import { NavigationType } from 'react-router-dom';
import DataDisplay from './DataDisplay';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { MockSessions, MockSessionNames } from './MockData';

const DataView = ({ navigation }) => {
    // TODO: data should just be a summary object
    const [data, setData] = useState([]); // List of sessions with items 
    const [sessionNames, setSessionNames] = useState([]); // List of [{}]
    const [isLoading, setIsLoading] = useState(true);
    const useMock = true;

    useEffect(() => {
        // Get data from backend
        const getMockData = async () => {
            // const mockData = await fetch('./MockData.json')
            //     .then(response => {
            //         return response.json();
            //     })
            //     .then(jsonData => console.log(jsonData))
            setData(MockSessions.documents);
            setSessionNames(MockSessionNames.documents);
            setIsLoading(false);
            // setData(mockData.documents)
        }

        const getDataFromBackend = async () => {
            const response = await fetch('/get_mongo_data');
            const body = await response.json();

            if (response.status !== 200) {
                throw Error(body.message)
            }
            console.log(body)
            setData(body.documents)


            const namesResponse = await fetch('/get_session_names');
            const namesBody = await namesResponse.json();
            if (namesResponse.status !== 200) {
                throw Error(namesBody.message);
            }
            setSessionNames(namesBody.documents)
            setIsLoading(false)

        }

        if (useMock) {
            getMockData();
        } else {
            getDataFromBackend();
        }
    }, [])

    const mockSessionId = 20220

    return (
        <div>
            <h2>Data view</h2>
            {/* <div>{JSON.stringify(data)}</div> */}
            {isLoading
                ? <div>Loading data...</div>
                : <div>
                    <DataDisplay data={data} />
                    {/* Break this sesion list to its own component later */}
                    <div>
                        {sessionNames.map(session => {
                            return (
                                <Button href={`/session_data/${session._id}`}>
                                    {session.session_name}
                                </Button>
                            )
                        })}
                    </div>
                </div>
            }
        </div >
    )
}

export default DataView