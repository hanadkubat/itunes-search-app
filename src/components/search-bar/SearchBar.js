import React, { useRef } from 'react';

function SearchBar(props) {
  const inputTimerRef = useRef();

  function onSearch(event) {
    const value = event.target.value;
    if (value) {
      clearInterval(inputTimerRef.current);
      inputTimerRef.current = setTimeout(() => {
        props.onSearch(value);
      }, 1000);
    }
  }

  return (
    <div className="input-group mb-3">
      <input
        onChange={onSearch}
        type="text"
        className="form-control"
        placeholder="eg: Jala Brat"
      />
      <span className="input-group-text" id="basic-addon2">
        Search
      </span>
    </div>
  );
}

export default SearchBar;
