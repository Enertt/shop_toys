import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from "axios"
import Compressor from 'image-compressor.js';



function App() {
  const [fileState, setFileState] = useState([])
  const [filePath, setFilePath] = useState()

  const handleChange = (event) => {
    if (!event.target.files[0]) {
      alert("файл не выбран")
      return
    }
    try {
      console.log(event.target.files[0])
      setFileState(event.target.files[0])
    } catch (error) {
      console.error('Ошибка при сжатии изображения:', error);
    } 
  }

  const handleSave = () => {
    if (!fileState) {
      alert("файл не выбран")
      return
    }

      const newFile = new FormData()
      newFile.append('file', fileState)

      axios.post('http://localhost:3001/upload', newFile, {
        headers: {
          'Content-Type': 'multipart/form-data', // Важно установить правильный заголовок для FormData
        },
      })
  }

  const getPhoto = () => {
    debugger
    axios.get('http://localhost:3001/get_img').then(res => {setFilePath(`http://localhost:3001/files/${res.data.path}`)})
    console.log(filePath)
  }

  return (
    <div className="App">
      <input type='file' accept='image/*.png, .jpg, .jpeg' onChange={handleChange}></input>

      {fileState.length !== 0 && (<div>file selected</div>)}
      {fileState.length !== 0 && (<button onClick={handleSave}>Сохранить</button>)}
      <button onClick={getPhoto}>Получить фото</button>
      <img src={filePath} />
    </div>
  );
}

export default App;
