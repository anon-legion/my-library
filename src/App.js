import React, { useState } from 'react';
import Library from './components/library.js';
import NewBook from './components/newBook.js';
import { LibraryContext } from './libraryContext.js';
import 'bulma/css/bulma.min.css';
import './App.css';

const lettersFromAStoic = {
  title:'Letters from a Stoic',
  author: 'Seneca',
  isRead: true,
  isOwned: true,
};
const theOdyssey = {
  title:'The Odyssey',
  author: 'Homer',
  isRead: false,
  isOwned: true,
};
const thePrince = {
  title: 'The Prince',
  author: 'Niccolo Machiavelli',
  isRead: true,
  isOwned: true,
};

function App() {
  const [myLibrary, setMyLibrary] = useState(() => [lettersFromAStoic, theOdyssey, thePrince]);

  return (
    <>
      <header className="hero">
        <div className="container has-text-centered">
          <h1 className="title is-1 has-text-primary">Odin Book Library</h1>
          <p className="subtitle is-2">A library of my book collection</p>
        </div>
      </header>
      <main className="section">
        <div className="container">
          <div className="box has-background-info">
            <LibraryContext.Provider value={{ myLibrary, setMyLibrary}}>
              <Library />
            </LibraryContext.Provider>
          </div>
        </div>
      </main>
      <div className="section">
        <div className="container">
          <span className="is-size-5">Add new book</span>
          <div className="box has-background-info">
            <LibraryContext.Provider value={{ myLibrary, setMyLibrary }}>
              <NewBook />
            </LibraryContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
