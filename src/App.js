import React, {useState} from 'react';
import Library from './components/library';
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
  const [newBook, setNewBook] = useState(() => ({
    title: null,
    author: null,
    isRead: false,
    isOwned: false
  }))

  return (
    <>
      <section className="hero has-background-black">
        <div className="hero-body">
          <div className="container center">
            <h1 className="title is-1 primary">Odin Book Library</h1>
            <p className="subtitle is-2 tertiary">A library of my book colletion</p>
          </div>
        </div>
      </section>
      <section className="section has-background-black">
        <div className="container center">
          <Library books={myLibrary} />
        </div>
      </section>
    </>
  );
}

export default App;
