const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notes');
//const NotebookList = require('./NotebookList');

class Note extends React.Component {
    render() {
        const onClickNote = (event) => {
          event.preventDefault();
          notes.loadNoteContent(this.props.note.id);
      };
  
      return (
          <li>
          <a href="#" onClick={onClickNote}>
            {this.props.note.title}
          </a>
          <p>{this.props.note.content}</p>
        </li>
      );
    }
  }

class NoteList extends React.Component {

  render() {
    const createNoteListItem = (note) => {
        if(this.props.notebookId === this.props.activeNotebookId) {
            return <Note key={note.id} note={note}  />;
        }
    };

    return (
      <div>
        <h2>Notes</h2>
        <ul>
          {this.props.notes.data.map(createNoteListItem)}
        </ul>
      </div>
    );
    
  };
}

const NoteListContainer = ReactRedux.connect(
  (state) => ({
    notes: state.notes,
}),
  createActionDispatchers(notebooksActionCreators)
)(NoteList);

module.exports = NoteListContainer;