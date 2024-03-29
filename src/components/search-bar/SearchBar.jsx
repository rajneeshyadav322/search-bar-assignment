import React from 'react'
import { fetchUsers } from '../../api'
import './search.css'
import useSearch from '../../hooks/useSearch'
import Suggestions from '../suggestions/Suggestions'

const SearchBar = () => {

  const { suggestions, refs, userInput, suggestionFocus, handleKeyDown, handleSuggestionFocus, handleInput } = useSearch(fetchUsers)

  return (
    <div className='main'>
      <input
        type='search'
        placeholder='Search'
        value={userInput}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        spellCheck="false"
        aria-label='Search'
      />

      {userInput.length > 0 &&
        <Suggestions
          refs={refs}
          suggestions={suggestions}
          suggestionFocus={suggestionFocus}
          handleSuggestionFocus={handleSuggestionFocus}
          userInput={userInput}
        />
      }
    </div>
  )
}

export default SearchBar