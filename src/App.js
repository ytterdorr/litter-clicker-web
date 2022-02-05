import logo from './logo.svg';
import './App.css';
import { Button, Divider } from "@material-ui/core";
import images from './assets/images';


const imageTypes = [
  "nicotine",
  "plastic",
  "paper",
  "metal",
  "food",
  "glass",
  "other"
]

function App() {
  return (
    <div className="main">
      <h1 className="main-header">LitterClicker</h1>
      <div className="splash-image">
        {imageTypes.map(image => {
          return <img className="smallImage smallMargin" src={images[image]}>

          </img>
        })}
      </div>
      <Button variant="contained" color="primary">
        Create new session
      </Button>


    </div>

  );
}

export default App;
