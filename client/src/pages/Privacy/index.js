import './privacy.css';

const Privacy = () => {
    return (
        <div className="privacyContainer">
            <h1>LitterClicker Privacy policy</h1>
            <p><em>You get data, we get data, everyone gets data!</em></p>

            <p>The basic data this app gathers is:
                <ul>
                    <li>Location</li>
                    <li>Timestamp</li>
                    <li>Litter type</li>
                </ul>
            </p>

            <p>

                You are generating the data on your device, and that means it is your data. The app allows you to download your data into a local file on your phone, you can use it for any purpose and you don't have to share it with us if you don't want to. If you want to share your data with the world you don't need an account, and you don't need to register any personal information with us.
            </p><p>
                If you upload your litter data to us you are sharing it anonymously with the rest of the world, and anyone can download it for their own purposes.
            </p><p>
                In the future we may offer you an option to create an account. If you choose to create an account we will store your username and password in order to create your individual profile. If you also provide contact information we will use it to allow you to reset password and send an occasional reminder in case of inactivity.
            </p>
        </div>
    )
}

export default Privacy;