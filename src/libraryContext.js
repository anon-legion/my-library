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

  // memoized states being passed as context to avoid unnecessary re-rendering
  const stateContext = useMemo(() => (
    { myLibrary, editBook, setMyLibrary, setEditBook }
  ), [myLibrary, editBook]);

  return (
    <LibraryContext.Provider value={stateContext}>
      {children}
    </LibraryContext.Provider>
  );
}

// LibraryProvider.propTypes = { children: PropTypes.element.isRequired };
