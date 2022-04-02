import React from 'react';
import images from '../assets/images';
import "./DataView.css";

const imageTypes = [
    "nicotine",
    "plastic",
    "paper",
    "metal",
    "food",
    "glass",
    "other"
]

const SummaryVisual = ({ sumObject }) => {
    // data is right now a list of sessions
    // const sumItemsFromSessionList = (sessionList) => {
    //     // return sessionList[0]
    //     let sumObject = {}
    //     sessionList.map(session => {
    //         console.log(session)

    //         Object.entries(session.itemSum).map(([key, value]) => {
    //             if (sumObject[key]) {
    //                 sumObject[key] += value
    //             } else {
    //                 sumObject[key] = value;
    //             }
    //         })
    //     })
    //     return sumObject
    //     // return { yay: "nay" }
    // }

    // const sumObject = sumItemsFromSessionList(data);

    return (
        <div>
            <div className="sum-object">

                {Object.entries(sumObject)
                    .sort(function (a, b) {
                        return imageTypes.indexOf(a[0]) - imageTypes.indexOf(b[0]);
                    })
                    .map(([key, value]) => {
                        return (
                            <div key={`${key}-sumObject-key`} className="sum-object-entry">
                                <img src={images[key]} />
                                <div className="sum-object-value">{`${key}: ${value}`}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default SummaryVisual;