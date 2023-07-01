import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { TitlePhonebook } from './TitlePhonebook.styled';
import { TitleContacts } from './TitleContacts.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (name, number) => {
    const contactExists = this.duplicationContacts(name);
    if (contactExists) {
      alert(`${name} is already in contacts!`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  findContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  duplicationContacts = name => {
    const { contacts } = this.state;
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  componentDidMount() {
    const savedStringifiedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(savedStringifiedContacts) ?? [];
    this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const savedStringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', savedStringifiedContacts);
    }
  }

  render() {
    const { filter } = this.state;
    const filteredContacts = this.findContacts();

    return (
      <div>
        <TitlePhonebook>Phonebook</TitlePhonebook>
        <ContactForm onSubmit={this.addContact} />
        <TitleContacts>Contacts</TitleContacts>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
