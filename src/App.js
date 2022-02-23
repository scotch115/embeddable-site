import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Slider } from 'primereact/slider';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import './App.css';

const App = () => {
  const [value, setValue] = useState('');
  const [sliderWidth, setSliderWidth] = useState(500);
  const [sliderHeight, setSliderHeight] = useState(500);
  const [header, setHeader] = useState('Enter a Google Site to generate an embed link')
  const [validURL, setValidURL] = useState(false);

  const filterURL = (url) => {
    var filterText = url.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
    setValue(filterText);
  }

  useEffect(() => {
    if (value && value.includes('docs.google.com')) {
      setHeader('Enter a Google Site to generate an embed link');
      filterURL(value);
      setValidURL(true);
      console.log('google doc');
    } else if (value && value.includes('sheets.google.com')) {
      setHeader('Enter a website here to generate an embed link');
      filterURL(value);
      setValidURL(true);
      console.log('google sheets');
    } else if (value !== '' && value.includes('.com') && !value.includes('docs.google.com' || 'sheets.google.com')) {
      setHeader('Please enter a valid google forms or google sheets url');
      setValidURL(false);
    } else {
      setHeader('Enter a Google Site to generate an embed link');
      setValidURL(false)
    }
  }, [value, setValue, header, setHeader, validURL, setValidURL]);

  return (
    <div className="App">
      <h1>{header}</h1>
      <br />
      <span className='p-float-label p-input-icon-left'>
        <i className='pi pi-link' />
        <InputText
          id="link"
          name="link"
          value={value} 
          onChange={(e) => {setValue(e.target.value)}} />
          <label htmlFor='link'> Embed Link </label>
      </span>
      <div style={{ paddingTop: '20px' }}>
        {(validURL) 
          ? <div>
              <iframe src={value} width={sliderWidth} height={sliderHeight}/>
              <h5> Width: {sliderWidth} </h5>
              <Slider
                value={sliderWidth}
                onChange={(e) => {setSliderWidth(e.value)}}
                min={100} 
                max={1000}
                step={10} 
              />
              <h5> Height: {sliderHeight} </h5>
              <Slider
                value={sliderHeight}
                onChange={(e) => {setSliderHeight(e.value)}}
                min={100}
                max={1000}
                step={10} 
              />
              <br />
              <span>
                <h5> Generated Embed Link: </h5>
                <p className='generatedLink'>
                  {`<iframe src="${value}" width="${sliderWidth}" height="${sliderHeight}" />`}
                </p>
              </span>
            </div>
          : null}
      </div>
    </div>
  );
}

export default App;