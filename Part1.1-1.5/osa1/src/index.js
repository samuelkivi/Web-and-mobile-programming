import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const phonebookapp = {
    title: 'Superadvanced web phonebook app',
    contacts: [
    {
      name: 'John Doe',
      phonenumber: '358401234567'
    },
    {
      name: 'Jane Doe',
      phonenumber: '44551234567'
    },
    {
      name: 'Foo bar',
      phonenumber: '000'
    }
    ]
  }
  
  return (
    <div>
      <Header title={phonebookapp.title} />
      <Contents contacts={phonebookapp.contacts}/>
    </div>
  )
}

const Header = (props) => {

  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Contents = (props) => {
  return (
    <div>
      <p>{props.contacts[0].name} {props.contacts[0].phonenumber}</p>
      <p>{props.contacts[1].name} {props.contacts[1].phonenumber}</p>
      <p>{props.contacts[2].name} {props.contacts[2].phonenumber}</p>
    </div>
  )
}

/*Entry component was deleted because, It made the code much more
complicated*/

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
