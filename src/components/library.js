import React, { useState, useEffect } from 'react';
import { useLibraryContext } from '../libraryContext';
import 'bulma/css/bulma.min.css';
import '../App.css';

const header = ['Title', 'Author', 'Progress', 'Status'];

function Library() {
  const { myLibraryMemo, setEditBook } = useLibraryContext();

  // state storing selected row ID used for <tr> className to highlight selected row
  const [selectedRowId, setSelectedRowId] = useState(() => null);

  useEffect(() => {
    // reset editBook state to default on myLibraryMemo re-render
    // allows newBook form to reset after editing a book in myLibraryMemo
    setEditBook(() => ({
      bookIndex: -1,
      bookState: {
        title: '',
        author: '',
        isRead: false,
        isOwned: false,
      },
    }));
    // reset selectedRowId to remove highlight of selected row after edit
    setSelectedRowId(() => null);
  }, [myLibraryMemo, setEditBook]);

  const trOnDoubleClick = (e, i) => {
    // e refers to event and i the index given during mapping, used by <tr>
    setSelectedRowId(() => i);
    setEditBook(() => ({
      bookIndex: i,
      bookState: { ...myLibraryMemo[i] },
    }));
  };

  return (
    <table className="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          {header.map((label) => <th className="desktop" key={label}>{label}</th>)}
        </tr>
      </thead>
      <tbody>
        {myLibraryMemo.map(({ title, author, isRead, isOwned }, i) => (
          // className is changed if selectedRowId is changed to i
          // i is passed in together with event (e) onDoubleClick
          <tr className={selectedRowId === i ? 'is-selected' : null} key={title} onDoubleClick={(e) => trOnDoubleClick(e, i)}>
            <td className="mobile-flex" data-header={header[0]}>{title}</td>
            <td className="mobile-flex" data-header={header[1]}>{author}</td>
            <td className="mobile-flex" data-header={header[2]}>{isRead ? 'Read' : 'Unread'}</td>
            <td className="mobile-flex" data-header={header[3]}>{isOwned ? 'Acquired' : 'Lacking'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Library;
