import axios from 'axios';
import { useState, useRef, useEffect } from 'react'
import './App.css';

function App() {

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState()
  const [lists, setLists] = useState([])
  const [imgs, setImgs] = useState([])

  const changeSelect = (e) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        setLists(Object.keys(response.data.message))
      })
  }, [])

  useEffect(() => {
    axios.get(`https://dog.ceo/api/breed/${value}/images`)
      .then(response => {
        setImgs(Object.values(response.data.message))
        setIsLoading(true)
      })
  }, [value])

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false)
    }, 2000);
  }, [isLoading])



  return (
    <div className="App">

      <div className='section'>

        <p className='text'>Choose your dog 🐕</p>
        <div>
          <select className='select' value={value} onChange={changeSelect}>
            <option>Breeds!</option>
            {lists.map((list) =>
              <option key={list} value={list}>{list}</option>
            )}

          </select>
        </div>

        {isLoading ?
          <div className='loader'>
          </div>

          :

          <div>
            {imgs.map((img) =>
              <img key={img} className='dog' src={img} width={190} height={190}></img>
            )}
          </div>
        }

      </div>

    </div >
  );

}

export default App;
