import React from 'react'


const Search = ({ search, handleChange }) => (
  <div className="Search">
    <input
      className="fl w-100"
      value={search}
      onChange={handleChange}
      placeholder="search transcripts and chapter headings..."
    />
  </div>
)

export default Search
