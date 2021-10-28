import React from 'react';
import 'bulma/css/bulma.min.css';
import '../App.css'


const NewBook = ({ values, handler }) => {
    return (
        <form>
            <div className="columns">
                <div className="column is-4">
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Book" value={values.title} name="title" onChange={handler}/>
                        </div>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="field">
                        <label className="label">Author</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Name" value={values.author} name="author" onChange={handler}/>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="field">
                        <label className="label">Progress</label>
                        <div className="control">
                            <div className="select">
                                <select name="isRead">
                                    <option disabled selected value> -- progress -- </option>
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
                                <select name="isOwned">
                                    <option disabled selected value> -- status -- </option>
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