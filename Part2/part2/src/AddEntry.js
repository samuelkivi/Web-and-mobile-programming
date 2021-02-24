import './App.css';

const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: this.state.newNote,
      Time: this.state.newTime,
      timestamp: new Date().toISOString(),
      important: Math.random() > 0.5,
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
    else{
      alert(`muistiinpano '${noteObject.content}' on jo`)
    }

    this.setState({
      notes: notes,
      newNote: '',
      newTime: ''
    })
  }

  export default addNote;