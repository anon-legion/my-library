import React, { useState, useContext, useEffect } from 'react';
import { LibraryContext } from '../libraryContext';
import 'bulma/css/bulma.min.css';
import '../App.css'


const NewBookForm = () => {
    const { myLibrary, setMyLibrary, editBook } = useContext(LibraryContext);


    const [newBook, setNewBook] = useState(() => ({
        title: '',
        author: '',
        isRead: false,
        isOwned: false
    }));


    useEffect(() => {
        // reset form on successful submit of newBook to myLibrary and on first render
        if (editBook.bookIndex < 0) {
            setNewBook(prevState => {
                return {
                    title: '',
                    author: '',
                    isRead: false,
                    isOwned: false
                };
            });
            // initialize all <select> nodes to none/null option selected
            document.querySelectorAll('select').forEach(selectNode => selectNode.selectedIndex = "-1");
        } else {
            // fill newBook form with editBook state to edit existing book
            setNewBook(prevState => editBook.bookState);
            setSelectNodes(editBook.bookState.isRead, editBook.bookState.isOwned);
        }
    }, [myLibrary, editBook]);


    const handleSubmit = (e) => {
        // used by form to either create new book or edit existing and preventing default form submit
        e.preventDefault();
        if (editBook.bookIndex === -1) {
            // create new book
            setMyLibrary(prevState => [newBook, ...prevState]);
        } else {
            //edit existing book by creating shallow copy of myLibrary state and editing the book in the shallow copy
            let books = [...myLibrary];
            books[editBook.bookIndex] = {...newBook};
            setMyLibrary(prevState => [...books]);
        }
    };


    const inputOnChange = (e) => {
        setNewBook(prevState => {
            return {...prevState, [e.target.name]: e.target.value};
        });
    };

    // handler used by <select> to convert "true" or "false" values to boolean since <select> only gives string values
    const selectOnChange = (e) => {
        setNewBook(prevState => {
            return {...prevState, [e.target.name]: e.target.value === "true" ? true : false };
        })
    };

    // set the values of select tags based on boolean values from isRead and isOwned, helper function used by useEffect
    function setSelectNodes(read, own) {
        document.querySelectorAll('select').forEach((selectNode, i) => selectNode.selectedIndex = arguments[i] ? "0" : "1")
    }


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
                                <select id="selectProgress" defaultValue={null}  name="isRead" onChange={selectOnChange} required>
                                    <option value={true}>Read</option>
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
                                <select id="selectStatus" defaultValue={null} name="isOwned" onChange={selectOnChange} required>
                                    <option value={true}>Acquired</option>
                                    <option value={false}>Lacking</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobile-flex-button">
                <input className="button is-link is-outlined is-inverted" type="submit" />
            </div>
        </form>
    )
}

export default NewBookForm;