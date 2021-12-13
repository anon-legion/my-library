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
  const inputRef = useRef({});

  // set the values of select tags based on boolean values from isRead and isOwned
  // helper function used by useEffect
  // takes in two booleans 'read' and 'owned'
  function setSelectNodes(...args) {
    Object.values(inputRef.current).forEach((element, i) => {
      const node = element;
      node.selectedIndex = args[i] ? '0' : '1';
    });
  }

  // const isDuplicate = useCallback((newTitle) => {
  //   const duplicateTitleIndex = myLibrary.findIndex(
  //     // find index of book with same title that is not the same book being edited
  //     (book, i) => book.title.toLowerCase() === newTitle && i !== editBook.bookIndex,
  //   );
  //   return duplicateTitleIndex >= 0;
  // }, [myLibrary, editBook.bookIndex]);

  // custom form validation of event to check if title already exists in myLibrary
  // helper function used by input onChange event handler
  const validate = () => {
    const element = inputRef.current.title;
    const newTitle = newBook.title.toLowerCase();
    if (myLibrary.findIndex(
      (book, i) => book.title.toLowerCase() === newTitle && i !== editBook.bookIndex,
    ) >= 0) {
      inputRef.current.title.setCustomValidity('Title already exists');
      return false;
    }
    element.setCustomValidity('');
    return true;
  };

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
      Object.values(inputRef.current).forEach((element) => {
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
    const isValid = validate();
    if (!isValid) return;
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
    // console.log(e.target);
    // e.target.setCustomValidity('e.target');
    // console.log(inputRef.current.title);
    // inputRef.current.title.setCustomValidity('inputRef');
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
                ref={(el) => { inputRef.current.title = el; }}
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
                  // add element to inputRef.current object with key 'progress
                  ref={(el) => { inputRef.current.progress = el; }}
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
                  // add element to inputRef.current object with key 'status'
                  ref={(el) => { inputRef.current.status = el; }}
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
        <button className="button is-link is-outlined is-inverted has-text-weight-semibold" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default NewBookForm;
