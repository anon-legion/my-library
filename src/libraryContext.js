import React, { useState, createContext, useContext, useMemo } from 'react';
// import PropTypes from 'prop-types';

const lettersFromAStoic = {
  title: 'Letters from a Stoic',
  author: 'Seneca',
  isRead: true,
  isOwned: true,
};
const theOdyssey = {
  title: 'The Odyssey',
  author: 'Homer',
  isRead: false,
  isOwned: true,
};
const thePrince = {
  title: 'The Prince',
  author: 'Niccolo Machiavelli',
  isRead: true,
  isOwned: true,
};

const LibraryContext = createContext();

export function useLibraryContext() {
  return useContext(LibraryContext);
}

export function LibraryProvider({ children }) {
  const [myLibrary, setMyLibrary] = useState(() => [lettersFromAStoic, theOdyssey, thePrince]);

  const [editBook, setEditBook] = useState(() => ({
    bookIndex: -1,
    bookState: {
      title: '',
      author: '',
      isRead: false,
      isOwned: false,
    },
  }));

  const myLibraryMemo = useMemo(() => [...myLibrary], [myLibrary]);

  const editBookMemo = useMemo(() => ({ ...editBook }), [editBook]);

  return (
    <LibraryContext.Provider value={{
      myLibraryMemo,
      setMyLibrary,
      editBookMemo,
      setEditBook,
    }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

// LibraryProvider.propTypes = { children: PropTypes.element.isRequired };
