import React from 'react'
import './suggestions.css'
import CardItem from '../card-item/CardItem'

const Suggestions = ({ suggestions, handleSuggestionFocus, suggestionFocus, refs, userInput }) => {
  return (
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
              <CardItem className="id" content={suggestion.id} />
              <CardItem className="name" content={suggestion.name} />
              {
                userInput && suggestion.items.some(item => item.includes(userInput)) &&
                <div className='items'>
                  &#x2022; <span className='highlight'>"{`${userInput}`}"</span> found in items.
                </div>
              }
              <CardItem className='address' content={suggestion.address} />
            </div>
          </li>)
        )
          :
          (
            <div className='no-data'>No User Found!</div>
          )
      }
    </ul>
  )
}

export default Suggestions;