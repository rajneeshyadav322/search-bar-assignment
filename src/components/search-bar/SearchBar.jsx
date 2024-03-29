import React, { useEffect, useMemo, useState } from 'react'
import { fetchUsers } from '../../api'
import './search.css'
import useSearch from '../../hooks/useSearch'

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
        <ul className="suggestions">
          {
            suggestions.length > 0 ? suggestions?.map((suggestion, ind) => (
              <li
                key={suggestion.id}
                ref={refs[suggestion.id]}
                className={suggestionFocus === ind ? "focused" : ""}
                onMouseOver={() => handleSuggestionFocus(ind)}
                onMouseLeave={() => handleSuggestionFocus(null)}
              >
                <div className='user'>
                  <div className='id'>
                    <CardItem content={suggestion.id} />
                  </div>
                  <div className='name'>
                    <CardItem content={suggestion.name} />
                  </div>
                  {
                    userInput && suggestion.items.some(item => item.includes(userInput)) &&
                    <div className='items'>
                      &#x2022; <span className='highlight'>"{`${userInput}`}"</span> found in items.
                    </div>
                  }
                  <div className='address'>
                    <CardItem content={suggestion.address} />
                  </div>
                </div>
              </li>)
            )
              :
              <div className='no-data'>No User Found!</div>
          }
        </ul>
      }
    </div>
  )
}


const CardItem = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: `${content}` }}></div>
}

export default SearchBar