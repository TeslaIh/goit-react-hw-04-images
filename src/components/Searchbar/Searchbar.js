import React, {useState} from "react";
import {SearchbarHead, SearchForm, SearchFormButton, SearchFormInput} from "./Searchbar.jsx";
import { toast } from "react-toastify";
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [searchItem, setSearchItem] = useState('');

  const handleSearchChange = event => {
    setSearchItem(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchItem.trim() === '') {
      toast.error('No, wrong option', { position: "center", });
      setSearchItem('');
      return;
    };
    onSubmit(searchItem);
    setSearchItem('');
  };

  return (
    <SearchbarHead>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BiSearchAlt size={16}>
            <span>Search</span>
          </BiSearchAlt>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autoComplete="on"
          autoFocus
          placeholder="Search images and photos"
          value={searchItem}
          onChange={handleSearchChange}
        />
      </SearchForm>
    </SearchbarHead>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
