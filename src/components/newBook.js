import React, { useState, useContext, useEffect } from 'react';
import { LibraryContext } from '../libraryContext';
import 'bulma/css/bulma.min.css';
import '../App.css'


const NewBook = () => {
    const { myLibrary, setMyLibrary, editBook } = useContext(LibraryContext);


    const [newBook, setNewBook] = useState(() => ({
        title: '',
        author: '',
        isRead: false,
        isOwned: false
    }));


    useEffect(() => {
        // resets form on successful submit of newBook to a myLibrary and on first render
        if (editBook.bookIndex < 0) {
            setNewBook(prevState => {
                return {
                    title: '',
                    author: '',
                    isRead: false,
                    isOwned: false
                };
            });
            // initializes all select nodes to none/null option selected
            document.querySelectorAll('select').forEach(selectNode => selectNode.selectedIndex = "-1");
        } else {
            setNewBook(prevState => editBook.bookState);
            setSelectNodes(editBook.bookState.isRead, editBook.bookState.isOwned);
        }
    }, [myLibrary, editBook]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setMyLibrary(prevState => [...prevState, newBook]);
    };


    const inputOnChange = (e) => {
        setNewBook(prevState => {
            return {...prevState, [e.target.name]: e.target.value};
        });
    };


    const selectOnChange = (e) => {
        setNewBook(prevState => {
            return {...prevState, [e.target.name]: e.target.value === "true" ? true : false };
        })
    };

    // set the values of select tags based on boolean values from isRead and isOwned
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

export default NewBook;