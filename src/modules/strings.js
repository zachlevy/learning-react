import React from 'react'
import reactStringReplace from 'react-string-replace'
import Logo from '../vora_logo_20170717.svg'

// converts a machine name
export const snakeCaseToPascalCase = (snakeCase) => {
  return snakeCase.split("_").map((word) => {return word.charAt(0).toUpperCase() + word.slice(1)}).join("")
}

export const simpleMarkdown = (string) => {
  string = reactStringReplace(string, /\_\_([\s\S]+?)\_\_(?!_)/g, (match) => {
    return <strong>{match}</strong>
  })
  string = reactStringReplace(string, /vora_logo/g, (match) => {
    return (
      <svg className="wikipedia-vora-logo">
        <use xlinkHref={Logo + "#logo-layer"}></use>
      </svg>
    )
  })
  return string
}

export const define = (word) => {
  
  const escapedWord = encodeURI(word.toLowerCase())

  console.log(escapedWord)

  return fetch(`${process.env.REACT_APP_API_URL}/definitions`, {
    method: 'post',
    body: JSON.stringify({
      definition: {
        word: escapedWord
      }
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => {
    return res.json()
  })
}
