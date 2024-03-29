import React, { useEffect, useMemo, useState } from 'react'


const useSearch = (fetchSuggestions) => {

    const [users, setUsers] = useState([])
    const [suggestionFocus, setSuggestionFocus] = useState(null)
    const [userInput, setUserInput] = useState("")

    useEffect(() => {
        (async () => {
            const { data, error } = await fetchSuggestions()
            setUsers(data)
        })()
    }, [])


    const suggestions = useMemo(() => {
        if (userInput.length === 0) {
            return users;
        }
        else {
            const res = users.filter(obj => {
                return Object.values(obj).some(val => {
                    if (Array.isArray(val)) {
                        return val.some(item => item.includes(userInput))
                    }
                    else {
                        return val.includes(userInput)
                    }
                })
            }).map((item) => {
                let obj = { ...item };

                for (let key in obj) {
                    if (!Array.isArray(obj[key])) {
                        const newVal = obj[key].replace(new RegExp(userInput, "gi"), match => `<span class="highlight">${match}</span>`)
                        obj[key] = newVal;
                    }
                }
                return obj;
            })
            return res;
        }
    }, [users, userInput])


    const refs = useMemo(() => {
        return suggestions.reduce((acc, value) => {
            acc[value.id] = React.createRef();
            return acc;
        }, {})
    }, [users, userInput])

    useEffect(() => {

    }, [userInput])


    useEffect(() => {
        if (suggestionFocus !== null) {
            refs[suggestions[suggestionFocus].id].current.scrollIntoView({
                block: 'center',
                behaviour: "smooth"
            })
        }
    }, [suggestionFocus])


    const handleSuggestionFocus = (ind) => {
        setSuggestionFocus(ind)
    }

    const handleInput = (e) => {
        setUserInput(e.target.value)
        setSuggestionFocus(null)
    }

    const handleKeyDown = (e) => {

        if (e.key === "ArrowDown") {
            e.preventDefault()
            setSuggestionFocus((prevFocus) => {
                if (prevFocus === null || prevFocus === suggestions.length - 1) {
                    return 0;
                } else {
                    return prevFocus + 1;
                }
            });
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setSuggestionFocus((prevFocus) => {
                if (prevFocus === null || prevFocus === 0) {
                    return suggestions.length - 1;
                } else {
                    return prevFocus - 1;
                }
            });
        }
    }

    return ({
        suggestions,
        suggestionFocus,
        userInput,
        refs,
        handleInput,
        handleKeyDown,
        handleSuggestionFocus,
    })
}

export default useSearch