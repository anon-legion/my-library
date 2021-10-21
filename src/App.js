import React, {useState} from 'react';
import Library from './components/library';
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
    // info() {
    //   return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? 'already read' : 'not read yet'}`
    // }
  }))

  return (
    <div className="App">
      <header className="App-header">
        <h1>Odin Book Library</h1>
        <p>A library of the books I have personally read and/or own</p>
      </header>
      <Library books={myLibrary} />
    </div>
  );
}

export default App;
