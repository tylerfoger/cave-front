import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import GameView from './js/GameView.js';
import { url, setupGame } from './js/config.js';
import { POST } from './js/helpers.js';

// IIFE to start app with default values
(async function (url, postData) {
  try {
    const fetchedData = await POST(url, postData);
    const retData = Object.entries(fetchedData)[0][1];

    return ReactDOM.render(
      <React.StrictMode>
        <div className="game round-border">
          <GameView gameOptions={retData} />
        </div>
      </React.StrictMode>,
      document.getElementById('root')
    );
  } catch (e) {
    console.log(e);
  }
})(url, setupGame);
