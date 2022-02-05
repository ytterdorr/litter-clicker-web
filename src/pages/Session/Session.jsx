import React from 'react';
import './Session.css';
import { Button } from '@material-ui/core';
import images from '../../assets/images'

const defaultItems = [
    { name: 'nicotine', color: 'red', value: 0, image: images.nicotine },
    { name: 'plastic', color: 'blue', value: 0, image: images.plastic },
    { name: 'paper', color: 'orange', value: 0, image: images.paper },
    { name: 'metal', color: 'beige', value: 0, image: images.metal },
    { name: 'food', color: 'olive', value: 0, image: images.food },
    { name: 'glass', color: 'aqua', value: 0, image: images.glass },
    { name: 'other', color: 'purple', value: 0, image: images.other },
]

const Counters = ({ itemList }) => {
    console.log(itemList)
    return (
        <div className="counters">
            {itemList.map(item => {
                return (
                    <div key={`itemCount${item.name}`}>
                        <img src={item.image} />
                        {item.name}: {item.value}
                    </div>
                )
            })}
        </div>
    )
}

class SessionBase extends React.Component {
    constructor(props) {
        super(props);
        const itemList = props.itemList || defaultItems;

        this.state = {
            view: "SessionButtonTop",
            clickerTime: 600,
            hasLocationPermission: null,
            multiClickTimer: null,
            timerRunning: false,
            totalCount: 0,
            multiClickCount: 0,
            keyCode: null,
            items: itemList,
            sessionId: 0,
            showSettings: false,
            showStartModal: false,
            countingPushes: false,
        }
    }






    incrementItemCountFromMultiClick = async () => {
        // Update item counts in state
        // is there an alternative when you update from a button push?

        // new implementation
        const index = (this.state.multiClickCount - 1) % this.state.items.length;
        this.incrementItemCountFromIndex(index)
    }

    incrementItemCountFromIndex = (index) => {
        let tmpItems = [...this.state.items];
        tmpItems[index].value += 1
        this.setState({ items: tmpItems })
        this.setState({ totalCount: this.state.totalCount + 1 })
    }

    incrementItemCountByName = (itemName) => {
        // Find index of item name by name
        let tmpItems = [...this.state.items];
        for (let item of tmpItems) {
            if (item.name === itemName) {
                item.value += 1
                this.setState({ items: tmpItems, totalCount: this.state.totalCount + 1 })
                return
            }
        }
        console.error("Error in incrementItemCountByName")
        console.log(`Name: '${itemName}' did not match any item in item list`)

    }

    onTimeOut = () => {
        console.log("Time's up")
        this.incrementItemCountFromMultiClick()


        // Store new item
        let index = (this.state.multiClickCount - 1) % this.state.items.length;
        const name = this.state.items[index].name
        // this.storeNewItem({ name }).catch(err => console.log(err));

        // Reset counters
        this.setState({
            timerRunning: false,
            multiClickCount: 0
        });
    }



    counterPress = () => {
        if (this.state.timerRunning) {
            clearTimeout(this.state.multiClickTimer);
            this.setState({ multiClickTimer: null })
        }

        this.setState({
            multiClickCount: this.state.multiClickCount + 1,
            multiClickTimer: setTimeout(this.onTimeOut, this.state.clickerTime),
            timerRunning: true
        })
    }

    // checkLocationIsRight = () => {
    //     checkLocationPermission();
    // }

    // printSession = () => {
    //     const session = getSessionById(this.state.sessionId);
    //     console.log(session);
    //     console.log(`itemSum: ${session.itemSum}`)
    // }
    render() {
        return (
            <div>
                <div>
                </div>
                <Button variant="contained" color="primary" className="clickButton" onClick={this.counterPress}>Click!</Button>
                <Counters itemList={this.state.items}></Counters>
            </div>
        )
    }
}


export default SessionBase;
