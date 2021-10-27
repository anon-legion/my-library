import React from 'react';
import 'bulma/css/bulma.min.css';
import '../App.css'

const header = ['Title', 'Author', 'Progress', 'Status'];
const Library = ({ books }) => {
    return (
        // <div>
            <table className="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        {header.map((label, i) => <th key={i}>{label}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, i) => {
                        return (
                            <tr key={i}>
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