import React from 'react';
import styles from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ onChangeFilter, filter, contacts }) => (
  <div>
    <p className={styles.p}>Find contacts by name</p>

    {contacts.length >= 2 && (
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onChangeFilter}
      />
    )}
  </div>
);

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object),
};

export default Filter;
