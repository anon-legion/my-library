import React, { useState, useEffect, useCallback } from 'react';
import { useLibraryContext } from './libraryContext';
import 'bulma/css/bulma.min.css';
import '../App.css';

const HEADER = {
  TITLE: 'Title',
  AUTHOR: 'Author',
  PROGRESS: 'Progress',
  STATUS: 'Status',
};

function Library() {
  const { myLibrary, setEditBook } = useLibraryContext();

  // state storing selected row ID used for <tr> className to highlight selected row
  const [selectedRowId, setSelectedRowId] = useState(() => null);

  useEffect(() => {
    // reset editBook state to default on myLibrary re-render
    // allows newBook form to reset after editing a book in myLibrary
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
  }, [myLibrary, setEditBook]);

  const trOnDoubleClick = useCallback((i) => {
    // e refers to event and i the index given during mapping, used by <tr>
    setSelectedRowId(() => i);
    setEditBook(() => ({
      bookIndex: i,
      bookState: { ...myLibrary[i] },
    }));
  }, []);

  return (
    <table className="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          {Object.values(HEADER).map((label) => <th className="desktop" key={label}>{label}</th>)}
        </tr>
      </thead>
      <tbody>
        {myLibrary.map(({ title, author, isRead, isOwned }, i) => (
          // className is changed if selectedRowId is changed to i
          // i is passed in together with event (e) onDoubleClick
          <tr className={selectedRowId === i ? 'is-selected' : null} key={title} onDoubleClick={() => trOnDoubleClick(i)}>
            <td className="mobile-flex" data-header={HEADER.TITLE}>{title}</td>
            <td className="mobile-flex" data-header={HEADER.AUTHOR}>{author}</td>
            <td className="mobile-flex" data-header={HEADER.PROGRESS}>{isRead ? 'Read' : 'Unread'}</td>
            <td className="mobile-flex" data-header={HEADER.STATUS}>{isOwned ? 'Acquired' : 'Lacking'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Library;
