import React from 'react';
import styles from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ items, onDeleteContact }) => (
  <div>
    {items.length ? (
      <ul>
        {items.map(({ id, name, number }) => (
          <li className={styles.li} key={id}>
            {`${name}: ${number}`}
            <button
              className={styles.button}
              onClick={() => onDeleteContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    ) : (
      items
    )}
  </div>
);

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ContactList;
