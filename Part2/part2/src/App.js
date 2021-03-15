import './App.css';
import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [
      ],
      newNote: '',
      newTime: ''
    }

  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get('https://web-and-mobile-programming.herokuapp.com/api/reminders/')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ notes: response.data })
      })
  }


  handleNoteChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNote: event.target.value })
  }


  handleTimeChange = (event) => {
    console.log(event.target.value)
    this.setState({ newTime: event.target.value })
  }


  addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: this.state.newNote,
      Time: this.state.newTime,
      timestamp: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: this.state.notes.length + 1
    }
    console.log(noteObject)
    const notes = this.state.notes;
    var found = false;

    for (var i = 0; i < notes.length; i++) {
      console.log(notes[i].content === noteObject.content);
      if (notes[i].content === noteObject.content) {
        found = true
      }
    }
    if (!found) {
      notes.push(noteObject)
    }
    else {
      alert(`muistiinpano '${noteObject.content}' on jo`)
    }

    this.setState({
      notes: notes,
      newNote: '',
      newTime: ''
    })

    axios.post('https://web-and-mobile-programming.herokuapp.com/api/reminders', noteObject)
      .then(response => {
        console.log(response)
      })
  }

  deleteNote = (props) => {
    console.log(props)
    if (window.confirm("Do you really want to remove reminder?")) {
      let url = 'https://web-and-mobile-programming.herokuapp.com/api/reminders/' + props
      axios.delete(url, {
      });
      window.location.reload(true);
    }
  }

  render() {
    return (
      <div>
        <h2>Add reminders</h2>
        <form onSubmit={this.addNote}>
          <div>
            Topic: <input
              value={this.state.newNote}
              onChange={this.handleNoteChange}
            />
          </div>
          <div>
            Time: <input
              value={this.state.newTime}
              onChange={this.handleTimeChange}
            />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
        <h2>Reminders:</h2>
        {this.state.notes.map(item => (
          <li key={item.id}> {item.content} {item.Time}
            <button type="Delete" onClick={() => this.deleteNote(item.id)}>Delete</button>
          </li>
        ))
        }
      </div>
    )
  }
}

export default App;