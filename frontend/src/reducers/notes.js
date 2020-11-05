const _ = require('lodash');
const { useCallback } = require('react');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */

const initialState = {
    data: [
    ]
  };

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
    state = state || initialState;
    action = action || {};
  
    switch(action.type) {
      /* *** TODO: Put per-action code here *** */
      //case INSERT: {
        //const data = _.clone(state.data);
        //return _.assign({}, state,  {data});
        //Object.assign({}, state, { activeNotebookId: action.notebookId, notes: action.notes });
      //}
  
      default: return state;
    }
  }
  
  // Action creators
  reducer.insertNotes = (notes) => {
      return {type: INSERT, notes}
  }

  reducer.insertNoteContent = (noteContent) => {
    return {type: INSERT, noteContent}
}

  /* *** TODO: Put action creators here *** */
  reducer.loadNotes = (notebookId) => {
	return (dispatch) => {
    api.get('/notebooks/:' + notebookId + '/notes').then((notes) => {
      dispatch(reducer.insertNotes(notes));
      callback();
    });
  };
};

reducer.loadNoteContent = (noteId) => {
	return (dispatch) => {
    api.get('/notebooks/:' + notebookId + '/notes/:' + noteId).then((noteContent) => {
      dispatch(reducer.insertNoteContent(noteContent));
      callback();
    });
  };
};
  
  // Export the action creators and reducer
  module.exports = reducer;