import logo from './logo.svg';
import './App.css';
import { Button, Divider } from "@material-ui/core";
import images from './assets/images';
import Session from './pages/Session';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


const imageTypes = [
  "nicotine",
  "plastic",
  "paper",
  "metal",
  "food",
  "glass",
  "other"
]

const Home = () => {
  return (
    <div className="main">
      <h1 className="main-header">LitterClicker</h1>
      <div className="splash-image">
        {imageTypes.map(image => {
          return <img key={`startImage_${image}`} className="smallImage smallMargin" src={images[image]}>

          </img>
        })}
      </div>
      <Button variant="contained" color="primary" href="/session"
        style={{ padding: "20px" }}
      >
        Create new session
      </Button>


    </div>
  )
}

// const Session = () => {
//   return (
//     <div>
//       Session!
//     </div>
//   )
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session" element={<Session />}></Route>
      </Routes>

    </Router>


  );
}



export default App;
