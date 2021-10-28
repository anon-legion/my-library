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
                        {header.map((label, i) => <th className="desktop" key={i}>{label}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, i) => {
                        return (
                            <tr key={i}>
                                <td className="mobile-flex" data-header={header[0]}>{book.title}</td>
                                <td className="mobile-flex" data-header={header[1]}>{book.author}</td>
                                <td className="mobile-flex" data-header={header[2]}>{book.isRead ? 'Read' : 'Unread'}</td>
                                <td className="mobile-flex" data-header={header[3]}>{book.isOwned ? 'Acquired' : 'Lacking'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        // </div>
    );
}


export default Library;