import React, { useState, useEffect, useRef } from 'react';
const temps = require('./templates.js');

export default function App() {
  const [texts, setTexts] = useState(['', '', '', '', '', '', '']);
  const [templates, setTemplates] = useState(temps);
  const [currentMeme, setCurrentMeme] = useState(
    templates[Math.floor(Math.random() * templates.length)],
  );
  const imgRef = useRef(null);

  const handleChange = e => {
    const inputFields = [...texts];
    inputFields[e.target.id] = e.target.value;
    setTexts(inputFields);
  };

  const handleClick = e => {
    e.preventDefault();
    var myHeaders = new Headers();
    // myHeaders.append("Cookie", "__cfduid=d5b06b2df9eda0d63076d8ba50f5642121601326806; iflipsess=dv537v2andm5mkrns95s4se369; claim_key=bz13Qn7QBuqPCCqtTDLZz2Mierh_HXNx");
    var formdata = new FormData();
    formdata.append('template_id', currentMeme.id);
    formdata.append('username', 'memehours');
    formdata.append('password', 'csny2020');
    for (let i = 0; i < currentMeme.box_count; i++) {
      formdata.append(`boxes[${i}][text]`, texts[i]);
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://api.imgflip.com/caption_image', requestOptions)
      .then(res => res.json())
      .then(res => {
        imgRef.current.src = res.data.url;
      })
      .catch(error => console.log('error', error));
  };

  const initialFetch = () => {
    var myHeaders = new Headers();
    // myHeaders.append("Cookie", "__cfduid=d5b06b2df9eda0d63076d8ba50f5642121601326806; iflipsess=dv537v2andm5mkrns95s4se369; claim_key=bz13Qn7QBuqPCCqtTDLZz2Mierh_HXNx");
    var formdata = new FormData();
    formdata.append('template_id', currentMeme.id);
    formdata.append('username', 'memehours');
    formdata.append('password', 'csny2020');
    for (let i = 0; i < currentMeme.box_count; i++) {
      formdata.append(`boxes[${i}][text]`, i + 1);
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://api.imgflip.com/caption_image', requestOptions)
      .then(res => res.json())
      .then(res => {
        imgRef.current.src = res.data.url;
      })
      .catch(error => console.log('error', error));
  };
  initialFetch();

  console.log(texts);

  const textBoxes = [];
  for (let i = 0; i < currentMeme.box_count; i++) {
    textBoxes.push(
      <input
        placeholder={i + 1}
        type="text"
        key={`text-${i}`}
        id={i}
        value={texts[i]}
        onChange={handleChange}
      />,
    );
  }

  return (
    <div>
      <p>HELLO MEME HOURS!!!</p>
      <span>{currentMeme.name}</span>
      <br />
      <img ref={imgRef} src={currentMeme.url} />
      <br />
      {textBoxes}
      <button onClick={handleClick}>Generate</button>
    </div>
  );
}
