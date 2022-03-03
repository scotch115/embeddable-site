import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Slider } from 'primereact/slider';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { SpeedDial } from 'primereact/speeddial';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import YouTubeEmbed from './YouTubeEmbed';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import '../styles/App.css';

const App = () => {
  const ref = useRef(null);
  const toast = useRef(null);
  const [value, setValue] = useState('');
  const [sliderWidth, setSliderWidth] = useState(800);
  const [sliderHeight, setSliderHeight] = useState(1100);
  const [header, setHeader] = useState('Enter a Google Docs or Sheets Embed Link')
  const [validURL, setValidURL] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [sponsor, setSponsor] = useState(false);
  const [position, setPosition] = useState(20);
  const [embedLink, setEmbedLink] = useState('');

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

  const setHeaderText = (text) => {
    const headerText = ref.current.querySelector('#header');
    headerText.style.color = 'transparent';
    setTimeout(() => {
      headerText.style.color = 'black';
      setHeader(text);
    }, 200);
  }

  const generateLink = () => {
    if (value.includes('youtube.com'))  {
      setEmbedLink(`<iframe id="player" width="${sliderWidth}" height="${sliderHeight}" src="${`${value}&origin="${window.location.href}"`}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />`);
    } else {
      setEmbedLink(`<iframe src="${value}" width="${sliderWidth}" height="${sliderHeight}"/>`);
    }
  }

  const showCopySuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Embed Link Copied to Clipboard!', detail: 'Now you can paste the copied link to embed the document.', life: 3000 });
  }

  // const showCopyURLSuccess = () => {
  //   toast.current.show({ severity: 'success', summary: 'URL Copied to Clipboard!', detail: 'Now you can paste the copied link to embed the document, or drop the link back into the input field to generate an embed link.', life: 3000 });
  // }

  // const copyItems = [
  //   {
  //     label: 'Copy Embed Link',
  //     icon: 'pi pi-copy',
  //     command: () => {
  //       navigator.clipboard.writeText(embedLink);
  //       showCopySuccess();
  //     }
  //   },
  //   {
  //     label: 'Copy URL Only',
  //     icon: 'pi pi-link',
  //     command: () => {
  //       navigator.clipboard.writeText(value);
  //       showCopyURLSuccess();
  //     }
  //   },
  //   {
  //     label: 'New Tab from URL',
  //     icon: 'pi pi-external-link',
  //     command: () => {
  //       window.open(value, '_blank');
  //     }
  //   }

  // ];

  useEffect(() => {
    if (value && value.includes('docs.google.com')) {
      setHeaderText('Google Doc');
      filterURL(value);
      setSliderWidth(800);
      setSliderHeight(1100);
      setPosition(1);
      setValidURL(true);
    } else if (value && value.includes('sheets.google.com')) {
      setHeaderText('Google Sheet');
      filterURL(value);
      setSliderWidth(800);
      setSliderHeight(1100);
      setPosition(1);
      setValidURL(true);
    } else if (value && value.includes('youtube.com')) {
      setHeaderText('YouTube Embed');
      if (window.screen.width <= 415) {
        setSliderWidth(200);
        setSliderHeight(100);
      } else {
        setSliderWidth(853);
        setSliderHeight(480);
      }
      setPosition(1);
      setValidURL(true);
    } else if (value !== '' && value.includes('.com') && !value.includes('docs.google.com' || 'sheets.google.com')) {
      setHeaderText('Please enter a valid Google Docs or Google Sheets Embed Link');
      setValidURL(false);
      setPosition(20);
    } else if (value && value.includes('.net') || value.includes('.org') || value.includes('.io' ) || value.includes('.gov') || value.includes('.edu') || value.includes('.app') || value.includes('.so') || value.includes('.me')) {
      setHeaderText('Please enter a valid Google Docs or Google Sheets Embed Link');
      setValidURL(false);
      setPosition(20);
    } else {
      setHeaderText('Enter a Google Docs or Sheets Embed Link');
      setValidURL(false);
      setPosition(20);
    }
    generateLink();
  }, [value, setValue, header, setHeader, validURL, setValidURL]);

  return (
    <div ref={ref} className="App" style={{ top: `${position}vw` }}>
      <h1 id="header">{header}</h1>
      <br />
      <div className={`inputArea ${(validURL) ? 'valid' : ''}`}>
          {
            (validURL)
              ?
              <span>
                {/* <Tooltip target=".p-speeddial-semi-circle .p-speeddial-action" position="left" />
                <SpeedDial
                  className="p-button-raised p-button-rounded"
                  type="semi-circle"
                  direction='right'
                  showIcon="pi pi-copy"
                  label="Copy"
                  radius={80}
                  model={copyItems}
                  buttonStyle={{ 
                    padding: '10px',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(19, 158, 254, 1)',
                    overflow: 'visible'
                  }}
                /> */}
                <Button
                  className="p-button-raised p-button-rounded"
                  icon="pi pi-copy"
                  onClick={() => {
                    navigator.clipboard.writeText(embedLink);
                    showCopySuccess();
                  }}
                />
              </span>
            : null
          }
        <span className='p-float-label p-input-icon-left'>
          <i className='pi pi-link' />
          <InputText
            id="link"
            name="link"
            value={value} 
            onChange={(e) => {setValue(e.target.value)}} />
            <label htmlFor='link'> Embed Link </label>
        </span>
        <span>
          <Button
            className='p-button-raised p-button-rounded'
            icon="pi pi-question"
            onClick={() => onClick()}
            />
        </span>
      </div>
      <div style={{ paddingTop: '20px' }}>
        {(validURL) 
          ? <div>
              <strong> Width: {sliderWidth} </strong> <br /><br />
              <Slider
                value={sliderWidth}
                onChange={(e) => {setSliderWidth(e.value)}}
                min={200} 
                max={1500}
                step={10}
                style={{ width: '80vmin' }}
                /> 
              <br /><br />
              <strong> Height: {sliderHeight} </strong> <br /><br />
              <Slider
                value={sliderHeight}
                onChange={(e) => {setSliderHeight(e.value)}}
                min={100}
                max={2000}
                step={10} 
                style={{ width: '80vmin' }}
              />
              <br /><br />
              <span>
                <h3 style={{ margin: '0px'}}> Generated Embed Link: </h3>
                <div style={{ width: '50vmax', display: 'inline-flex'}}>
                  <p className='generatedLink'>
                    {embedLink}
                  </p>
                </div>
              </span>
              <span style={{ display: 'block' }}>
                {
                  (value.includes('youtube.com'))
                    ? <YouTubeEmbed embedId={value.split('?v=')[1]} width={sliderWidth} height={sliderHeight} />
                    : <iframe src={value} width={sliderWidth} height={sliderHeight}/>
                }
              </span>
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
        The default size is 800x1100 (in terms of pixels). <br /><br />

        For help with creating an embed link, click <span onClick={() => window.open('https://support.google.com/docs/answer/183965#embed_files&zippy=%2Cembed-a-document-spreadsheet-or-presentation', '_blank')} style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer' }}>here</span>. 
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
          <Card title="Portfolio">
            jordangamache.io
          </Card>
        </div>
      </Dialog>
      <Toast
				ref={toast}
				position={(window.screen.width <= 415) ? "top-center" : "top-right"}
        style={{ width: (window.screen.width <= 415) ? '80vw' : '' }}
			/>
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