import React, { useState } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';

/*
* test data
* bha, bht, phmb, ptfe, polytef, acrylate, nylon, cyclotetrasiloxane
* bha, bht, phmb, ptfe, polytef, acrylate, nylon, cyclotetrasiloxane, ethylhexyl methoxycinnamate, p-aminophenol, polyaminopropyl biguanide, benzophenone-3, recorcinol, PFCA, PFHxA, Fluortensider, pfoa, fts, ftoh, trifluoropropyl dimethiconol
* */

function App() {
  const [inputValue, setInputValue] = useState('');
  const [resultData, setResultData] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

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
        Koll på ditt Innehåll
      </div>
      <div className="body-wrapper">
        <div className="App-body">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              as="textarea"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Skriv ingredienslistan här"
              className="input-textarea"
            />
          </Form>
          {resultData && (
            <div className="result">
              <div className="header-small">
                <p>Innehållet gav {resultData.exact_match.number} utslag</p>
              </div>

              <div className="exact-wrapper">
                <div className="exact-container">
                  <div className="exact-entry-container">
                    {resultData.exact_match.pfas.length !== 0 && (
                      <div>
                        <div className="entry-header">
                          PFAS änmen:
                        </div>
                        {Object.keys(resultData.exact_match.pfas).map((key) => (
                          <div key={key} className="exact-entries">
                            {resultData.exact_match.pfas[key]}
                          </div>
                        ))}
                      </div>
                    )}
                    {resultData.exact_match.hormone.length !== 0 && (
                      <div>
                        <div className="entry-header">
                          Hormonstörande ämnen:
                        </div>
                        {Object.keys(resultData.exact_match.hormone).map((key) => (
                          <div key={key} className="exact-entries">
                            {resultData.exact_match.hormone[key]}
                          </div>
                        ))}
                      </div>
                    )}
                    {resultData.exact_match.plastic.length !== 0 && (
                      <div>
                        <div className="entry-header">
                          Plaster:
                        </div>
                        {Object.keys(resultData.exact_match.plastic).map((key) => (
                          <div key={key} className="exact-entries">
                            {resultData.exact_match.plastic[key]}
                          </div>
                        ))}
                      </div>
                    )}
                    {resultData.exact_match.cmr.length !== 0 && (
                      <div>
                        <div className="entry-header">
                          CMR-ämnen (cancerframkallande, könscellsmutagent eller reproduktionsstörande):
                        </div>
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
            </div>
          )}
        </div>
      </div>

      <div className="App-footer">
      </div>
    </div>
  );
}

export default App;
