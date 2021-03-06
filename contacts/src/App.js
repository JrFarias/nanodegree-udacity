import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ListContacts from './ListContacts'
import {getAll, remove, create} from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    getAll().then(contacts => this.setState({contacts}))
  }

  removeContact = (contact) => {
    this.setState(state => ({
      contacts: state
        .contacts
        .filter(c => c.id !== contact.id)
    }))
    remove(contact)
  }

  createContact(contact) {
    create(contact)
      .then(contact => { this.setState(state => ({
        contacts: state
          .contacts
          .contact([contact])
      }))
    })
  }

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (<ListContacts
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact}/>)}/>

        <Route
          path="/create"
          render={({ history }) => (<CreateContact
          onCreateContact={(contact) => {
          this.createContact(contact)
          history.push('/')
        }}/>)}/>
      </div>
    )
  }
}

export default App;
