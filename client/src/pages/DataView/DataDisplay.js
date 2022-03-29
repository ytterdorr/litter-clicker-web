import React from 'react';
import images from '../../assets/images';

const imageTypes = [
    "nicotine",
    "plastic",
    "paper",
    "metal",
    "food",
    "glass",
    "other"
]

const DataDisplay = ({ data }) => {
    console.log("data", data)
    const sumItemsFromSessionList = (sessionList) => {
        // return sessionList[0]
        let sumObject = {}
        sessionList.map(session => {
            console.log(session)

            Object.entries(session.itemSum).map(([key, value]) => {
                if (sumObject[key]) {
                    sumObject[key] += value
                } else {
                    sumObject[key] = value;
                }
            })
        })
        return sumObject
        // return { yay: "nay" }
    }

    const sumObject = sumItemsFromSessionList(data);

    return (
        <div>
            {Object.entries(sumObject).map(([key, value]) => {
                return (
                    <div>
                        <img src={images[key]} />
                        <div>{`${key}: ${value}`}</div>
                    </div>
                )
            })

            }
        </div>
    )
}

export default DataDisplay;