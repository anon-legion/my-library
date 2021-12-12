import React from 'react';
import Library from './components/library';
import NewBookForm from './components/newBook';
import { LibraryProvider } from './components/libraryContext';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  return (
    <>
      <header className="hero">
        <div className="container has-text-centered">
          <h1 className="title is-1 has-text-primary">Odin Book Library</h1>
          <p className="subtitle is-2">A library of my book collection</p>
        </div>
      </header>
      <main className="section">
        <LibraryProvider>
          <div className="container">
            <div className="box has-background-info">
              <Library />
            </div>
          </div>
          <div className="section">
            <div className="container">
              <span className="is-size-5">Add/Edit Book (double click row to edit)</span>
              <div className="box has-background-info">
                <NewBookForm />
              </div>
            </div>
          </div>
        </LibraryProvider>
      </main>
    </>
  );
}

export default App;
