import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Slider } from 'primereact/slider';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import '../styles/App.css';

const App = () => {
  const [value, setValue] = useState('');
  const [sliderWidth, setSliderWidth] = useState(800);
  const [sliderHeight, setSliderHeight] = useState(1100);
  const [header, setHeader] = useState('Enter a Google Docs or Sheets Embed Link')
  const [validURL, setValidURL] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [sponsor, setSponsor] = useState(false);
  const [position, setPosition] = useState(20);

  const filterURL = (url) => {
    var filterText = url.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
    setValue(filterText);
  }

  const onClick = () => {
		setDialog(true);
	}

	const onHide = () => {
    setDialog(false);
	}

  const onSponsorClick = () => {
		setSponsor(true);
	}

	const onSponsorHide = () => {
    setSponsor(false);
	}

  useEffect(() => {
    if (value && value.includes('docs.google.com')) {
      setHeader('Google Doc');
      filterURL(value);
      setPosition(1);
      setValidURL(true);
      console.log('google doc');
    } else if (value && value.includes('sheets.google.com')) {
      setHeader('Google Sheet');
      filterURL(value);
      setPosition(1);
      setValidURL(true);
      console.log('google sheets');
    } else if (value !== '' && value.includes('.com') && !value.includes('docs.google.com' || 'sheets.google.com')) {
      setHeader('Please enter a valid google forms or google sheets url');
      setValidURL(false);
      setPosition(20);
    } else {
      setHeader('Enter a Google Docs or Sheets Embed Link');
      setValidURL(false);
      setPosition(20);
    }
  }, [value, setValue, header, setHeader, validURL, setValidURL]);

  return (
    <div className="App" style={{ top: `${position}vw` }}>
      <h1>{header}</h1>
      <br />
      <div style={{ display: 'inline-flex' }}>
        <span className='p-float-label p-input-icon-left'>
          <i className='pi pi-link' />
          <InputText
            id="link"
            name="link"
            value={value} 
            onChange={(e) => {setValue(e.target.value)}} />
            <label htmlFor='link'> Embed Link </label>
        </span>
        <div style={{ width: '15px' }} />
        <div>
          <Button
            className='p-button-rounded'
            icon="pi pi-question"
            onClick={() => onClick()}
          />
        </div>
      </div>
      <div style={{ paddingTop: '20px' }}>
        {(validURL) 
          ? <div>
              <h5> Width: {sliderWidth} </h5>
              <Slider
                value={sliderWidth}
                onChange={(e) => {setSliderWidth(e.value)}}
                min={300} 
                max={1500}
                step={10} 
              />
              <h5> Height: {sliderHeight} </h5>
              <Slider
                value={sliderHeight}
                onChange={(e) => {setSliderHeight(e.value)}}
                min={100}
                max={2000}
                step={10} 
              />
              <br />
              <br />
              <span>
                <h5> Generated Embed Link: </h5>
                <p className='generatedLink'>
                  {`<iframe src="${value}" width="${sliderWidth}" height="${sliderHeight}" />`}
                </p>
              </span>
              <div>
                <iframe src={value} width={sliderWidth} height={sliderHeight}/>
              </div>
            </div>
          : null}
      </div>
      <Dialog
        visible={dialog}
        header="How Does This Work?"
        onHide={() => onHide()}
      >
        This website allows you to input a Google Docs or Google Sheets embed link, and change the width and height of the embed. <br />
        After you have selected your desired width and height, you can copy the generated HTML text to use as you like. <br /> <br />
        The default size is 800x1100 (in terms of pixels).
      </Dialog>
      <Dialog
        visible={sponsor}
        header="Hi 👋🏻"
        style={{ width: '80%' }}
        onHide={() => onSponsorHide()}
      >
        Thanks for being here! My name is Jordan and I'm a software engineer, and I enjoy building websites just like this one. If you want to check out more of my work, or if you would like to work with me, check out my portfolio website here: <br />
        <br />
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => window.open('https://jordangamache.io', '_blank')}
        >
          <Card
            title="Portfolio"
            ic
          >
            jordangamache.io
          </Card>
        </div>
      </Dialog>
      <span style={{height: "10vh"}} />
			 <footer className="footer">
				<div style={{ cursor: 'pointer'}} onClick={() => onSponsorClick()}>
				 Made with <i className="fa fa-heart" style={{color: "rgb(235, 43, 86)"}}></i> & <i className="fa fa-coffee" style={{color: "rgb(44, 31, 22)"}}></i> in Orlando
				</div>
			 </footer>
    </div>
  );
}

export default App;