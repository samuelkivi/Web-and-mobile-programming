import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reminders: [
        {
          name: 'Buy some eggs',
          timestamp: "2018-11-10T13:00:00.141Z"
        }
      ],
      newName: ''
    }
  }

  handleNoteChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: this.state.newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }
    const notes = this.state.notes.concat(noteObject)

    this.setState({
      notes: notes,
      newNote: ''
    })
  }

  render() {
    return (
      <div>
        <div>
          debug: {this.state.newName}
        </div>
        <h2>Reminders</h2>
        <form onSubmit={this.addNote}>
          <div>
            Name: <input
              value={this.state.newName}
              onChange={this.handleNoteChange}
            />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
        <h2>At time:</h2>
        ...
      </div>
    )
  }
}

export default App;
