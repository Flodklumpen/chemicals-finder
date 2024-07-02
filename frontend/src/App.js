import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

/*
* test data
* bha, bht, phmb, ptfe, polytef, acrylate, nylon, cyclotetrasiloxane
* */

function App() {
  const [inputValue, setInputValue] = useState('');
  const [resultData, setResultData] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log('Form submitted with input:', inputValue);

    try {
      const response = await fetch(`chemicals?input=${encodeURIComponent(inputValue)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResultData(data);
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event).then();
    }
  };

  return (
    <div className="App">
      <div className="App-header">
      </div>
      <div className="body-wrapper">
        <div className="App-body">
          <form onSubmit={handleSubmit}>
          <textarea className="input-textarea"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
          />
          </form>
          {resultData && (
            <div className="result">
              <div className="header-small">
                <p>Din produkt innehåller:</p>
              </div>

              <div className="exact-wrapper">
                <div className="exact-container">
                  <h4>Exakta matchningar: {resultData.exact_match.number}</h4>
                  <div className="exact-entry-container">
                    {resultData.exact_match.pfas.length !== 0 && (
                      <div>
                        PFAS änmen:
                        {Object.keys(resultData.exact_match.pfas).map((key) => (
                          <div key={key} className="exact-entries">
                            {resultData.exact_match.pfas[key]}
                          </div>
                        ))}
                      </div>
                    )}
                    {resultData.exact_match.hormone.length !== 0 && (
                      <div>
                          Hormonstörande ämnen:
                        {Object.keys(resultData.exact_match.hormone).map((key) => (
                          <div key={key} className="exact-entries">
                            {resultData.exact_match.hormone[key]}
                          </div>
                        ))}
                      </div>
                    )}
                    {resultData.exact_match.plastic.length !== 0 && (
                      <div>
                        Plaster:
                        {Object.keys(resultData.exact_match.plastic).map((key) => (
                          <div key={key} className="exact-entries">
                            {resultData.exact_match.plastic[key]}
                          </div>
                        ))}
                      </div>
                    )}
                    {resultData.exact_match.cmr.length !== 0 && (
                      <div>
                          Ämnen som kan orsaka cancer, genmutationer eller störa
                          förmågan att få barn (CMR-ämnen):
                          {Object.keys(resultData.exact_match.cmr).map((key) => (
                            <div key={key} className="exact-entries">
                              {resultData.exact_match.cmr[key]}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="partly-container">
                <p>Delvis matchningar: {resultData.partly_match.number}</p>
                {resultData.partly_match.pfas.original && (
                  <div className="partly">
                    <p>Du skrev in: {resultData.partly_match.pfas.original}</p>
                    <p>PFAS änmen som delvis matchade: {resultData.partly_match.pfas.matching}</p>
                  </div>
                )}
                {resultData.partly_match.hormone.original && (
                  <div className="partly">
                    <p>Du skrev in: {resultData.partly_match.hormone.original}</p>
                    <p>Hormonstörande ämnen som delvis matchade: {resultData.partly_match.hormone.matching}</p>
                  </div>
                )}
                {resultData.partly_match.plastic.original && (
                  <div className="partly">
                    <p>Du skrev in: {resultData.partly_match.plastic.original}</p>
                    <p>Plastämnen som delvis matchade: {resultData.partly_match.plastic.matching}</p>
                  </div>
                )}
                {resultData.partly_match.cmr.original && (
                  <div className="partly">
                    <p>Du skrev in: {resultData.partly_match.cmr.original}</p>
                    <p>Ämnen som kan orsaka cancer, genmutationer eller störa
                      förmågan att få barn (CMR-ämnen) som delvis matchade: {resultData.partly_match.cmr.matching}</p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>

      <div className="App-footer">
      </div>

      {/*<img src={logo} className="App-logo" alt="logo" />*/}
    </div>
  );
}

export default App;
