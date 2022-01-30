import axios from 'axios';
import { useState, useRef, useEffect } from 'react'
import './App.css';

const initialOption = 'Breeds!'

function App() {

  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState()
  const [list, setList] = useState([])
  const [img, setImg] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBreeds = async () => {
      const { data } = await axios.get('https://dog.ceo/api/breeds/list/all')
      setList(Object.keys(data.message))
    }
    fetchBreeds()
  }, [])

  useEffect(() => {
    if (!value || value === initialOption) return
    const fetchImages = async () => {
      setIsLoading(true)
      try {
        const { data } = await axios.get(`https://dog.ceo/api/breed/${value}/images`)
        setImg(Object.values(data.message))
      } catch {
        setError('Ошибка соединения с сервером!')
      } finally {
        setIsLoading(false)
      }
    }
    fetchImages()
  }, [value])

  const changeSelect = (e) => {
    setValue(e.target.value)
  }


  return (
    <div className="App">

      <div className='section'>

        <p className='text'>Choose your dog 🐕</p>
        <div>
          <select className='select' value={value} onChange={changeSelect}>
            <option>{initialOption}</option>
            {list.map((item) =>
              <option key={item} value={item}>
                {item}
              </option>
            )}

          </select>
        </div>
        
        {isLoading ? (
          <div className='loader'></div>
        ) : error ? (
          <p>{error}</p>
        ) : value === initialOption ? null : (
          <div className='fadeIn'>
            {img.map((item) => (
              <img 
              key={item} 
              className='dog' 
              src={item} 
              alt={item} 
              width={190} 
              height={190}
              />
            ))}
          </div>
        )}

      </div>

    </div >
  );

}

export default App;
