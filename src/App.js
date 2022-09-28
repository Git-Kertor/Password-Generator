import lock from "./assets/lock-icon.png";
import * as React from 'react'
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const dropDownTheme = {
  option: (provided:any) => ({
	...provided,
	background: '#e16666',
	color: 'black',
	borderColor: 'black',
  }),
  container: (provided:any) => ({
	...provided,
	height: '100%',
  }),
  control: (provided:any) => ({
	...provided,
	background: '#e16666',
	borderColor: 'black',
	width: 200,
	marginTop: 10,
	height: '100%',
	"&:hover": {
		borderColor: "black"
	}
  }),
  indicatorSeparator: (provided:any) => ({
	...provided,
	background: 'black'
  }),
  dropdownIndicator: (provided:any) => ({
	...provided,
	color: 'black'
  }),
  placeholder: (provided:any) => ({
	...provided,
	color: 'black'
  }),
  menu: (provided:any) => ({
	...provided,
	background: '#e16666'
  }),
  singleValue: (provided:any) => ({
	...provided,
	color: 'black',
	fontSize: '1.4em',
  }),
}

function Digits (args) {
	const rows = [];
	for (let i = 0; i < args.len.value; i++) {
	    rows.push(React.createElement('label', {key: "digit: " + i, id: "digit: " + i ,className: "digitElement"}, '0'));
	}
	return (
		<div className="passwordParentRow">
			{rows}
		</div>
	);
}

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function GenerateDigits (len) {
	const characters = 'ABCDEFGHIJLKMNOPQRSTUVWXYZabcdefghijlkmnopqrstuvwxyz0123456789!@#$%&';
  	for(let i = 0; i < len.value; i++) {
  		var digit = document.getElementById("digit: " + i);
  		var rand = randomNumberInRange(0, characters.length - 1);
  		await timeout(100);
  		if(digit != null)
  			digit.innerHTML = characters.charAt(rand);
  	}
}

function App() {

  const [len, setLen] = React.useState({ label: '8', value: 8});

  const handleLenChange = value => {
	setLen(value);
	ResetDigits();
  }

  const ResetDigits = () => {
  	for(let i = 0; i < len.value; i++) {
  		var digit = document.getElementById("digit: " + i);
  		digit.innerHTML = '0';
  	}
  }

  const lenOptions = [
	{ label: '8', value: 8},
	{ label: '9', value: 9 },
	{ label: '10', value: 10 },
	{ label: '11', value: 11 },
	{ label: '12', value: 12 },
	{ label: '13', value: 13 },
	{ label: '14', value: 14 },
	{ label: '15', value: 15 },
	{ label: '16', value: 16 },
	];

  return (
	<div className="App">
	  <header className="App-header">
		<div className="App-lock-circle">
		  <img src={lock} className="App-lock-icon" alt="lock-icon"/>
		  <div className="Lock-circle-mask">
			<div className="Lock-circle"/>
		  </div>
		</div>
		<p style={{fontSize: '3em', marginBottom: '0em',color: '#e16666'}}>
		  Secure Password Generator in React.js
		</p>
		<Digits len = {len} onChange={ResetDigits}/>
		<label style={{marginTop: '1em',fontSize: '2em', color: '#e16666'}}>Select the length of your password:</label>
		<div className="buttonRow">
			<Select value = {len} styles = {dropDownTheme} options = {lenOptions} onChange = {handleLenChange}/>
			<button className="App-Generate-Button" onClick = {(e) => GenerateDigits(len)}>Generate Password</button>
		</div>
	  </header>
	</div>
  );
}
export default App;
