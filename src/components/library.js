import React, {useState} from 'react';
import 'bulma/css/bulma.min.css';
import '../App.css'

const header = ['Title', 'Author', 'Progress', 'Status'];
const Library = ({ books }) => {
    return (
        // <div>
            <table>
                <thead>
                    <tr>
                        {header.map((label, i) => <th key={i} className="secondary">{label}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, i) => {
                        return (
                            <tr key={i} className="tertiary">
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.isRead ? 'Read' : 'Unread'}</td>
                                <td>{book.isOwned ? 'Acquired' : 'Lacking'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        // </div>
    );
}


export default Library;