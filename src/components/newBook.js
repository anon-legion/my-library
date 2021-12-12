import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLibraryContext } from './libraryContext';
import 'bulma/css/bulma.min.css';
import '../App.css';

function NewBookForm() {
  const { myLibrary, setMyLibrary, editBook } = useLibraryContext();

  const [newBook, setNewBook] = useState(() => ({
    title: '',
    author: '',
    isRead: false,
    isOwned: false,
  }));

  // reference to the dropdown menus of form
  // initialize as object to reference multiple elements
  const dropdownRef = useRef({});

  // set the values of select tags based on boolean values from isRead and isOwned
  // helper function used by useEffect
  // takes in two booleans 'read' and 'owned'
  function setSelectNodes(...args) {
    Object.values(dropdownRef.current).forEach((element, i) => {
      const node = element;
      node.selectedIndex = args[i] ? '0' : '1';
    });
  }

  useEffect(() => {
    // reset form on successful submit of newBook to myLibrary and on first render
    if (editBook.bookIndex < 0) {
      setNewBook(() => ({
        title: '',
        author: '',
        isRead: false,
        isOwned: false,
      }));
      // initialize all <select> nodes to none/null option
      Object.values(dropdownRef.current).forEach((element) => {
        // 'element' and 'node' are references to the same DOM node
        // but modifying 'node' doesn't mutate the 'arguments' object of the function
        // arguments[0] remains just a reference to the DOM node element
        const node = element;
        node.selectedIndex = '-1';
      });
    } else {
      // fill newBook form with editBook state to edit existing book
      setNewBook(() => editBook.bookState);
      setSelectNodes(editBook.bookState.isRead, editBook.bookState.isOwned);
    }
  }, [myLibrary, editBook]);

  const handleSubmit = (e) => {
    // used by form to either create new book or edit existing and preventing default form submit
    e.preventDefault();
    if (editBook.bookIndex === -1) {
      // create new book
      setMyLibrary((prevState) => [newBook, ...prevState]);
    } else {
      // creating shallow copy of myLibrary to edit book
      const books = [...myLibrary];
      books[editBook.bookIndex] = { ...newBook };
      setMyLibrary(() => [...books]);
    }
  };

  const inputOnChange = useCallback((e) => {
    setNewBook((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }, []);

  // handler used by <select> to convert "true" or "false" values to boolean since
  const selectOnChange = useCallback((e) => {
    setNewBook((prevState) => ({ ...prevState, [e.target.name]: e.target.value === 'true' }));
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="columns">
        <div className="column is-4">
          <div className="field">
            <label className="label" htmlFor="inputTitle">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="inputTitle"
                placeholder="Book"
                name="title"
                value={newBook.title}
                onChange={inputOnChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="column is-4">
          <div className="field">
            <label className="label" htmlFor="inputAuthor">Author</label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="inputAuthor"
                placeholder="Name"
                name="author"
                value={newBook.author}
                onChange={inputOnChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label" htmlFor="selectProgress">Progress</label>
            <div className="control">
              <div className="select">
                <select
                  // add element to dropdownRef.current object with key 'progress
                  ref={(el) => { dropdownRef.current.progress = el; }}
                  id="selectProgress"
                  defaultValue={null}
                  name="isRead"
                  onChange={selectOnChange}
                  required
                >
                  <option value>Read</option>
                  <option value={false}>Unread</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label" htmlFor="selectStatus">Status</label>
            <div className="control">
              <div className="select">
                <select
                  // add element to dropdownRef.current object with key 'status'
                  ref={(el) => { dropdownRef.current.status = el; }}
                  id="selectStatus"
                  defaultValue={null}
                  name="isOwned"
                  onChange={selectOnChange}
                  required
                >
                  <option value>Acquired</option>
                  <option value={false}>Lacking</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-flex-button">
        <button className="button is-link is-outlined is-inverted" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default NewBookForm;
