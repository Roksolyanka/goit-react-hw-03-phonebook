import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from './Form.styled';
import { Input } from './Input.styled';
import { Button } from './Button.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  changeForm = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = event => {
    event.preventDefault();
    const { name, number } = this.state;

    this.props.onSubmit(name, number);
    this.setState({ name: '', number: '' });
  };

  componentDidMount() {
    const savedStringifiedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(savedStringifiedContacts) ?? [];
    this.setState({ contacts });
  }

  componentWillUnmount() {
    const savedStringifiedContacts = JSON.stringify(this.state.contacts);
    localStorage.setItem('contacts', savedStringifiedContacts);
  }

  render() {
    return (
      <Form onSubmit={this.submitForm}>
        <label htmlFor="name">Name</label>
        <Input
          type="text"
          id="name"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={this.state.name}
          onChange={this.changeForm}
        />

        <label htmlFor="number">Number</label>
        <Input
          type="tel"
          id="number"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={this.state.number}
          onChange={this.changeForm}
        />

        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
