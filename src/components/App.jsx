import React, { useEffect, useState } from 'react';
import bookContacts from '../data/bookContacts';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import PropTypes from 'prop-types';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? bookContacts.contacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onRemoveContact = contactId =>
    setContacts(contacts.filter(contact => contact.id !== contactId));

  const onAddContact = contactData => {
    const comparison = contacts.find(
      el => contactData.name.toLowerCase() === el.name.toLowerCase()
    );

    if (comparison) {
      alert(`${contactData.name} is already in contacts!`);
      return;
    }

    const contact = {
      ...contactData,
      id: nanoid(),
    };

    setContacts(prevState => [...prevState, contact]);
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />
      <h2>Contacts</h2>
      {contacts.length !== 0 && (
        <Filter value={filter} onChange={changeFilter} />
      )}
      {contacts.length !== 0 && (
        <ContactList
          contacts={getFilteredContacts()}
          onRemoveContact={onRemoveContact}
        />
      )}
    </>
  );
};

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};

// export class oldApp extends React.Component {
//   // state = {
//   //   contacts,
//   //   filter: '',
//   // };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   onRemoveContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   onAddContact = contactData => {
//     const comparison = this.state.contacts.find(
//       el => contactData.name.toLowerCase() === el.name.toLowerCase()
//     );

//     if (comparison) {
//       alert(`${contactData.name} is already in contacts!`);
//       return;
//     }
//     const contact = {
//       ...contactData,
//       id: nanoid(),
//     };
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, contact],
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.target.value });
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;
//     return contacts.filter(
//       contact =>
//         contact.name.toLowerCase().includes(filter.toLowerCase()) ||
//         contact.number.toLowerCase().includes(filter.toLowerCase())
//     );
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const filteredContacts = this.getFilteredContacts();
//     return (
//       <>
//         <h1>Phonebook</h1>
//         <ContactForm onAddContact={this.onAddContact} />
//         <h2>Contacts</h2>
//         {contacts.length !== 0 && (
//           <Filter value={filter} onChange={this.changeFilter} />
//         )}
//         {contacts.length !== 0 && (
//           <ContactList
//             contacts={filteredContacts}
//             onRemoveContact={this.onRemoveContact}
//           />
//         )}
//       </>
//     );
//   }
// }
