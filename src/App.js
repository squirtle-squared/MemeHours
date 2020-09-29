import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT = 'http://localhost:3001';

export default function App() {
	const [texts, setTexts] = useState(['', '', '', '', '']);
	const [didMount, setDidMount] = useState(false);
	const [templates, setTemplates] = useState([{
		box_count: 2,
		height: 1200,
		id: "181913649",
		name: "Drake Hotline Bling",
		url: "https://i.imgflip.com/30b1gx.jpg",
		width: 1200
	}, {
		box_count: 3,
		height: 800,
		id: "112126428",
		name: "Distracted Boyfriend",
		url: "https://i.imgflip.com/1ur9b0.jpg",
		width: 1200
	}]);
	const [currentMeme, setCurrentMeme] = useState(templates[Math.floor(Math.random() * templates.length)])
	const imgRef = useRef(null);


	// handleClick = (e) => {
	// 	e.preventDefault();
	// };

	const handleChange = (e) => {
		const inputFields = [...texts];
		inputFields[e.target.id] = e.target.value;
		setTexts(inputFields)
	}

	const handleClick = (e) => {
		e.preventDefault();
		var myHeaders = new Headers();
		// myHeaders.append("Cookie", "__cfduid=d5b06b2df9eda0d63076d8ba50f5642121601326806; iflipsess=dv537v2andm5mkrns95s4se369; claim_key=bz13Qn7QBuqPCCqtTDLZz2Mierh_HXNx");
		var formdata = new FormData();
		formdata.append("template_id", currentMeme.id);
		formdata.append("username", "memehours");
		formdata.append("password", "csny2020");
		for (let i = 0; i < currentMeme.box_count; i++) {
			formdata.append(`boxes[${i}][text]`, texts[i]);
		}

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: formdata,
			redirect: 'follow'
		};

		fetch("https://api.imgflip.com/caption_image", requestOptions)
			.then(res => res.json())
			.then(res => {
				console.log(res)
				imgRef.current.src = res.data.url
			})
			.catch(error => console.log('error', error))
	}

	useEffect(() => {
		if (!didMount) {
			setDidMount(true);
			fetch('https://api.imgflip.com/get_memes')
				.then(res => res.json())
				.then(res => console.log(res.data.memes))
			// .then(res => setTemplates(res))
		}
		const socket = socketIOClient(ENDPOINT);
	}, []);


	const textBoxes = [];
	for (let i = 0; i < currentMeme.box_count; i++) {
		console.log(currentMeme.box_count)
		textBoxes.push(<input type='text' key={`text-${i}`} id={i} value={texts[i]} onChange={handleChange} />)
	}

	console.log(texts)

	return (
		<div>
			<p>HELLO MEME HOURS!!!</p>
			<img ref={imgRef} src={currentMeme.url} />
			{textBoxes}
			<button onClick={handleClick}>Generate</button>
		</div>
	);

}
