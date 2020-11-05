const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const noteList = require('./NoteList');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/

class ActiveNotebook extends React.Component {
  render() {
    return (
    	<li>
         {this.props.notebook.title}
         {/*<ul>
           {this.props.notes.map(note => <li key={note.id}>{note.title}</li>)}
         </ul>*/}
      </li>
    );
  }
}

class Notebook extends React.Component {
  render() {
  	const onClickNotebook = (event) => {
    	event.preventDefault();
    	noteList.loadNotes(this.props.notebook.id);
    };

    return (
    	<li>
        <a href="#" onClick={onClickNotebook}>
          {this.props.notebook.title}
        </a>
      </li>
    );
  }
}

class NotebookList extends React.Component {

  render() {
    const createNotebookListItem = (notebook) => {
      //if(notebook.id === this.props.activeNotebookId) {
      	//return <ActiveNotebook key={notebook.id} notebook={notebook} />;
      //}
      return <Notebook key={notebook.id} notebook={notebook} />;
    };

    return (
      <div>
        <h2>Notebooks</h2>
        <button>Create new notebook</button>
        <ul>
          {this.props.notebooks.data.map(createNotebookListItem)}
        </ul>
      </div>
    );
  };
}

const NotebookListContainer = ReactRedux.connect(
  (state) => ({
    notebooks: state.notebooks,
    activeNotebookId: state.activeNotebookId,
}),
  createActionDispatchers(notebooksActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
