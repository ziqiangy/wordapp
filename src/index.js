import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import WordList from './WordList';
import Note from './Note/Note'
// import NotesList from './NotesList';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>

<div className="container-fluid">
  <div className="row">
    <div className="col-sm">
      One of three columns
      <WordList />
    </div>
    <div className="col-sm">
      One of three columns
      <Note />
    </div>
    <div className="col-sm">
      One of three columns
      {/* <NotesList /> */}
    </div>
  </div>
</div>
    
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
