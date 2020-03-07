import React, { Component } from 'react';
import styles from './ContactForm.module.css';

export default class ContactEditor extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    let { name, value } = event.target;

    this.setState({
      [name]: name === 'number' ? value.replace(/[^\-\d]/g, '') : value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onAddContact({ ...this.state });

    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label className={styles.label}>
            Number
            <input
              className={styles.input}
              type="text"
              name="number"
              value={number}
              onChange={this.handleChange}
            />
          </label>
          <button className={styles.button} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
