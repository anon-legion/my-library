import React from 'react';
import Library from './components/library';
import NewBookForm from './components/newBook';
import Footer from './components/Footer';
import { LibraryProvider } from './components/libraryContext';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  return (
    <>
      <header className="hero">
        <div className="hero-body has-text-centered py-5">
          <h1 className="title is-1 is-size-3-mobile has-text-primary">Odin Book Library</h1>
          <p className="subtitle is-2 is-size-4-mobile has-text-white-ter">My personal book collection</p>
        </div>
      </header>
      <main className="section is-flex is-flex-direction-column is-justify-content-space-between pt-4">
        <LibraryProvider>
          <div className="container">
            <div className="box has-background-info">
              <Library />
            </div>
          </div>
          <div className="container mt-4">
            <span className="is-size-5 is-size-6-mobile has-text-white-ter">Add/Edit Book (double click row to edit)</span>
            <div className="box has-background-info">
              <NewBookForm />
            </div>
          </div>
        </LibraryProvider>
      </main>
      <Footer />
    </>
  );
}

export default App;
