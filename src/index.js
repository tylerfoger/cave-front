import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import GameView from './js/GameView';

ReactDOM.render(
  <React.StrictMode>
    <div className="game round-border">
      <GameView />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
