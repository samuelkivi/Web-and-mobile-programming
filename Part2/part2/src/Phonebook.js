import './App.css';

const Phonebook = (props) => {
    return (
      <div>
        <Header header={props.phonebook.name} />
        <Contacts contacts={props.phonebook.contacts} />
      </div>
    )
  }
  
  const Header = (props) => {
  
    return (
      <div>
        <h1>{props.header}</h1>
      </div>
    )
  }
  
  
  const Contacts = (props) => {
    return (
      <div>
        <Entry contacts={props.contacts} />
      </div>
    )
  }
  
  
  
  const Entry = (props) => {
    console.log(props.contacts)
    const list = props.contacts.map(item => (
      <li key={item.id}> Name: {item.name}  Number: {item.phonenumber}</li>
    ))
    return (
      <div>
        <ul>
          {list}
        </ul>
        <p></p>
        <p>Total number of entries: {props.contacts.length}</p>
      </div>
    )
  }

  export default Phonebook;