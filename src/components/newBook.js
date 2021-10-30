import React, { useState, useContext, useEffect } from 'react';
import { LibraryContext } from '../libraryContext';
import 'bulma/css/bulma.min.css';
import '../App.css'


const NewBook = () => {
    const { myLibrary, setMyLibrary } = useContext(LibraryContext);


    const [newBook, setNewBook] = useState(() => ({
        title: '',
        author: '',
        isRead: false,
        isOwned: false
    }));

    const [editMode, setEditMode] = useState(() => ({
        isEdit: false,
        editIndex: null
    }));

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
            return {...prevState, [e.target.name]: !prevState[e.target.name] };
        })
    }

    
    useEffect(() => {
        // resets form on successful submit of newBook to a myLibrary and on first render
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
    }, [myLibrary]);


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
                                    <option>Read</option>
                                    <option>Unread</option>
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
                                    <option>Acquired</option>
                                    <option>Lacking</option>
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