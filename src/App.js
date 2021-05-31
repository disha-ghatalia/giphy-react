import { GiphyFetch } from '@giphy/js-fetch-api'
import {useState} from 'react'
import TextList from './components/TextList'
import { Gif, Grid, Carousel } from "@giphy/react-components";
import Error from './components/Error'
import './App.css';
import ResizeObserver from "react-resize-observer";

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY)

function GridDemo() {
  const fetchGifs = (offset: number) =>
    giphy.trending({ offset, limit: 10 });
  const [width, setWidth] = useState(window.innerWidth);
  return (
    <>
      <Grid
        fetchGifs={fetchGifs}
        width={width}
        columns={3}
        gutter={6}
      />
      <ResizeObserver
        onResize={({ width }) => {
          setWidth(width);
        }}
      />
    </>
  );
}
function App() {
  const [text, setText] = useState('')
  const [results, setResults] = useState([])
  const [err, setErr] = useState(false)

  const handleInput = (e) => {
    setText(e.target.value)
    
  }

  const handleSubmit = (e) => {
    if(text.length === 0) {
      
      //set error state to true
      setErr(true)
      return
    }
    const apiCall = async () => {
      const res = await giphy.animate(text, {limit: 20})
     // console.log(res.data)
      setResults(res.data)
    }
    
    apiCall()
    setText('')
    setErr(false)

  }

  
  
  return (
    <div className="App">
      <h1>Giphy Animated Text Generator</h1>
      <h3>Type text into the form and hit submit</h3>
     
        <input className='input-field' value={text} onChange={handleInput}  />
        <button onClick={handleSubmit}  className='submit-btn'>
          Submit
        </button>
       
    
      
      <Error isError={err} text='need length longer than 0 for input'/>
      {results && <TextList gifs={results}  />}
      <GridDemo />
      
    </div>
  );
}
export default App;