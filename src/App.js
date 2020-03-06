import React, {useState, useEffect} from 'react';
import fetch from 'node-fetch';

function App() {

  const [images, setImages] = useState([]);
  const [form, setForm] = useState({adjective: "", noun: ""});

  // useEffect(() => {
  //   
  // }, [])

  function keyPress(event){
    console.log(event.target.value);
    const value = event.target.value;
    const name = event.target.name;

    setForm((prevValue) => {
        if (name === "adjective"){
          return {
            adjective: value,
            noun: prevValue.noun}
        }

        else if (name === "noun"){
          return {
            adjective: prevValue.adjective,
            noun: value
          }
        }
    })
  } 

  function handleButton(event){
    console.log(form)

    const {noun, adjective} = form;

    fetch(`https://pixabay.com/api/?key=15419233-8d28ff99c4a3abd7ff68c5e3b&q=${adjective}+${noun}&image_type=photo`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setImages(json.hits);
      });

    event.preventDefault();
  }
  
  return (
    <div className="container">
      <h1>Pix 4</h1>
        <form onSubmit={handleButton}>
          <div className="form-group">
          <input type="text" name="adjective" className="form-control" placeholder="adjective" onChange={keyPress}/>
          </div>
          <div className="form-group">
          <input type="text" name="noun" className="form-control" placeholder="noun" onChange={keyPress}/>
          </div>
        <button type="submit" className="btn btn-info">Search</button>
      </form>
      {images.map((image, index) => <a href={image.largeImageURL} key={index}><img src={image.previewURL} key={index} alt="animal"/></a>)}
    </div>
  );
}

export default App;
