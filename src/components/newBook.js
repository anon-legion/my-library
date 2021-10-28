import React, {useState} from 'react';
import 'bulma/css/bulma.min.css';
import '../App.css'


const PROGRESS = {
    READ: true,
    UNREAD: false,
}

const STATUS = {
    ACQUIRED: true,
    LACKING: false,
}

const NewBook = () => {
    const [newBook, setNewBook] = useState(() => ({
        title: '',
        author: '',
        isRead: false,
        isOwned: false
    }))

    const inputOnChange = (e) => {
        setNewBook(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        });
        console.table(newBook)
    }

    const selectOnChange = (e) => {
        setNewBook(prevState => {
            return {...prevState, [e.target.name]: !prevState[e.target.name] }
        })
        console.table(newBook)
    }

    return (
        <form>
            <div className="columns">
                <div className="column is-4">
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Book" value={newBook.title} name="title" onChange={inputOnChange}/>
                        </div>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="field">
                        <label className="label">Author</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Name" value={newBook.author} name="author" onChange={inputOnChange}/>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="field">
                        <label className="label">Progress</label>
                        <div className="control">
                            <div className="select">
                                <select defaultValue={null} name="isRead" onChange={selectOnChange}>
                                    <option>Read</option>
                                    <option>Unread</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="field">
                        <label className="label">Status</label>
                        <div className="control">
                            <div className="select">
                                <select defaultValue={null} name="isOwned" onChange={selectOnChange}>
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