import React, { useState, useEffect } from 'react';
import DataDisplay from './DataDisplay';
const mockData = require('./MockData.json');

// const mockData = {
//     "documents": [
//         {
//             "_id": "622bf2a725fc8423ecabebd1",
//             "itemCount": 2,
//             "itemSum": {
//                 "glass": 0,
//                 "other": 0,
//                 "nicotine": 1,
//                 "metal": 0,
//                 "paper": 1,
//                 "food": 0,
//                 "plastic": 0
//             }
//         },
//         {
//             "_id": "622bf2b00610843c1f840373",
//             "itemCount": 2,
//             "itemSum": {
//                 "glass": 0,
//                 "other": 0,
//                 "nicotine": 1,
//                 "metal": 0,
//                 "paper": 1,
//                 "food": 0,
//                 "plastic": 0
//             }
//         },
//         {
//             "_id": "622bf3150610843c1f840374",
//             "itemCount": 2,
//             "itemSum": {
//                 "glass": 0,
//                 "other": 0,
//                 "nicotine": 1,
//                 "metal": 0,
//                 "paper": 1,
//                 "food": 0,
//                 "plastic": 0
//             }
//         },
//         {
//             "_id": "622bf3410610843c1f840375",
//             "itemCount": 2,
//             "itemSum": {
//                 "glass": 0,
//                 "other": 0,
//                 "nicotine": 1,
//                 "metal": 0,
//                 "paper": 1,
//                 "food": 0,
//                 "plastic": 0
//             }
//         }
//     ]
// }

const DataView = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const useMock = true;

    useEffect(() => {
        // Get data from backend
        const getMockData = async () => {
            // const mockData = await fetch('./MockData.json')
            //     .then(response => {
            //         return response.json();
            //     })
            //     .then(jsonData => console.log(jsonData))
            setData(mockData.documents);
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
            setIsLoading(false)

        }

        if (useMock) {
            getMockData();
        } else {
            getDataFromBackend();
        }
    }, [])

    return (
        <div>
            <h2>Data view</h2>
            {/* <div>{JSON.stringify(data)}</div> */}
            {isLoading
                ? <div>Loading data...</div>
                : <DataDisplay data={data} />
            }
        </div>
    )
}

export default DataView