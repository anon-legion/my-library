import React from 'react';
import 'bulma/css/bulma.min.css';
import '../App.css'

const NewBook = () => {
    return (
        <form>
            <div className="columns">
                <div className="column is-4">
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Book" />
                        </div>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="field">
                        <label className="label">Author</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Name" />
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="field">
                        <label className="label">Progress</label>
                        <div className="control">
                            <div className="select">
                                <select>
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
                                <select>
                                    <option>Acquired</option>
                                    <option>Lacking</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </form>
    )
}

export default NewBook;