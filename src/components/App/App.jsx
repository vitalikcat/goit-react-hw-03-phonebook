import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem('contacts');

    if (persistedContacts) {
      const contacts = JSON.parse(persistedContacts);

      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleInputChange = event => {
    const { value } = event.target;

    this.setState({
      filter: value,
    });
  };

  addContact = contact => {
    const { name } = contact;
    const { contacts } = this.state;

    const matchedName = contacts.some(contacts => contacts.name === name);

    if (matchedName) {
      alert(`${name} is already in contacts.`);
    } else {
      const contactToAdd = {
        id: uuid(),
        ...contact,
      };

      this.setState(state => ({
        contacts: [...state.contacts, contactToAdd],
      }));
    }
  };

  deleteContact = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter
          onChangeFilter={this.handleInputChange}
          filter={filter}
          contacts={contacts}
        />
        <ContactList
          items={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  filter: PropTypes.string,
};
