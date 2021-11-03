import React, { useState, useEffect, useContext } from 'react';
import { LibraryContext } from '../libraryContext';
import 'bulma/css/bulma.min.css';
import '../App.css'

const header = ['Title', 'Author', 'Progress', 'Status'];

const Library = () => {
    const { myLibrary, setEditBook } = useContext(LibraryContext);

    // state storing selected row ID used for <tr> className to highlight selected row
    const [selectedRowId, setSelectedRowId] = useState(() => null);


    useEffect(() => {
        // reset editBook state to default on myLibrary re-render to allow newBook form to reset after editing a book in myLibrary
        setEditBook(prevState => {
            return {                
                bookIndex: -1,
                bookState: {                    
                    title: "",
                    author: "",
                    isRead: false,
                    isOwned: false
                }
            };
        });
        // reset selectedRowId to remove highlight of selected row after edit
        setSelectedRowId(prevState => null);
    }, [myLibrary, setEditBook]);


    const trOnDoubleClick = (e, i) => {
        // e refers to event and i the index given during mapping, used by <tr>
        setSelectedRowId(prevState => i);
        setEditBook(prevState => {
            return {
                bookIndex: i,
                bookState: {...myLibrary[i]}
            };
        });
    };



    return (
        <>
            <table className="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        {header.map((label, i) => <th className="desktop" key={i}>{label}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {myLibrary.map((book, i) => {
                        return (
                            // className is changed if selectedRowId is changed to i, i is passed in together with event (e) onDoubleClick
                            <tr className={selectedRowId === i ? "is-selected" : null} key={i} onDoubleClick={(e) => trOnDoubleClick(e, i)}>
                                <td className="mobile-flex" data-header={header[0]}>{book.title}</td>
                                <td className="mobile-flex" data-header={header[1]}>{book.author}</td>
                                <td className="mobile-flex" data-header={header[2]}>{book.isRead ? 'Read' : 'Unread'}</td>
                                <td className="mobile-flex" data-header={header[3]}>{book.isOwned ? 'Acquired' : 'Lacking'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}


export default Library;